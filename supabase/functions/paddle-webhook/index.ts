import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const WEBHOOK_SECRET = Deno.env.get('PADDLE_WEBHOOK_SECRET')!;

async function verifySignature(req: Request, body: string): Promise<boolean> {
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

  const valid = await verifySignature(req, body);
  if (!valid) {
    console.error('Invalid Paddle webhook signature');
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);
  const eventType: string = event.event_type || '';

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  if (eventType === 'transaction.completed') {
    const d = event.data;
    const email =
      d.customer?.email ||
      d.billing_details?.email ||
      d.checkout?.customer?.email ||
      '';
    const transactionId = d.id || '';
    const productId = d.items?.[0]?.price?.product_id || '';
    const total = parseFloat(d.details?.totals?.grand_total || d.totals?.grand_total || '0') / 100;
    const currency = d.currency_code || d.details?.totals?.currency_code || 'USD';
    const locale = d.custom_data?.locale || 'en';

    const { error } = await supabase.from('orders').upsert(
      {
        email,
        paddle_order_id: transactionId,
        paddle_product_id: productId,
        amount_total: total,
        currency,
        status: 'completed',
        locale,
      },
      { onConflict: 'paddle_order_id' },
    );

    if (error) {
      console.error('DB upsert error:', error);
      return new Response(JSON.stringify({ error: 'DB error' }), { status: 500 });
    }

    console.log(`Order saved: ${transactionId} / ${email}`);
  }

  if (eventType === 'transaction.payment_failed') {
    const d = event.data;
    const transactionId = d.id || '';
    const email =
      d.customer?.email ||
      d.billing_details?.email ||
      '';

    await supabase.from('orders').upsert(
      {
        email,
        paddle_order_id: transactionId,
        status: 'failed',
        locale: d.custom_data?.locale || 'en',
      },
      { onConflict: 'paddle_order_id' },
    );
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});
