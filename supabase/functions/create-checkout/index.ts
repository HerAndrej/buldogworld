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

  const apiKey = Deno.env.get('PADDLE_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'PADDLE_API_KEY not configured' }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }

  let priceId: string;
  let locale: string;

  try {
    const body = await req.json();
    priceId = (body.price_id || '').trim();
    locale = (body.locale || 'en').trim();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  if (!priceId) {
    return new Response(JSON.stringify({ error: 'Missing price_id' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  try {
    const res = await fetch('https://api.paddle.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ price_id: priceId, quantity: 1 }],
        custom_data: { locale },
      }),
    });

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid Paddle response' }), {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: data?.error?.detail || 'Paddle error' }),
        { status: 502, headers: CORS_HEADERS },
      );
    }

    return new Response(
      JSON.stringify({ transaction_id: data.data.id }),
      { status: 200, headers: CORS_HEADERS },
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message || 'Network error' }),
      { status: 502, headers: CORS_HEADERS },
    );
  }
});
