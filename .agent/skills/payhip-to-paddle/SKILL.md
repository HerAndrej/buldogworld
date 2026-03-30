---
name: payhip-to-paddle
description: Use when someone wants to migrate from Payhip to Paddle, remove Payhip integration, switch payments to Paddle, set up Supabase for orders/users, or replace payhip.com links and SDK with Paddle checkout. Also triggers on "ukloni Payhip", "prebaci na Paddle", "pređi na Paddle", "migracija plaćanja".
disable-model-invocation: true
---

# Skill: Payhip → Supabase + Paddle Migration

This skill guides a complete, code-level migration from Payhip to:
- **Paddle Billing** (one-time purchases via Paddle.js overlay or hosted checkout)
- **Supabase** as the sole backend (users, orders, RLS policies, Edge Functions for webhooks)

> **Context:** This is a **Vite + React + TypeScript** project. Supabase project is already connected.
> Paddle account may still be awaiting approval — the skill builds all the code infrastructure so that it is **ready to activate** once Paddle approves the account.

Before starting, read the reference file for all technical details:
`c:\Users\User\Desktop\Aplikacije1\dog\.agent\skills\payhip-to-paddle\reference.md`

---

## Phase 1 — Discover Current State

1. Run a codebase-wide search for all Payhip references:
   - `grep -r "payhip" . --include="*.tsx" --include="*.ts" --include="*.html" --include="*.css" -l`
2. Note every file that contains Payhip links, SDK script tags, or `.payhip-buy-button` CSS classes.
3. Check if a `.env` or `.env.local` file exists and what Supabase/Paddle environment variables are already set.
4. Read `package.json` to see if `@supabase/supabase-js` and any Paddle SDK are installed.

---

## Phase 2 — Supabase Schema & Backend Setup

### Step 2.1 — Install Supabase JS client (if not already installed)
```bash
npm install @supabase/supabase-js
```

### Step 2.2 — Create `lib/supabaseClient.ts`
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 2.3 — Apply database migrations via Supabase MCP

Use the `mcp_supabase-mcp-server_apply_migration` tool to run the following SQL.
Get the `project_id` from the Supabase dashboard URL or from the existing `.env` file.

**Migration 1: Create `users` table**
```sql
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  paddle_customer_id text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

-- Users can only read their own row
create policy "Users can read own data"
  on public.users for select
  using (auth.uid()::text = id::text);
```

**Migration 2: Create `orders` table**
```sql
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  email text not null,
  paddle_order_id text unique,
  paddle_product_id text,
  amount_total numeric(10,2),
  currency text default 'USD',
  status text not null default 'pending', -- pending | completed | refunded
  download_url text,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Users can read their own orders
create policy "Users can read own orders"
  on public.orders for select
  using (
    email = (select email from public.users where id::text = auth.uid()::text)
  );

-- Service role (Edge Function) can insert/update orders
create policy "Service role can manage orders"
  on public.orders for all
  using (auth.role() = 'service_role');
```

### Step 2.4 — Deploy Paddle Webhook Edge Function

Use `mcp_supabase-mcp-server_deploy_edge_function` to deploy the function below.
- **Function name:** `paddle-webhook`
- **verify_jwt:** `false` (Paddle calls this endpoint, not the logged-in user)

```ts
// supabase/functions/paddle-webhook/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const PADDLE_WEBHOOK_SECRET = Deno.env.get("PADDLE_WEBHOOK_SECRET") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await req.text();

  // Verify Paddle webhook signature (Paddle Billing uses SHA-256 HMAC)
  const signatureHeader = req.headers.get("paddle-signature") ?? "";
  const [tsPart, h1Part] = signatureHeader.split(";");
  const ts = tsPart?.replace("ts=", "") ?? "";
  const h1 = h1Part?.replace("h1=", "") ?? "";

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(PADDLE_WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signedData = encoder.encode(`${ts}:${rawBody}`);
  const computedBuf = await crypto.subtle.sign("HMAC", key, signedData);
  const computedHex = Array.from(new Uint8Array(computedBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (computedHex !== h1) {
    console.error("Invalid Paddle signature");
    return new Response("Forbidden", { status: 403 });
  }

  const event = JSON.parse(rawBody);
  const eventType: string = event.event_type ?? "";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (eventType === "transaction.completed") {
    const txn = event.data;
    const email: string = txn.customer?.email ?? txn.billing_details?.email ?? "";
    const paddleOrderId: string = txn.id;
    const paddleProductId: string = txn.items?.[0]?.price?.product_id ?? "";
    const amountTotal: number = parseFloat(txn.details?.totals?.grand_total ?? "0") / 100;
    const currency: string = txn.currency_code ?? "USD";

    // Upsert user
    const { data: userRow } = await supabase
      .from("users")
      .upsert({ email }, { onConflict: "email" })
      .select("id")
      .single();

    // Insert order
    await supabase.from("orders").upsert(
      {
        user_id: userRow?.id ?? null,
        email,
        paddle_order_id: paddleOrderId,
        paddle_product_id: paddleProductId,
        amount_total: amountTotal,
        currency,
        status: "completed",
        download_url: Deno.env.get("PRODUCT_DOWNLOAD_URL") ?? "",
      },
      { onConflict: "paddle_order_id" }
    );

    console.log(`Order recorded for ${email}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

