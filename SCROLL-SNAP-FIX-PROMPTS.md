# Raabyt Website - Full-Page Scroll-Snap Fix Prompts

> **What went wrong:** The previous prompts added scroll-triggered reveal animations but NOT full-page scroll snapping. The result is a normal scrolling page with some glitchy animations. What we actually need is a **fullPage.js-style experience** where each scroll event snaps to the next section, and each section fills exactly one screen.
>
> **How to use:** Copy each prompt into VS Code Claude Code chat, one at a time. These prompts REPLACE and FIX the previous implementation.

---

## Prompt 1: Fix Broken page.tsx & Set Up Full-Page Scroll-Snap Container

```
URGENT FIX: The file `src/app/page.tsx` is TRUNCATED/CORRUPTED — it cuts off mid-word. This must be fixed first.

Read AGENTS.md first before writing any code — this project uses Next.js 16 with breaking changes.

CONTEXT: I want a full-page scroll-snap storytelling website. Each section should:
- Take EXACTLY 100vh (full viewport height)
- Content must FIT within the viewport — no overflow, no scrolling within a section
- One mouse scroll = snap to the next/previous section (like fullPage.js)
- Sections transition with smooth CSS scroll-snap or Framer Motion
- Keep the existing dark theme with purple (#8B5CF6) / magenta (#D946EF) brand colors. DO NOT change colors.

TASK:

1. **Fix `src/app/page.tsx`** — rewrite it completely with this structure:
   ```tsx
   import { HeroSection } from "@/components/features/hero-section";
   import { ProductsShowcase } from "@/components/features/products-showcase";
   import { WhyRaabyt } from "@/components/features/why-raabyt";
   import { StatsCounter } from "@/components/features/stats-counter";
   import { Testimonials } from "@/components/features/testimonials";
   import { CTABanner } from "@/components/features/cta-banner";
   import { TrustSignals } from "@/components/features/trust-signals";
   import { ScrollDots } from "@/components/ui/scroll-dots";

   export default function Home() {
     return (
       <>
         <ScrollDots />
         <div id="hero"><HeroSection /></div>
         <div id="products"><ProductsShowcase /></div>
         <div id="why-raabyt"><WhyRaabyt /></div>
         <div id="stats"><StatsCounter /></div>
         <div id="testimonials"><Testimonials /></div>
         <div id="trust"><TrustSignals /></div>
         <div id="cta"><CTABanner /></div>
       </>
     );
   }
   ```
   Remove the AnimatedDivider, SectionTransition imports — we don't need them for scroll-snap.

2. **Update `src/app/layout.tsx`**:
   - The `<main>` element should be the scroll-snap container:
     ```tsx
     <main id="main-content" className="flex-1 h-screen overflow-y-auto snap-y snap-mandatory">
       {children}
     </main>
     ```
   - Remove the `px-2 sm:px-0` from main — sections handle their own padding
   - The `<Footer />` should be REMOVED from the layout (or moved inside the CTA section) because in a snap-scroll site, a separate footer breaks the snap behavior. Put minimal footer content inside the CTA banner section instead.
   - Keep the `<Header />` as fixed overlay (it already is)
   - The SmoothScrollProvider (Lenis) should be REMOVED or disabled — Lenis conflicts with CSS scroll-snap. CSS scroll-snap handles the smooth snapping natively.

3. **Make every section wrapper div a snap target**:
   - Each `<div id="...">` wrapper in page.tsx needs: `className="h-screen snap-start overflow-hidden"`
   - This ensures every section is exactly viewport height and snaps to start

4. **Add to `globals.css`**:
   ```css
   /* Scroll-snap sections */
   .snap-section {
     height: 100vh;
     height: 100dvh; /* Dynamic viewport height for mobile */
     scroll-snap-align: start;
     overflow: hidden;
     position: relative;
   }
   ```

5. Run `npm run build` to verify no errors.

IMPORTANT: After this prompt, sections will be 100vh but content may overflow. That's fine — the next prompts fix each section's content to fit.
```

