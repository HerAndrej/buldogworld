# Payhip → Supabase + Paddle: Technical Reference

## Project Context

| Item | Value |
|------|-------|
| Framework | Vite + React + TypeScript |
| Old payment | Payhip (product ID: `vaAPR`) |
| New payment | Paddle Billing (one-time purchase) |
| Backend | Supabase (Postgres + Edge Functions) |
| Product | Digital download ($20 one-time) |

---

## Paddle Account Status

> ⚠️ Account may be pending approval. Use **Sandbox mode** until approved.
> All infrastructure can be built and tested in sandbox mode.
> Switch to production by removing `Paddle.Environment.set("sandbox")` and swapping env vars.

### Sandbox vs Production URLs

| | Sandbox | Production |
|---|---|---|
| Paddle.js | `https://cdn.paddle.com/paddle/v2/paddle.js` | Same |
| Environment | `Paddle.Environment.set("sandbox")` | Remove this line |
| Client Token | `test_...` | `live_...` |
| Price ID | `pri_...` (from sandbox dashboard) | `pri_...` (from production dashboard) |

---

## Payhip References to Remove

These were found in the codebase and must ALL be cleaned up:

### `index.html`
- Line 9–10: Payhip SDK `<script>` tag → **DELETE**
- Line 80–122: `.payhip-buy-button` and `.payhip-buy-button-secondary` CSS → **DELETE**

### `components/Header.tsx`
- Lines 61–94: `className="payhip-buy-button"` → remove class; `href="https://payhip.com/b/vaAPR"` → use `onClick={openCheckout}`

### `components/Problems.tsx`
- Lines 62–63: `href="https://payhip.com/b/vaAPR"` + `className="... payhip-buy-button"` → use `onClick={openCheckout}`

### `components/FinalCTA.tsx`
- Line 85: `window.open('https://payhip.com/buy?...')` → use `openCheckout()`

### `components/Expertise.tsx`
- Line 103: `window.open('https://payhip.com/b/vaAPR', '_blank')` → use `openCheckout()`

---

## Files to Create

| File | Purpose |
|------|---------|
| `lib/supabaseClient.ts` | Singleton Supabase client |
| `hooks/usePaddleCheckout.ts` | Centralised Paddle checkout hook |
| `supabase/functions/paddle-webhook/index.ts` | Edge Function for Paddle webhooks |

---

## Supabase Database Schema

```
public.users
  id              uuid PK (gen_random_uuid)
  email           text UNIQUE NOT NULL
  paddle_customer_id text
  created_at      timestamptz DEFAULT now()

public.orders
  id              uuid PK (gen_random_uuid)
  user_id         uuid FK → users.id
  email           text NOT NULL
  paddle_order_id text UNIQUE
  paddle_product_id text
  amount_total    numeric(10,2)
  currency        text DEFAULT 'USD'
  status          text DEFAULT 'pending' [pending|completed|refunded]
  download_url    text
  created_at      timestamptz DEFAULT now()
```

---

## RLS Policies Summary

| Table | Policy | Using |
|-------|---------|-------|
| `users` | SELECT own row | `auth.uid()::text = id::text` |
| `orders` | SELECT own orders | email matches authenticated user |
| `orders` | ALL for service role | `auth.role() = 'service_role'` |

---

## Paddle Webhook Event Flow

```
Customer clicks Buy Now
  → Paddle.Checkout.open() overlay opens
  → Customer pays
  → Paddle fires POST to Supabase Edge Function URL
  → Edge Function verifies HMAC signature
  → Upserts user in public.users
  → Inserts order in public.orders (status: completed)
  → Returns 200 OK to Paddle
```

---

## Environment Variables

### Frontend (`.env.local`)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_PADDLE_CLIENT_TOKEN=test_xxxxxxxxxxxxx
VITE_PADDLE_PRICE_ID=pri_xxxxxxxxxxxxxxxxx
```

### Supabase Edge Function Secrets
Set in: Supabase Dashboard → Project Settings → Edge Functions → Secrets

```
PADDLE_WEBHOOK_SECRET    (from Paddle dashboard → Notifications)
PRODUCT_DOWNLOAD_URL     (direct link or Supabase Storage signed URL)
SUPABASE_URL             (auto-set by Supabase)
SUPABASE_SERVICE_ROLE_KEY (auto-set by Supabase)
```

---

## Where to Get Paddle Values

1. **Sandbox Client Token:** Paddle Dashboard → Developer Tools → Authentication → Generate Token (Sandbox)
2. **Price ID:** Paddle Dashboard → Catalog → Products → [Your Product] → Prices → copy Price ID
3. **Webhook Secret:** Paddle Dashboard → Notifications → New Endpoint → paste Supabase Edge Function URL → copy signing secret

---

## Verification Commands

```bash
# Check no Payhip references remain
grep -r "payhip" src --include="*.tsx" --include="*.ts" --include="*.html"

# Check env vars are configured
cat .env.local

# Build without errors
npm run build
```
