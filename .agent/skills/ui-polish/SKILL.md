---
name: ui-polish
description: Use when someone asks to improve the app appearance, polish the UI, beautify the design, fix or add animations, make animations smoother, or do a visual audit of the application. Also triggers on phrases like "napravi lepše", "popravi animacije", "ulepšaj aplikaciju", "polish the app", "make it look better", "add animations".
disable-model-invocation: false
argument-hint: "[component name or 'all' to audit everything]"
---

## What This Skill Does

Performs a deep visual & animation audit of the React/TSX application, then applies targeted improvements to make it look premium, modern, and polished. Produces beautiful, smooth, professional UI with consistent animations across the entire app.

## Context to Load First

Before starting, read the following files to understand the current state:

1. `index.html` — global styles, fonts, meta tags
2. `App.tsx` — routing and layout structure
3. `components/` — all component files (scan all .tsx files)
4. Any existing CSS files or Tailwind config

Use `list_dir` and `view_file` to read all component files before proposing or applying any changes.

---

## Step-by-Step Workflow

### Phase 1 — Audit (READ ONLY, do not make changes yet)

1. **Fonts audit**: Check what fonts are loaded. Are they premium (Inter, Outfit, Plus Jakarta Sans, etc.) or browser defaults? Note issues.

2. **Color palette audit**: Check all color values used (hardcoded colors, CSS variables, Tailwind classes). Look for:
   - Generic plain colors (pure red `#ff0000`, pure blue `#0000ff`)
   - Inconsistent color usage
   - Missing dark mode or low contrast
   - Jarring or clashing color combinations

3. **Animation audit**: Scan every component for:
   - Existing transitions/animations (CSS or Framer Motion)
   - Elements that appear with no entry animation (hero, sections, cards)
   - Hover states that are missing or feel instant/abrupt
   - Scroll-triggered animations (are they present? Do they use `Reveal.tsx`?)
   - Modals, dropdowns, or overlays that pop in without animation
   - Buttons without feedback (no hover scale, no ripple, no color shift)

4. **Layout & spacing audit**: Check for:
   - Inconsistent padding/margin between sections
   - Missing max-width containers that cause full-width text on large screens
   - Sections that feel visually "flat" (no depth, shadows, gradients)
   - Missing visual hierarchy (all text same weight/size)

5. **Micro-interaction audit**: Check for:
   - Interactive elements without cursor changes
   - Forms without focus states
   - Links/buttons without active/pressed states
   - Images without hover effects

6. **Premium design elements missing**:
   - Gradient text or gradient backgrounds on hero/CTA
   - Glassmorphism cards where appropriate
   - Subtle background patterns or noise textures
   - Section dividers (angled, curved, or wave SVG dividers)

After the full audit, produce a **structured report** in this format:

```
## UI/Animation Audit Report

### 🔤 Fonts
- [ISSUE] ...
- [OK] ...

### 🎨 Colors
- [ISSUE] ...
- [OK] ...

### 🎬 Animations
- [MISSING] Hero section has no entrance animation
- [ABRUPT] Button hover transitions too fast (0ms)
- [OK] Reveal.tsx scroll animation exists

### 📐 Layout & Spacing
- [ISSUE] ...

### ✨ Micro-interactions
- [MISSING] ...

### 💎 Premium Visual Elements
- [MISSING] ...

### Priority Fixes (ordered by visual impact)
1. [Highest impact fix]
2. ...
```

Present the report to the user and ask: **"Shall I apply all fixes, or would you prefer to select specific areas?"**

Wait for user confirmation before proceeding to Phase 2.

---

### Phase 2 — Apply Improvements

Apply changes in this priority order (highest visual impact first):

#### 2.1 — Fonts
- Replace browser default fonts with a premium Google Font pair
- Recommended: `Plus Jakarta Sans` for headings, `Inter` for body text
- Update `index.html` to load fonts from Google Fonts
- Add CSS variable `--font-heading` and `--font-body`
- Apply fonts globally in CSS / Tailwind config

#### 2.2 — Color System
- Define a cohesive color palette using CSS variables:
  ```css
  :root {
    --color-primary: hsl(220, 90%, 56%);
    --color-primary-dark: hsl(220, 90%, 42%);
    --color-accent: hsl(35, 95%, 55%);
    --color-surface: hsl(220, 20%, 97%);
    --color-text: hsl(220, 25%, 12%);
    --color-text-muted: hsl(220, 15%, 50%);
    --gradient-hero: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  }
  ```