After deploying, copy the function's URL from the Supabase dashboard and add it as a webhook in the **Paddle dashboard → Notifications**.

### Step 2.5 — Set Supabase Edge Function Secrets

In the Supabase dashboard → Project Settings → Edge Functions → Secrets, add:
- `PADDLE_WEBHOOK_SECRET` — copy from Paddle dashboard → Notifications → your endpoint
- `PRODUCT_DOWNLOAD_URL` — the direct download link to the product file

---

## Phase 3 — Remove Payhip from the Frontend

### Step 3.1 — `index.html`

1. **Delete** the Payhip SDK `<script>` tag:
   ```html
   <!-- DELETE THIS LINE -->
   <script type="text/javascript" src="https://payhip.com/payhip.js"></script>
   ```

2. **Delete** all CSS related to `.payhip-buy-button` and `.payhip-buy-button-secondary` from the `<style>` block (lines ~80–122).

3. **Add** the Paddle.js script tag in the `<head>` (Sandbox for testing, switch to production URL once approved):
   ```html
   <!-- Paddle.js SDK -->
   <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
   <script>
     // Use Paddle.Environment.set("sandbox") for testing before approval
     // Remove this line in production:
     Paddle.Environment.set("sandbox");
     Paddle.Initialize({ token: "YOUR_PADDLE_CLIENT_TOKEN" });
   </script>
   ```

### Step 3.2 — Replace `className="payhip-buy-button"` everywhere

In every component that has `className="payhip-buy-button"` or `className="... payhip-buy-button ..."`:
- Remove `payhip-buy-button` from the className
- The button's existing visual styles (from Tailwind or the `shimmer-btn` class) remain unchanged

Files to update: `Header.tsx`, `Problems.tsx` (and any others found in Phase 1).

### Step 3.3 — Replace Payhip `href` and `onClick` with Paddle checkout

For **anchor tags** with `href="https://payhip.com/b/vaAPR"`:
- Change `href` to `href="#"` (or use a `<button>`)
- Add `onClick` handler as shown below

For **onClick** that calls `window.open('https://payhip.com/buy?...')`:
- Replace with the Paddle inline checkout call

**Standard Paddle one-time checkout handler:**
```ts
const handleBuyNow = () => {
  window.Paddle.Checkout.open({
    items: [{ priceId: import.meta.env.VITE_PADDLE_PRICE_ID, quantity: 1 }],
    settings: {
      displayMode: "overlay",
      theme: "dark",
      locale: "en",
    },
  });
};
```

Add `onClick={handleBuyNow}` to every CTA button.

### Step 3.4 — Create `hooks/usePaddleCheckout.ts`

Centralise the checkout logic in one hook so all buttons use the same call:

```ts
export const usePaddleCheckout = () => {
  const openCheckout = () => {
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: import.meta.env.VITE_PADDLE_PRICE_ID as string,
            quantity: 1,
          },
        ],
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "en",
        },
      });
    }
  };
  return { openCheckout };
};
```

Add Paddle type declarations to `vite-env.d.ts` or `types.ts`:
```ts
interface Window {
  Paddle: {
    Environment: { set: (env: "sandbox" | "production") => void };
    Initialize: (opts: { token: string }) => void;
    Checkout: {
      open: (opts: object) => void;
    };
  };
}
```

---

## Phase 4 — Environment Variables

Add the following to `.env.local` (never commit this file):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Paddle (use sandbox values until account is approved)
VITE_PADDLE_CLIENT_TOKEN=test_xxxxxxxxxxxxx
VITE_PADDLE_PRICE_ID=pri_xxxxxxxxxxxxxxxxx
```

---

## Phase 5 — Verify & Checklist

After all changes, run through this checklist:

- [ ] `npm run dev` builds without TypeScript errors
- [ ] No `payhip.com` references remain in the codebase (`grep -r "payhip" src`)
- [ ] All CTA buttons trigger `handleBuyNow` / `openCheckout`
- [ ] Paddle overlay opens when clicking the buy button (use Paddle Sandbox)
- [ ] Test transaction in Paddle Sandbox → check Supabase `orders` table for the new row
- [ ] Supabase Edge Function logs show no errors
- [ ] RLS policies: anon user cannot read all orders; authenticated user can only read own orders
- [ ] `.env.local` is in `.gitignore`

---

## Notes

- **Paddle not yet approved?** Use `Paddle.Environment.set("sandbox")` in `index.html` and sandbox credentials in `.env.local`. All webhook and checkout functionality can be fully tested in sandbox mode.
- **Download delivery:** The `download_url` stored in the `orders` table should be a signed Supabase Storage URL or a direct link. Set it via the `PRODUCT_DOWNLOAD_URL` Edge Function secret.
- **Do NOT** hardcode Paddle price IDs or tokens in component files — always use `import.meta.env.VITE_*`.
- **Supabase project ID** can be found in: Supabase dashboard URL → `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`.
