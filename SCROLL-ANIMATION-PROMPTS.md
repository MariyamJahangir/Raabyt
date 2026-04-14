# Raabyt Website - Scroll-Based Storytelling Animation Prompts

> **How to use:** Copy each phase prompt into your VS Code Claude Code chat, one at a time. Wait for each phase to be fully implemented and tested before moving to the next. Each prompt builds on the previous one.

---

## Phase 1: Install Dependencies & Create Scroll Animation Infrastructure

```
CONTEXT: I'm transforming the Raabyt website (Next.js 16, React 19, Tailwind v4, Framer Motion, React Three Fiber) into a scroll-based storytelling experience. The site uses a dark theme with brand colors: purple (#8B5CF6), magenta (#D946EF), pink (#EC4899), and dark backgrounds (#0A0A0F, #111119). DO NOT change any colors or the existing color theme.

Read AGENTS.md first before writing any code — this project uses Next.js 16 with breaking changes.

TASK: Set up the scroll animation infrastructure.

1. Install these dependencies:
   - `@studio-freight/lenis` (smooth scroll library for buttery scrolling)
   - `gsap` and `@gsap/react` (for scroll-triggered timeline animations)

2. Create a smooth scroll provider component at `src/components/layout/smooth-scroll-provider.tsx`:
   - Wrap the app with Lenis for smooth, momentum-based scrolling
   - It should be a "use client" component
   - Initialize Lenis with: duration 1.2, easing using cubic bezier, smooth: true, smoothTouch: false
   - Integrate with Framer Motion's `useScroll` so both libraries work together
   - Clean up on unmount

3. Create a reusable scroll-reveal component at `src/components/ui/scroll-reveal.tsx`:
   - Props: children, direction ('up' | 'down' | 'left' | 'right'), delay, duration, distance, once (boolean), className
   - Uses Framer Motion's `useInView` and `motion` for reveal animations
   - Default: fade-up with 60px travel, 0.6s duration, triggers once
   - Respects `prefers-reduced-motion`

4. Create a parallax wrapper component at `src/components/ui/parallax-section.tsx`:
   - Uses Framer Motion's `useScroll` and `useTransform`
   - Props: children, speed (number from -0.5 to 0.5), className
   - Applies translateY based on scroll position multiplied by speed factor

5. Create a scroll-progress indicator component at `src/components/ui/scroll-progress.tsx`:
   - A thin gradient line (purple to magenta) at the very top of the viewport (below header, z-40)
   - Shows how far the user has scrolled down the page
   - Uses Framer Motion's `useScroll` and `scaleX` transform

6. Update `src/app/layout.tsx`:
   - Wrap children with the SmoothScrollProvider
   - Add the ScrollProgress indicator

DO NOT change any existing component content or colors. Only add the infrastructure.
```

---

## Phase 2: Hero Section - Cinematic Scroll-Driven Reveal

```
CONTEXT: Continuing the scroll-based storytelling transformation. The site uses dark theme with purple (#8B5CF6), magenta (#D946EF) brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Transform the hero section (`src/components/features/hero-section.tsx`) into a cinematic scroll-driven experience.

Current hero: Full viewport height, 3D R3F background, text on left side with title "Secure AI-Powered On-Premise Enterprise Software", subtitle, CTAs, and trust badges.

Transform it into:

1. **Entrance animation (on load, before scroll)**:
   - The "ENTERPRISE SOFTWARE SUITE" eyebrow text types in character by character (typewriter effect, ~50ms per char)
   - After typewriter completes, the main heading words reveal one by one with a clip-path animation (reveal from bottom to top, each word staggered by 0.15s)
   - Subtitle paragraph fades in and slides up
   - CTA buttons slide in from left with spring physics
   - Trust badges fade in with stagger

2. **On-scroll parallax behavior**:
   - As user scrolls DOWN past the hero, the text content should move up (parallax, faster than scroll) and fade out gradually
   - The 3D background scene should scale up slightly (1.0 to 1.1) and blur slightly as the user scrolls away, creating depth
   - Use Framer Motion's `useScroll` with `target` ref and `offset: ["start start", "end start"]`
   - Map `scrollYProgress` to opacity (1 to 0), translateY (0 to -100px), and scale (1 to 1.1) for the background

3. **Keep existing 3D scene** — don't remove or modify the R3F Canvas. Just wrap it to respond to scroll.

4. **Add a subtle scroll indicator** at the bottom of the hero:
   - A small animated chevron/arrow bouncing downward
   - Text "Scroll to explore" in small muted text
   - Fades out as user starts scrolling
   - Use Framer Motion's animate with repeat

5. Ensure the hero section remains `h-screen min-h-[600px] max-h-[1200px]` and all content is accessible.

IMPORTANT: Keep the same text content, same structure, same colors. Only enhance with scroll-driven animations.
```

