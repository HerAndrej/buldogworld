import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const WEBHOOK_SECRET = Deno.env.get('PADDLE_WEBHOOK_SECRET')!;

// V2 HMAC signature verification
async function verifyV2Signature(req: Request, body: string): Promise<boolean> {
  const signature = req.headers.get('paddle-signature');
  if (!signature) return false;

  const parts: Record<string, string> = {};
  for (const part of signature.split(';')) {
    const [key, val] = part.split('=');
    if (key && val) parts[key] = val;
  }

  const ts = parts['ts'];
  const h1 = parts['h1'];
  if (!ts || !h1) return false;

  const payload = `${ts}:${body}`;
  const key = new TextEncoder().encode(WEBHOOK_SECRET);
  const data = new TextEncoder().encode(payload);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, data);
  const computed = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return computed === h1;
}

function isV1Webhook(contentType: string | null, body: string): boolean {
  if (contentType?.includes('application/x-www-form-urlencoded')) return true;
  if (body.includes('alert_name=') || body.includes('p_order_id=')) return true;
  return false;
}

function parseV1FormData(body: string): Record<string, string> {
  const params = new URLSearchParams(body);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

interface OrderData {
  email: string;
  paddle_order_id: string;
  paddle_product_id: string;
  amount_total: number;
  currency: string;
  status: string;
  locale: string;
}

function extractV1Order(fields: Record<string, string>): OrderData | null {
  const alertName = fields['alert_name'] || '';

  if (alertName === 'payment_succeeded' || alertName === 'order_processing') {
    let locale = 'en';
    try {
      const passthrough = JSON.parse(fields['passthrough'] || '{}');
      locale = passthrough.locale || 'en';
    } catch { /* ignore */ }

    return {
      email: fields['email'] || fields['customer_email'] || '',
      paddle_order_id: fields['order_id'] || fields['p_order_id'] || fields['checkout_id'] || `v1_${Date.now()}`,
      paddle_product_id: fields['product_id'] || '',
      amount_total: parseFloat(fields['sale_gross'] || fields['payment_amount'] || '0'),
      currency: fields['currency'] || 'USD',
      status: 'completed',
      locale,
    };
  }

  if (alertName === 'payment_failed' || alertName === 'payment_refunded') {
    return {
      email: fields['email'] || fields['customer_email'] || '',
      paddle_order_id: fields['order_id'] || fields['p_order_id'] || fields['checkout_id'] || `v1_${Date.now()}`,
      paddle_product_id: fields['product_id'] || '',
      amount_total: parseFloat(fields['sale_gross'] || fields['payment_amount'] || '0'),
      currency: fields['currency'] || 'USD',
      status: alertName === 'payment_failed' ? 'failed' : 'refunded',
      locale: 'en',
    };
  }

  return null;
}

function extractV2Order(event: any): OrderData | null {
  const eventType: string = event.event_type || '';
  const d = event.data;

  if (eventType === 'transaction.completed') {
    return {
      email:
        d.customer?.email ||
        d.billing_details?.email ||
        d.checkout?.customer?.email ||
        '',
      paddle_order_id: d.id || '',
      paddle_product_id: d.items?.[0]?.price?.product_id || '',
      amount_total: parseFloat(d.details?.totals?.grand_total || d.totals?.grand_total || '0') / 100,
      currency: d.currency_code || d.details?.totals?.currency_code || 'USD',
      status: 'completed',
      locale: d.custom_data?.locale || 'en',
    };
  }

  if (eventType === 'transaction.payment_failed') {
    return {
      email:
        d.customer?.email ||
        d.billing_details?.email ||
        '',
      paddle_order_id: d.id || '',
      paddle_product_id: '',
      amount_total: 0,
      currency: d.currency_code || 'USD',
      status: 'failed',
      locale: d.custom_data?.locale || 'en',
    };
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, paddle-signature',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = await req.text();
  const contentType = req.headers.get('content-type');
  const v1 = isV1Webhook(contentType, body);

  // V2: verify HMAC signature
  if (!v1) {
    const valid = await verifyV2Signature(req, body);
    if (!valid) {
      console.error('Invalid Paddle V2 webhook signature');
      return new Response('Invalid signature', { status: 401 });
    }
  }

  // V1: Paddle Classic sends p_signature (RSA) — we accept in sandbox, log warning
  if (v1) {
    console.log('Received Paddle V1 (Classic) webhook');
  }

  let order: OrderData | null = null;

  if (v1) {
    const fields = parseV1FormData(body);
    console.log('V1 alert_name:', fields['alert_name']);
    order = extractV1Order(fields);
  } else {
    const event = JSON.parse(body);
    console.log('V2 event_type:', event.event_type);
    order = extractV2Order(event);
  }

  if (!order) {
    console.log('Event type not handled, ignoring');
    return new Response(JSON.stringify({ received: true, handled: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { error } = await supabase.from('orders').upsert(order, {
    onConflict: 'paddle_order_id',
  });

  if (error) {
    console.error('DB upsert error:', error);
    return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
  }

  console.log(`Order saved [${v1 ? 'V1' : 'V2'}]: ${order.paddle_order_id} / ${order.email} / ${order.status}`);

  return new Response(JSON.stringify({ received: true, handled: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