---

## Prompt 2: Hero Section — Fit to 100vh with Entrance Animations

```
Read AGENTS.md first before writing any code.

CONTEXT: The website now uses full-page scroll-snap. Each section is exactly 100vh. Content must fit within the viewport without overflow.

TASK: Update `src/components/features/hero-section.tsx` to fit perfectly in 100vh.

The hero section already uses `h-screen` so it mostly works. Adjustments needed:

1. **Remove `min-h-[600px] max-h-[1200px]`** — the section must be exactly `h-screen` (100vh), no min/max overrides.

2. **Content layout — use flexbox to vertically center and fit**:
   - The content div should use `flex flex-col justify-center` within the full height
   - Reduce the heading size slightly for smaller viewports:
     - Current: `text-5xl sm:text-5xl md:text-6xl lg:text-7xl`
     - Change to: `text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl`
   - Reduce `mt-8 sm:mt-10` on CTAs to `mt-5 sm:mt-6`
   - Reduce `mt-10 sm:mt-14` on trust badges to `mt-6 sm:mt-8`

3. **Entrance animation (on page load, NOT scroll-triggered)**:
   - Keep the existing typewriter / word-reveal animations if they work
   - If they're glitchy, simplify to:
     - Eyebrow: fade-in + slideUp, 0.4s delay
     - Heading words: staggered fade-in + slideUp, 0.15s stagger, starting at 0.6s
     - Subtitle: fade-in + slideUp at 1.2s
     - CTAs: fade-in + slideUp at 1.4s
     - Trust badges: fade-in at 1.6s
   - All using Framer Motion `initial` + `animate` (NOT whileInView since hero is visible on load)

4. **Scroll indicator at bottom**:
   - Keep the "Scroll to explore" + bouncing chevron
   - Position it at the absolute bottom of the section: `absolute bottom-6 left-1/2 -translate-x-1/2`
   - Must NOT push content or cause overflow

5. **3D background** — keep as-is, it already fills the section with absolute positioning.

6. Do NOT add parallax scroll effects to the hero. In scroll-snap mode, the hero stays static until the user scrolls to the next section — then it snaps away entirely.

Test: The hero should display all content (heading, subtitle, CTAs, badges, scroll indicator) within one screen at 1280x720 viewport without any overflow.
```

---

## Prompt 3: Products Showcase — Compact Grid to Fit 100vh

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap. Each section = 100vh. Content must fit without overflow.

TASK: Redesign `src/components/features/products-showcase.tsx` to fit in one viewport.

Current problem: 8 product cards in a grid with large padding = WAY taller than 100vh.

Solution — make it compact:

1. **Section container**:
   - Remove `py-24 md:py-32` — replace with `py-12 md:py-16`
   - Add `h-screen flex flex-col justify-center` to the section itself
   - The section should NOT have its own height since the parent div already has `h-screen`

   Actually, better approach: Remove height from section, let the parent `<div id="products" className="h-screen snap-start overflow-hidden">` handle it. The section inside should use:
   ```
   className="h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl"
   ```

2. **Compact the heading area**:
   - Reduce spacing: `mb-2` on eyebrow, smaller heading size (`text-2xl md:text-3xl lg:text-4xl`)
   - Description: one line, `text-sm md:text-base`
   - Gap between heading and cards: `mt-6 md:mt-8` (not 14-16)

3. **Product cards grid — use 4 columns, compact cards**:
   - Grid: `grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4`
   - Cards should be COMPACT:
     - Padding: `p-3 md:p-4` (not p-6)
     - Icon: `h-8 w-8` container, `h-4 w-4` icon, `mb-2`
     - Product name: `text-sm font-semibold` (not text-lg)
     - Description: `text-xs text-muted leading-snug` — ONE LINE with `line-clamp-1` or truncate
     - "Learn more": `text-xs mt-2`
   - This gives us 2 rows of 4 = all 8 products visible in one screen