---

## Phase 3: Products Showcase - Staggered Scroll Reveal with Card Animations

```
CONTEXT: Continuing scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Transform the Products Showcase section (`src/components/features/products-showcase.tsx`) into a scroll-triggered storytelling reveal.

Current: Grid of 8 product cards with basic whileInView fade-in.

Transform it into:

1. **Section heading reveal**:
   - The "Our Products" eyebrow should slide in from the left with a purple line that draws itself (width animates from 0 to 100%) beneath it
   - "One Platform. Every Solution." heading reveals word-by-word using clip-path (bottom to top reveal)
   - Description text fades and slides up after heading completes

2. **Product cards — scroll-triggered staggered cascade**:
   - Cards should NOT all appear at once. They should cascade in as the user scrolls:
     - First row (4 cards on desktop): stagger in from bottom with a 3D perspective tilt (start at rotateX: 15deg, rotateY: -5deg → animate to 0,0)
     - Each card enters with a subtle scale from 0.85 to 1, opacity 0 to 1, and translateY from 80px to 0
     - Stagger: 0.1s between each card
   - Second row follows the same pattern but triggers slightly later as user scrolls further

3. **Card hover enhancement** (keep existing TiltCard but add):
   - On hover, a subtle purple glow pulse radiates from the card's icon
   - The icon should scale up slightly (1.0 to 1.15) with a spring transition
   - Card border should transition to a gradient border (purple to magenta)
   - The "Learn more" arrow should slide right by 4px

4. **Background effect for this section**:
   - Add a very subtle animated dot grid pattern behind the products section
   - Dots should be white at 3-5% opacity, arranged in a grid, with a gentle floating/breathing animation
   - This creates depth without distracting from the cards
   - Implement this as a CSS-only solution (radial-gradient dots + subtle animation) — not a heavy canvas/WebGL approach

5. Keep all existing content, links, and the TiltCard component. Only enhance with animations.
```

---

## Phase 4: Why Raabyt - Feature Cards with Scroll-Linked Storytelling

```
CONTEXT: Continuing scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Transform the "Why Raabyt" section (`src/components/features/why-raabyt.tsx`) into a scroll-linked storytelling experience.

Current: Grid of 6 feature cards (2 large + 4 small) with basic fade-in.

Transform it into:

1. **Section intro with scroll-linked text reveal**:
   - As user scrolls into this section, the eyebrow "Why Raabyt?" should appear with a horizontal line that draws from center outward (both left and right simultaneously)
   - The heading "Built for enterprises that refuse to compromise" should reveal using a mask/clip animation — text appears as if being unveiled from left to right, following scroll position (not time-based — tied to actual scroll progress)
   - Description text fades in after heading reveal completes

2. **Feature cards — sequential storytelling reveal**:
   - Instead of all cards appearing together, they should reveal in a storytelling sequence as user scrolls:
   - The two LARGE cards ("On-Premise Security" and "AI-Powered Automation") should enter from opposite sides:
     - "On-Premise Security" slides in from the LEFT (translateX: -100px to 0, opacity 0 to 1)
     - "AI-Powered Automation" slides in from the RIGHT (translateX: 100px to 0, opacity 0 to 1)
     - Both with a subtle scale (0.95 to 1)
   - The four SMALL cards then cascade in from bottom, staggered 0.12s apart
   - All animations trigger based on scroll position using Framer Motion's `useScroll` with appropriate offsets

3. **Card icon animation**:
   - When each card enters the viewport, its icon should have a brief "draw" animation — the Lucide icon strokes appear to draw themselves (use stroke-dasharray + stroke-dashoffset CSS animation, triggered on scroll-reveal)
   - Duration: 0.8s per icon

4. **Connecting visual element**:
   - Between the large cards and small cards, add a subtle horizontal gradient line (purple to transparent to magenta) that draws itself as user scrolls through the section
   - This acts as a visual "chapter divider" in the storytelling flow

5. Keep all existing content and card styling. Only add scroll-driven animation enhancements.
```