- Replace hardcoded color values with these variables throughout components

#### 2.3 — Animation System
Add or improve animations across all components:

**Global CSS animation utilities** (add to index.html or a global CSS file):
```css
/* Smooth fade-in-up for section entries */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
}

/* Utility classes */
.animate-fade-in-up    { animation: fadeInUp    0.6s ease-out both; }
.animate-fade-in-left  { animation: fadeInLeft  0.6s ease-out both; }
.animate-fade-in-right { animation: fadeInRight 0.6s ease-out both; }
.animate-scale-in      { animation: scaleIn     0.5s ease-out both; }
.animate-float         { animation: float       3s ease-in-out infinite; }

/* Staggered delay helpers */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }
.delay-500 { animation-delay: 0.5s; }
```

**Per-component animation rules:**
- **Hero section**: Headline fades in from bottom (delay 0ms), subtitle (delay 200ms), CTA button (delay 400ms). Hero image/visual uses `animate-float`.
- **Section headings**: Each `<h2>` or section title uses `animate-fade-in-up` when it enters viewport (use `Reveal.tsx` wrapper).
- **Cards/grid items**: Staggered `animate-scale-in` with increasing delays (0ms, 100ms, 200ms...).
- **Testimonials**: `animate-fade-in-up` on each card.
- **FAQ items**: Accordion open/close uses smooth `max-height` transition (300ms ease).
- **Buttons**: Add transition for hover — `transition: all 0.2s ease; transform: translateY(-2px);` on hover.
- **Header/Navbar**: Smooth scroll-aware background change (`backdrop-filter: blur(12px)` on scroll).

#### 2.4 — Micro-interactions & Hover Effects
- All buttons: `cursor: pointer`, hover scale `transform: scale(1.03)`, active scale `transform: scale(0.97)`, `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- Image cards/gallery: hover zoom `transform: scale(1.05)` with `overflow: hidden`
- Navigation links: underline slide-in animation on hover
- Social icons: color shift + scale on hover

#### 2.5 — Visual Depth & Premium Elements
- **Section backgrounds**: Alternate between white and a very subtle tinted bg (e.g., `hsl(220, 30%, 97%)`)
- **Hero**: Add a gradient background or subtle geometric SVG pattern behind the main content
- **CTA sections**: Use gradient background + subtle glow effect
- **Cards**: Add `box-shadow: 0 4px 24px rgba(0,0,0,0.08)` and `border: 1px solid rgba(0,0,0,0.06)`; on hover increase shadow
- **Gradient text**: Apply to hero headline or key phrases: `background: linear-gradient(...); -webkit-background-clip: text; color: transparent;`

#### 2.6 — Layout Polish
- Ensure consistent section padding: `padding: clamp(64px, 8vw, 120px) 0`
- Add `max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px)` containers
- Ensure proper visual hierarchy: one large CTA per section, clear H2 → subtitle → content flow

---

### Phase 3 — Verification

After all changes are applied:

1. Visually describe what changed in each component
2. Check for regressions (broken layout, invisible text, z-index issues)
3. Confirm all animations use `will-change: transform` or `will-change: opacity` for GPU acceleration
4. Ensure animations respect `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
5. Report a summary of all changes made, grouped by component

---

## Output

- Modified `.tsx` component files (in place, within `components/`)  
- Updated `index.html` (new fonts, global CSS additions)
- A final **"Changes Made"** summary showing before/after for each major visual change

---

## Notes

- **NEVER break functionality** while applying visual changes. Only touch styles, className, animation wrappers.
- When using `Reveal.tsx` for scroll animation, wrap sections that do NOT already use it.
- If the project uses **Tailwind**, add new animation utilities to `tailwind.config.js` under `extend.animation` and `extend.keyframes`.
- If the project uses **inline styles** instead of CSS classes, keep the same pattern but improve the values.
- Do NOT install new npm packages unless necessary. Prefer CSS-only animations over libraries when possible.
- If Framer Motion is already installed, prefer it for more complex entrance animations.
- Ask the user before making any changes that touch more than 10 files at once — confirm which sections to prioritize.
- For $ARGUMENTS: if a specific component name is given (e.g., `Hero`), only audit and fix that component. If `all` or no argument, audit the entire app.