4. **Entrance animation** — whileInView (triggers when section snaps into view):
   - Cards stagger in from bottom: `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`
   - Stagger: 0.06s between cards
   - Use `viewport={{ once: true, amount: 0.3 }}`
   - Heading elements fade-in first, then cards

5. Keep the TiltCard wrapper for hover interactivity.

Test: All 8 product cards + heading should fit in one 1280x720 screen.
```

---

## Prompt 4: Why Raabyt — Compact Bento Grid to Fit 100vh

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap. Each section = 100vh. Content must fit without overflow.

TASK: Redesign `src/components/features/why-raabyt.tsx` to fit in one viewport.

Current problem: 2 large + 4 small feature cards with generous padding = way too tall.

Solution — use a compact bento-style grid:

1. **Section layout**:
   - Remove `py-24 md:py-32`, the parent div handles height
   - Section contents: `h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl`

2. **Compact heading**:
   - Eyebrow: `text-xs font-medium uppercase tracking-wider text-brand-purple mb-2`
   - Heading: `text-2xl md:text-3xl lg:text-4xl font-bold`
   - Description: `text-sm md:text-base text-muted mt-2 max-w-2xl`
   - Gap to cards: `mt-6 md:mt-8`

3. **Bento grid layout — all 6 cards in a single grid**:
   ```
   grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4
   ```
   - The 2 LARGE cards ("On-Premise Security", "AI-Powered Automation"): `md:col-span-2` — they span 2 columns
   - The 4 SMALL cards: each takes 1 column
   - Layout on desktop (4 cols):
     Row 1: [On-Premise Security (2 cols)] [AI-Powered Automation (2 cols)]
     Row 2: [Unified Platform] [99.9% Uptime] [Customizable Workflows] [24/7 Support]
   - All cards: compact padding `p-3 md:p-4`
   - Card icon: `h-8 w-8` container, `mb-2`
   - Card title: `text-sm md:text-base font-semibold`
   - Card description: `text-xs md:text-sm text-muted leading-snug line-clamp-2`
   - Large cards can show 2-3 lines, small cards 1-2 lines

4. **Entrance animation** — whileInView:
   - Large cards enter from left/right: first from left (`x: -40`), second from right (`x: 40`)
   - Small cards stagger up from bottom
   - Viewport: `{ once: true, amount: 0.3 }`

Test: All 6 feature cards + heading fit in one 1280x720 screen.
```

---

## Prompt 5: Stats Counter — Centered Row to Fit 100vh

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap. Each section = 100vh. Content must fit without overflow.

TASK: Update `src/components/features/stats-counter.tsx` to fit in one viewport.

This section is already relatively compact. Adjustments:

1. **Section layout**:
   - Remove `py-20 md:py-28`
   - Contents: `h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl`

2. **Stats grid**:
   - Keep `grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12`
   - Stats are centered in the viewport — this section should feel like a "breathing moment" between content-heavy sections
   - Add a small heading above stats: "By the Numbers" or similar eyebrow text in brand purple
   - Numbers: `text-4xl md:text-5xl font-bold`

3. **Aurora/glow background**:
   - Keep the existing radial gradient center glow
   - If you added the Soft Aurora ReactBits background, keep it — it works well here
   - Make sure the background is absolutely positioned and doesn't affect layout

4. **Entrance animation**:
   - Stats drop in from above with spring bounce: `initial={{ opacity: 0, y: -30 }}`, stagger 0.15s
   - Numbers count up AFTER the drop-in animation (delay the counter start by 0.5s after entering viewport)
   - Brief purple glow pulse on each number when counting completes