---

## Phase 5: Stats Counter - Dramatic Number Reveal

```
CONTEXT: Continuing scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Transform the Stats Counter section (`src/components/features/stats-counter.tsx`) into a dramatic scroll-triggered moment.

Current: 4 stat boxes with animated counting numbers, basic fade-in.

Transform it into:

1. **Background enhancement**:
   - Add the ReactBits "Soft Aurora" background effect behind this section.
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/SoftAurora`
   - No extra dependency needed (pure WebGL shader)
   - Configure with brand colors:
     ```jsx
     <SoftAurora
       speed={0.4}
       scale={1.2}
       brightness={0.6}
       color1="#8B5CF6"
       color2="#D946EF"
       noiseFrequency={2.0}
       noiseAmplitude={0.8}
       bandHeight={0.5}
       bandSpread={1.2}
       enableMouseInteraction={false}
     />
     ```
   - Wrap in: `className="absolute inset-0 -z-10 opacity-25 pointer-events-none"`
   - Dynamic import with `next/dynamic` ssr: false
   - If the ReactBits install fails, create a custom aurora at `src/components/ui/aurora-background.tsx` using CSS animations with multiple layered radial gradients that slowly move and morph — purple (#8B5CF6 at 10-15% opacity) and magenta (#D946EF at 5-10% opacity), 15-20s animation cycle

2. **Stats reveal — scroll-triggered theatrical entrance**:
   - As section scrolls into center of viewport:
     - First, a thin horizontal line draws itself from center outward across the full width (purple gradient)
     - Then, each stat box "drops in" from above with a spring bounce effect (translateY: -40px to 0 with spring physics: stiffness 200, damping 15)
     - Stagger: 0.15s between each stat
   - The number counting animation should START only after the drop-in completes (not simultaneously)
   - Numbers should count up faster (1.5s instead of current 2s) with an elastic easing

3. **Stat number glow effect**:
   - When counting completes, each number should briefly pulse with a purple text-shadow glow (0 0 20px rgba(139,92,246,0.5))
   - The glow fades out over 1s

4. **Subtle floating particles**:
   - Add 15-20 tiny floating dots (2-3px) around the stats area
   - White at 8-12% opacity, gently floating upward with random horizontal drift
   - Pure CSS animation (no canvas needed) — use the existing `cta-float` keyframe as a base

5. Keep all existing stat data, icons, and counting logic. Only enhance with scroll animations and visual effects.
```

---

## Phase 6: Testimonials - Cinematic Scroll-Triggered Carousel

```
CONTEXT: Continuing scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Enhance the Testimonials section (`src/components/features/testimonials.tsx`) with scroll-driven storytelling.

Current: Auto-scrolling horizontal carousel with fade masks.

Transform it into:

1. **Section entrance**:
   - "Testimonials" eyebrow fades in with a subtle blur-to-sharp transition (filter: blur(8px) to blur(0))
   - "Trusted by enterprise leaders" heading does a perspective reveal — starts at rotateX(10deg) with slight scale(0.97) and opacity 0, animates to normal
   - Description fades up

2. **Enhanced carousel behavior**:
   - Keep the existing auto-scroll carousel mechanism
   - Add a subtle parallax effect: as user scrolls through this section, the carousel track should move slightly faster horizontally (additional translateX offset based on vertical scroll)
   - This creates a "scroll accelerates the carousel" feeling

3. **Card entrance animation**:
   - When the testimonial section first enters viewport, cards should cascade in from the right edge:
     - Each card slides in from right (translateX: 60px to 0) with stagger
     - Slight rotation (rotateZ: 2deg to 0deg) for a "shuffling cards" feel
     - This only happens once on first view, then normal carousel takes over

4. **Active card highlight**:
   - The card closest to center viewport should have a subtle glow border (purple at 20% opacity)
   - Other cards should be slightly dimmed (opacity 0.7)
   - Transition smoothly as carousel moves

5. **Quote mark animation**:
   - The Quote icon on each card should scale in with a spring when the card is near center
   - Goes from scale(0.5) opacity(0.3) to scale(1) opacity(0.5)

6. Keep all existing testimonial data, card styling, and carousel logic. Only enhance with scroll-driven and entrance animations.
```

---

## Phase 7: Trust Signals & CTA Banner - Grand Finale Scroll Experience

```
CONTEXT: Continuing scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Transform the Trust Signals (`src/components/features/trust-signals.tsx`) and CTA Banner (`src/components/features/cta-banner.tsx`) into a grand finale scroll experience.

### Trust Signals:

1. **Certification badges — pop-in with stagger**:
   - Each badge scales in from 0 to 1 with elastic easing (overshoot to 1.1 then settle to 1.0)
   - Stagger: 0.1s between each
   - Trigger when section is 30% visible

2. **Star ratings — sequential fill**:
   - Stars should fill in one by one (like a progress indicator) from left to right
   - Each star goes from grayscale/dim to full amber color
   - Timing: 0.15s per star
   - The rating text (e.g., "4.8/5 on G2") fades in after stars complete

3. **Press logos — reveal with horizontal scroll-linked motion**:
   - "As featured in" text fades in
   - Logo names slide in from the right, staggered, with a subtle blur-to-sharp transition
   - As user continues scrolling, logos gently drift left (parallax, very subtle -0.1 speed)

### CTA Banner:

1. **Background enhancement**:
   - Keep the existing gradient and particles
   - Add a slow-rotating (20s per full rotation) subtle radial gradient overlay that creates a "spotlight sweep" effect
   - Implement via CSS: a large radial-gradient circle that rotates via CSS animation

2. **Content entrance — dramatic scroll reveal**:
   - "Ready to secure your enterprise?" heading should have a text-reveal effect: each character appears with a very brief stagger (15ms per char), combined with a subtle y-offset per character
   - Subtitle slides up and fades in after heading
   - CTA buttons enter from bottom with spring physics, the primary button first, secondary 0.2s after

3. **Button hover enhancement** (keep existing styles but add):
   - "Talk to Sales" white button: on hover, a ripple/pulse ring animation radiates outward from the button (white ring expanding and fading, like dropping a stone in water)
   - "Start Free Trial" ghost button: on hover, the border does a quick gradient sweep (purple travels around the border clockwise)

4. Keep all existing content and links. Only enhance with animations.
```

---

## Phase 8: ReactBits Background Integration & Page-Level Polish

```
CONTEXT: Final phase of scroll-based storytelling transformation. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Add ReactBits background effects and final page-level polish.

### ReactBits Backgrounds — install from https://reactbits.dev

ReactBits components are copy-paste. Install via CLI:
  npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/<ComponentName>

If the CLI fails, go to reactbits.dev/backgrounds/<component-name>, click the "Code" tab, and copy the component source manually. Each component is a single file you drop into your project. Wrap each in a "use client" component and dynamically import with next/dynamic ssr:false.

IMPORTANT: Check each component's dependencies and install them. Dependencies per component:
  - Silk: (none — pure CSS/canvas)
  - Aurora: `ogl`
  - Soft Aurora: (none — WebGL shader, no extra dep)
  - Threads: `ogl`
  - Particles: `three`, `@react-three/fiber`, `@react-three/drei` (already installed)
  - Dot Grid: (none — pure canvas)
  - Waves: (none — pure canvas)
  - Floating Lines: `ogl`
  - Beams: `three`, `@react-three/fiber`, `@react-three/drei` (already installed)
  - Grid Motion: `gsap`

Install any missing deps: `npm install ogl`

### Section-by-Section Background Assignments:

1. **Hero section** — Already has R3F 3D scene. No additional background needed.

2. **Products Showcase section** — Use ReactBits **Threads** background:
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/Threads`
   - Dependency: `npm install ogl`
   - Place the Threads component inside the products section, absolutely positioned behind content
   - Props to use:
     ```jsx
     <Threads
       color={[0.54, 0.36, 0.96]}  // RGB for #8B5CF6 (brand purple)
       amplitude={0.6}              // Subtle wave, not too intense
       distance={0}
       enableMouseInteraction={true}
     />
     ```
   - Wrap in a div: `className="absolute inset-0 -z-10 opacity-30 pointer-events-none"` (keep it subtle!)
   - Dynamic import with ssr: false

3. **Why Raabyt section** — Use ReactBits **Dot Grid** background:
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/DotGrid`
   - No external dependency (pure canvas)
   - Props to use:
     ```jsx
     <DotGrid
       dotSize={3}
       gap={40}
       baseColor="#8B5CF6"           // Brand purple
       activeColor="#D946EF"         // Brand magenta on hover
       proximity={120}
       shockRadius={200}
       shockStrength={3}
     />
     ```
   - Wrap in a div: `className="absolute inset-0 -z-10 opacity-20"`
   - The interactive dot hover effect adds a premium feel to the features section
   - Dynamic import with ssr: false

4. **Stats Counter section** — Use ReactBits **Soft Aurora** background:
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/SoftAurora`
   - No external dependency (WebGL shader)
   - Props to use:
     ```jsx
     <SoftAurora
       speed={0.4}                  // Slow, elegant movement
       scale={1.2}
       brightness={0.6}             // Dim — don't overpower the stats numbers
       color1="#8B5CF6"              // Brand purple
       color2="#D946EF"              // Brand magenta
       noiseFrequency={2.0}
       noiseAmplitude={0.8}
       bandHeight={0.5}
       bandSpread={1.2}
       enableMouseInteraction={false}  // Don't distract from stats
     />
     ```
   - Wrap in a div: `className="absolute inset-0 -z-10 opacity-25"`
   - Dynamic import with ssr: false

5. **Testimonials section** — Use ReactBits **Waves** background:
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/Waves`
   - No external dependency (pure canvas)
   - Props to use:
     ```jsx
     <Waves
       lineColor="rgba(139, 92, 246, 0.08)"  // Brand purple, very subtle
       backgroundColor="transparent"
       waveSpeedX={0.008}            // Very slow horizontal
       waveSpeedY={0.003}            // Very slow vertical
       waveAmpX={24}
       waveAmpY={12}
       xGap={14}
       yGap={36}
       friction={0.92}
       tension={0.003}
       maxCursorMove={80}
     />
     ```
   - Wrap in a div: `className="absolute inset-0 -z-10 opacity-40"`
   - Dynamic import with ssr: false

6. **CTA Banner section** — Use ReactBits **Floating Lines** background:
   - Install: `npx jsrepo add github/DavidHDev/react-bits/ts-tailwind/Backgrounds/FloatingLines`
   - Dependency: `npm install ogl` (already installed from step 2)
   - Props to use:
     ```jsx
     <FloatingLines
       linesGradient={["#8B5CF6", "#D946EF", "#EC4899", "#8B5CF6"]}
       enabledWaves={['top', 'middle', 'bottom']}
       lineCount={[4, 3, 4]}
       lineDistance={[6, 8, 6]}
     />
     ```
   - Wrap in a div: `className="absolute inset-0 -z-10 opacity-20"` — layered BEHIND the existing gradient and particles
   - Dynamic import with ssr: false

### Page-Level Polish:

7. **Between sections** — Add smooth gradient transitions:
   - Between each major section, add a gradient fade element
   - Create `src/components/ui/section-transition.tsx`:
     - Goes from section background → subtle purple glow at 3-5% opacity → next section background
     - This creates visual continuity as user scrolls, like chapters in a story
     - Height: 80-120px, no pointer events

8. **Scroll-triggered section separators**:
   - Replace the existing `<Divider />` components with scroll-animated dividers
   - Create `src/components/ui/animated-divider.tsx`:
     - A horizontal line that draws itself from center outward as it enters viewport
     - Gradient: transparent → purple → magenta → purple → transparent
     - Width: 60% of container, centered
     - Duration: 0.8s, triggered by Framer Motion whileInView

9. **Page-level scroll progress dots** (optional sidebar nav):
   - Add a vertical dot navigation on the right side of the viewport (desktop only, hidden on mobile via lg:block)
   - Create `src/components/ui/scroll-dots.tsx`:
     - 7 dots representing each section (Hero, Products, Why Raabyt, Stats, Testimonials, Trust, CTA)
     - Active dot highlighted with brand purple + glow (box-shadow: 0 0 8px rgba(139,92,246,0.6))
     - Clicking a dot smooth-scrolls to that section
     - Position: fixed, right side, vertically centered
     - Small and unobtrusive (6px dots, 8px active)
     - Uses Intersection Observer to detect which section is active

10. **Placeholder images**:
    - Add placeholder images to `public/images/` for any sections that could benefit from visual content:
      - `public/images/placeholder-product-erp.svg` — Simple geometric placeholder (purple-tinted)
      - `public/images/placeholder-product-crm.svg`
      - `public/images/placeholder-product-hrm.svg`
      - `public/images/placeholder-product-dms.svg`
      - `public/images/placeholder-product-sales.svg`
      - `public/images/placeholder-product-purchase.svg`
      - `public/images/placeholder-product-finance.svg`
      - `public/images/placeholder-product-ufm.svg`
      - `public/images/placeholder-hero-abstract.svg` — Abstract geometric art for hero enhancement
      - `public/images/placeholder-testimonial-avatar.svg` — Generic user avatar silhouette
    - Each SVG should be a simple, clean geometric design using the brand purple/magenta colors
    - These are placeholders the user can later replace with real images

11. Update `src/app/page.tsx`:
    - Wrap each section in a div with an `id` for scroll dots navigation (e.g., id="hero", id="products", id="why-raabyt", id="stats", id="testimonials", id="trust", id="cta")
    - Add the section transition components between major sections
    - Replace `<Divider />` with `<AnimatedDivider />`

IMPORTANT: All ReactBits backgrounds MUST be dynamically imported with next/dynamic ssr:false. Keep opacity low (20-40%) so backgrounds don't overpower content. Test that the page scrolls smoothly at 60fps.
```

---

## Phase 9: Performance Optimization & Reduced Motion Support

```
CONTEXT: Final polish for scroll-based storytelling. Dark theme, purple/magenta brand colors. DO NOT change colors.

Read AGENTS.md first before writing any code.

TASK: Optimize performance and ensure accessibility.

1. **Reduced motion support**:
   - Audit ALL new animation components and ensure they respect `prefers-reduced-motion`
   - When reduced motion is preferred:
     - All scroll-triggered reveals should simply fade in (opacity only, no transforms)
     - Background animations should be static
     - Typewriter effects should show text immediately
     - Parallax effects should be disabled (speed = 0)
     - Number counters should show final value immediately
   - Use the existing `useReducedMotion` hook from `src/hooks/use-reduced-motion.ts`

2. **Lazy loading backgrounds**:
   - All background effect components (aurora, threads, particles) should be dynamically imported with `next/dynamic` and `ssr: false`
   - Show no loading skeleton for backgrounds (they're decorative)
   - This prevents them from blocking initial page render

3. **Intersection Observer optimization**:
   - Ensure all scroll-triggered animations use `viewport={{ once: true }}` where appropriate (elements that shouldn't re-animate)
   - For parallax effects, use `{ passive: true }` on scroll listeners
   - Use `will-change: transform` on elements that animate frequently, but remove it after animation completes

4. **GPU acceleration hints**:
   - Add `transform: translateZ(0)` or `will-change: transform` to frequently animated elements
   - Ensure no layout-triggering properties are animated (no width, height, top, left — only transform and opacity)

5. **Mobile experience**:
   - On screens below `lg` (1024px):
     - Disable parallax effects (they cause janky scrolling on mobile)
     - Simplify card entrance animations (basic fade-up only, no 3D perspective tilts)
     - Disable background particle animations
     - Keep the scroll progress bar and section reveals
   - Use Tailwind's responsive utilities and a custom `useIsMobile` hook if needed

6. **Test checklist** (manually verify each):
   - [ ] Smooth scrolling works (Lenis)
   - [ ] Hero entrance animation plays on load
   - [ ] Hero content parallaxes and fades on scroll
   - [ ] Products cards cascade in on scroll
   - [ ] Why Raabyt cards enter from sides on scroll
   - [ ] Stats counter drops in and counts up
   - [ ] Testimonials enter with cascade, carousel accelerates on scroll
   - [ ] Trust signals pop in with stagger
   - [ ] CTA heading reveals character by character
   - [ ] Scroll progress bar works
   - [ ] Section dot navigation works (desktop)
   - [ ] All animations disabled when prefers-reduced-motion is set
   - [ ] No jank on scroll (60fps)
   - [ ] Mobile: simplified animations, no parallax
   - [ ] All existing functionality preserved (links, navigation, mobile menu)

Run `npm run build` to ensure there are no build errors.
```

---

## Notes for Best Results

- **Run one phase at a time.** Let Claude Code implement and verify each phase before moving to the next.
- **Test after each phase.** Open `http://localhost:3000` and scroll through the page to verify animations.
- **If a ReactBits component install fails**, the prompt includes fallback instructions to create a custom implementation.
- **If scroll performance is bad**, Phase 9 addresses optimization. You can also skip some particle/background effects.
- **All prompts preserve your existing content, colors, and functionality.** Nothing should break.

### Recommended ReactBits backgrounds by section (confirmed from reactbits.dev):

| Section | ReactBits Component | Props Configured For | Dependency |
|---------|---------------------|---------------------|------------|
| Products Showcase | **Threads** | Purple RGB `[0.54, 0.36, 0.96]`, amplitude 0.6, mouse interaction on | `ogl` |
| Why Raabyt | **Dot Grid** | Purple base `#8B5CF6`, magenta active `#D946EF`, 3px dots, 40px gap | None (canvas) |
| Stats Counter | **Soft Aurora** | Purple+magenta colors, speed 0.4, brightness 0.6, no mouse interaction | None (WebGL) |
| Testimonials | **Waves** | Purple lines at 8% opacity, slow speed, subtle cursor interaction | None (canvas) |
| CTA Banner | **Floating Lines** | Purple→magenta→pink gradient, 3 wave layers | `ogl` |
| Hero | *Keep existing R3F 3D scene* | — | — |

### Estimated time per phase:
- Phase 1: ~5 min (infrastructure)
- Phase 2: ~10 min (hero animations)
- Phase 3: ~10 min (products section)
- Phase 4: ~10 min (why raabyt section)
- Phase 5: ~8 min (stats counter)
- Phase 6: ~8 min (testimonials)
- Phase 7: ~10 min (trust signals + CTA)
- Phase 8: ~15 min (backgrounds + polish)
- Phase 9: ~10 min (performance + a11y)
