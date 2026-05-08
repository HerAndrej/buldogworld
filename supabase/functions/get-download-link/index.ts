import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  let transaction_id: string;
  let locale: string;

  try {
    const body = await req.json();
    transaction_id = (body.transaction_id || '').trim();
    locale = (body.locale || 'en').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  if (!transaction_id) {
    return new Response(JSON.stringify({ error: 'Missing transaction_id' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Verify transaction exists and is completed
  const { data: order, error: dbError } = await supabase
    .from('orders')
    .select('status, locale')
    .eq('paddle_order_id', transaction_id)
    .single();

  if (dbError || !order) {
    return new Response(
      JSON.stringify({ error: 'Transaction not found. Please check your email or contact support.' }),
      { status: 404, headers: CORS_HEADERS },
    );
  }

  if (order.status !== 'completed') {
    return new Response(
      JSON.stringify({ error: 'Payment not yet completed. Please try again in a moment.' }),
      { status: 402, headers: CORS_HEADERS },
    );
  }

  const validLocales = ['en', 'sr', 'de', 'ru'];
  const safeLocale = validLocales.includes(locale) ? locale : (order.locale || 'en');
  const fileName = `bulldog-${safeLocale}.zip`;

  // Generate a signed URL that expires in 60 minutes
  const { data: signedData, error: storageError } = await supabase.storage
    .from('ebooks')
    .createSignedUrl(fileName, 3600);

  if (storageError || !signedData?.signedUrl) {
    console.error('Storage signed URL error:', storageError);
    return new Response(
      JSON.stringify({ error: 'Could not generate download link. Please contact support.' }),
      { status: 500, headers: CORS_HEADERS },
    );
  }

  return new Response(
    JSON.stringify({ url: signedData.signedUrl }),
    { status: 200, headers: CORS_HEADERS },
  );
});