Test: 4 stats centered in viewport at 1280x720.
```

---

## Prompt 6: Testimonials — Horizontal Carousel in 100vh

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap. Each section = 100vh. Content must fit without overflow.

TASK: Update `src/components/features/testimonials.tsx` to fit in one viewport.

1. **Section layout**:
   - Remove `py-24 md:py-32`
   - Outer container: `h-full flex flex-col justify-center overflow-hidden`
   - Heading area at top with compact spacing
   - Carousel in the middle, vertically centered

2. **Compact heading**:
   - Eyebrow + heading + description: compact, same pattern as other sections
   - Max gap to carousel: `mt-6 md:mt-8`

3. **Carousel**:
   - Keep the existing auto-scrolling horizontal carousel — it works inside a fixed-height section
   - Card height: constrain to max `h-[200px]` or similar so they fit
   - Card width: keep `w-[340px] sm:w-[380px]`
   - Quote text: `text-sm line-clamp-4` to prevent overflow
   - Keep the fade masks on left/right edges

4. **Entrance animation**:
   - Heading fades in
   - Carousel track slides in from the right with a smooth ease

Test: Heading + carousel fits in one 1280x720 screen with no vertical overflow.
```

---

## Prompt 7: Trust Signals + CTA Banner — Each in 100vh

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap. Each section = 100vh. Content must fit without overflow.

TASK: Update Trust Signals and CTA Banner to each fit in one viewport.

### Trust Signals (`src/components/features/trust-signals.tsx`):

1. **Section layout**: `h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8`

2. **Content stacking — all centered vertically**:
   - Certifications row at top (ISO, SOC, GDPR badges)
   - Star ratings row below
   - Press logos below that
   - Everything compact with `gap-6 md:gap-8` between groups
   - This section should feel like a "trust wall" — clean, centered, confident

3. **Entrance animation**: Elements fade-in + scale with stagger from center outward

### CTA Banner (`src/components/features/cta-banner.tsx`):

1. **Section layout**: `h-full flex flex-col items-center justify-center` (centered in viewport)
   - Remove `py-24 md:py-32`

2. **Content**:
   - Big heading centered: `text-3xl sm:text-4xl md:text-5xl`
   - Subtitle below
   - Two CTA buttons centered
   - Keep the gradient background and particle overlay

3. **Add minimal footer info at the bottom of this section**:
   - Since we removed the Footer from layout (it breaks scroll-snap), add a small footer strip at the absolute bottom of the CTA section:
   ```
   <div className="absolute bottom-0 left-0 right-0 py-4 text-center text-xs text-white/30">
     © 2026 Raabyt Technologies. All rights reserved.
   </div>
   ```

4. **Entrance animation**: Heading reveals with staggered character/word animation, CTAs slide up

Test: Both sections individually fit in 1280x720 viewport.
```

---

## Prompt 8: Scroll Dots Navigation + Section Transitions

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap site. All sections are 100vh and snap on scroll.

TASK: Fix the scroll dots and add smooth section transition effects.

### Scroll Dots (`src/components/ui/scroll-dots.tsx`):

1. **Fix for scroll-snap container**:
   - The scroll container is now `<main>` (not the window)
   - ScrollDots must observe the `<main>` element's scroll position, NOT `window.scrollY`
   - Use `IntersectionObserver` on each section `id` to detect which is active
   - OR use the main element's `scrollTop` divided by `innerHeight` to determine active section index

2. **Click behavior**:
   - Clicking a dot should call `mainElement.scrollTo({ top: sectionIndex * window.innerHeight, behavior: 'smooth' })`
   - OR use `document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })`

3. **Styling** — keep existing: fixed right side, purple active dot with glow, hidden on mobile

### Section Transition Effects:

4. **Add CSS transitions between snaps**:
   In `globals.css`, add smooth scroll behavior for the snap container:
   ```css
   main#main-content {
     scroll-behavior: smooth;
   }
   ```

5. **Optional: Add a per-section entrance animation wrapper**:
   Create `src/components/ui/snap-section.tsx`:
   ```tsx
   "use client";
   import { motion } from "framer-motion";
   import { useRef } from "react";

   interface SnapSectionProps {
     children: React.ReactNode;
     id: string;
     className?: string;
   }

   export function SnapSection({ children, id, className }: SnapSectionProps) {
     return (
       <motion.div
         id={id}
         className={`h-screen h-[100dvh] snap-start overflow-hidden relative ${className || ''}`}
         initial={{ opacity: 0.8 }}
         whileInView={{ opacity: 1 }}
         viewport={{ amount: 0.5 }}
         transition={{ duration: 0.4 }}
       >
         {children}
       </motion.div>
     );
   }
   ```
   Then use `<SnapSection id="hero">` in page.tsx instead of plain `<div>`.

6. **ScrollProgress bar** (`src/components/ui/scroll-progress.tsx`):
   - Fix it to track the `<main>` scroll container instead of window scroll
   - Should show progress as user scrolls through sections (0% at hero → 100% at CTA)

### Remove unnecessary components:

7. Remove or disable these (they cause conflicts with scroll-snap):
   - `SmoothScrollProvider` / Lenis — conflicts with snap behavior
   - `AnimatedDivider` — no dividers between full-screen sections
   - `SectionTransition` — not needed when sections snap
   - `ParallaxSection` — parallax doesn't work with snap scrolling

Test: Scrolling snaps between sections. Dots highlight correctly. Clicking dots navigates to sections.
```

---

## Prompt 9: ReactBits Backgrounds + Final Visual Polish

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap site. All sections are 100vh. Each section fills the screen.

TASK: Add ReactBits backgrounds and visual polish to each section. Since each section is a full-screen "slide", backgrounds make a HUGE visual impact.

IMPORTANT: Each background must be:
- Absolutely positioned inside the section (`absolute inset-0 -z-10`)
- Dynamic imported with `next/dynamic` ssr: false
- Low opacity (15-30%) so content remains readable
- pointer-events-none so they don't interfere with clicks

### Backgrounds per section:

1. **Hero** — Keep existing R3F 3D scene. No changes.

2. **Products** — ReactBits **Threads**:
   - Dep: `npm install ogl` (if not installed)
   - Props: `color={[0.54, 0.36, 0.96]}` (brand purple RGB), `amplitude={0.5}`, `distance={0}`, `enableMouseInteraction={true}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-20 pointer-events-none"`

3. **Why Raabyt** — ReactBits **Dot Grid**:
   - No extra dep needed
   - Props: `dotSize={3}`, `gap={35}`, `baseColor="#8B5CF6"`, `activeColor="#D946EF"`, `proximity={100}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-15"`
   - NOTE: remove `pointer-events-none` on this one since Dot Grid reacts to mouse hover — that's the cool interactive part

4. **Stats** — ReactBits **Soft Aurora**:
   - No extra dep needed
   - Props: `speed={0.3}`, `brightness={0.5}`, `color1="#8B5CF6"`, `color2="#D946EF"`, `enableMouseInteraction={false}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-25 pointer-events-none"`

5. **Testimonials** — ReactBits **Waves**:
   - No extra dep needed
   - Props: `lineColor="rgba(139,92,246,0.1)"`, `backgroundColor="transparent"`, `waveSpeedX={0.008}`, `waveSpeedY={0.003}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-40 pointer-events-none"`

6. **Trust Signals** — ReactBits **Silk**:
   - No extra dep needed (pure WebGL)
   - Props: `speed={3}`, `scale={1}`, `color="#8B5CF6"`, `noiseIntensity={1.2}`, `rotation={0}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-10 pointer-events-none"`

7. **CTA Banner** — ReactBits **Floating Lines**:
   - Dep: `ogl` (already installed from Products)
   - Props: `linesGradient={["#8B5CF6", "#D946EF", "#EC4899", "#8B5CF6"]}`, `enabledWaves={['top', 'middle', 'bottom']}`
   - Wrapper: `className="absolute inset-0 -z-10 opacity-20 pointer-events-none"` — BEHIND the existing gradient

If any ReactBits component fails to install via CLI, go to reactbits.dev/backgrounds/<name>, click the "Code" tab, and copy the source file manually into `src/components/ui/backgrounds/`.

### Final Polish:

8. **Section entrance animations** — each section should have a subtle entrance when snapping into view:
   - Fade from opacity 0.8 to 1 over 0.3s (already handled by SnapSection wrapper)
   - Content elements inside can have their own whileInView stagger animations

9. **Scroll indicator on hero** — bouncing chevron at bottom that says "Scroll to explore", fades after first scroll

10. Run `npm run build` and verify no errors.
```

---

## Prompt 10: Mobile Responsiveness + Performance

```
Read AGENTS.md first before writing any code.

CONTEXT: Full-page scroll-snap site. Need to ensure it works on all devices.

TASK: Mobile fixes and performance optimization.

1. **Mobile scroll-snap**:
   - On mobile (below md: 768px), scroll-snap can feel janky. Two options:
     a) Keep scroll-snap but use `snap-proximity` instead of `snap-mandatory` on mobile
     b) Disable scroll-snap entirely on mobile and use normal scrolling
   - Recommended: Use `snap-mandatory` on desktop, `snap-proximity` on mobile:
     ```css
     main#main-content {
       scroll-snap-type: y proximity;
     }
     @media (min-width: 768px) {
       main#main-content {
         scroll-snap-type: y mandatory;
       }
     }
     ```

2. **Mobile section heights**:
   - Use `h-[100dvh]` instead of `h-screen` for sections — `dvh` accounts for mobile browser chrome (address bar)
   - Content must fit: on small screens, text sizes need to shrink further
   - Product cards: `grid-cols-2` with very compact cards on mobile
   - Feature cards: `grid-cols-1 sm:grid-cols-2` on mobile, scrollable if needed OR stack to 2 columns of 3

3. **Disable heavy backgrounds on mobile**:
   - All ReactBits backgrounds should be hidden on mobile: wrap in `<div className="hidden md:block absolute inset-0 ...">`
   - On mobile, use simple CSS gradient fallbacks instead
   - This prevents GPU overload on phones

4. **Reduced motion**:
   - When `prefers-reduced-motion` is enabled:
     - Disable scroll-snap (use normal scroll)
     - All entrance animations → instant (no stagger, no transforms)
     - Backgrounds → static
     - Use the existing `useReducedMotion` hook

5. **Lazy loading**:
   - All ReactBits background components: `next/dynamic` with `ssr: false` (should already be done)
   - The R3F hero scene: already dynamically imported
   - Images: use `loading="lazy"` on any images below the fold

6. **ScrollDots — hide on mobile**: Already `hidden lg:flex`, confirm this works.

7. Run `npm run build` — fix any errors. Then test at these viewports:
   - 1920x1080 (desktop)
   - 1280x720 (laptop)
   - 768x1024 (tablet)
   - 375x812 (iPhone)

   All sections should fit their viewport at each size.
```

---

## Quick Reference: Section Sizing Summary

| Section | Desktop (1280x720) | Content Strategy |
|---------|-------------------|------------------|
| Hero | 100vh, centered | Heading + subtitle + 2 CTAs + 4 badges + scroll indicator |
| Products | 100vh, centered | Compact heading + 4x2 grid of small cards |
| Why Raabyt | 100vh, centered | Compact heading + bento grid (2 large + 4 small) |
| Stats | 100vh, centered | Eyebrow + 4 stats in a row, lots of breathing room |
| Testimonials | 100vh, centered | Compact heading + horizontal auto-scroll carousel |
| Trust Signals | 100vh, centered | Certs + ratings + press logos, stacked center |
| CTA Banner | 100vh, centered | Big heading + 2 CTAs + mini footer at bottom |

## Key Differences from Previous Prompts

| Previous (wrong) | New (correct) |
|-------------------|---------------|
| Normal scrolling with Lenis smooth scroll | CSS `scroll-snap-type: y mandatory` |
| Sections have natural height (py-24, etc.) | Every section is exactly `100vh` |
| Content overflows and you scroll through it | Content is compact and fits in one screen |
| Parallax effects on scroll | No parallax — sections snap as whole units |
| Scroll-triggered reveals mid-section | Section entrance animations when snapping in |
| Footer as separate element | Footer info embedded in CTA section |
| AnimatedDivider between sections | No dividers — clean snap between sections |
