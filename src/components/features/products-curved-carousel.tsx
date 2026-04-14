"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Curved 3D perspective product carousel.
 * Cards are arranged on an arc; users can drag left/right, use arrow keys,
 * or click a side card to rotate it into focus. The center card is highlighted.
 *
 * Each card sits on the arc using CSS transforms:
 *   translate3d(offsetX, 0, depth) rotateY(angle)
 */

// Arc configuration
const RADIUS = 1100; // virtual radius in px of the arc the cards sit on
const ANGLE_STEP = 14; // degrees between adjacent cards
const MAX_VISIBLE_OFFSET = 2; // cards beyond this are hidden

interface CarouselProduct {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: readonly [number, number, number] | [number, number, number];
  isNew?: boolean;
}

// Pixels of drag that equal exactly one card step (180 feels natural on trackpads + mouse)
const PX_PER_CARD = 180;

export function ProductsCurvedCarousel() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(PRODUCTS.length / 2)
  );
  const [dragX, setDragX] = useState(0); // live drag offset in px
  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setActiveIndex((i) => Math.min(PRODUCTS.length - 1, i + 1));
  }, []);
  const goPrev = useCallback(() => {
    setActiveIndex((i) => Math.max(0, i - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Pointer drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);

    // How many card-steps did the drag cover?
    // Positive dragX (drag right) → reveal previous card(s) → decrement index
    // Negative dragX (drag left)  → reveal next card(s)     → increment index
    const step = Math.round(dragX / PX_PER_CARD);
    if (step !== 0) {
      setActiveIndex((i) =>
        Math.max(0, Math.min(PRODUCTS.length - 1, i - step))
      );
    }

    setDragX(0);
  };

  // Live angle offset during drag — positive dragX shifts all cards RIGHT (natural feel)
  const dragAngleOffset = (dragX / PX_PER_CARD) * ANGLE_STEP;

  return (
    <div className="relative w-full select-none">
      {/* Stage — 3D perspective container */}
      <div
        ref={containerRef}
        className="relative mx-auto h-[520px] md:h-[560px] touch-pan-y cursor-grab active:cursor-grabbing"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 55%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {PRODUCTS.map((product, i) => {
            const offset = i - activeIndex;
            const visibleOffset = Math.abs(offset);

            // Hide cards too far from center
            if (visibleOffset > MAX_VISIBLE_OFFSET + 1) return null;

            // Angle this card sits at on the arc, plus drag offset
            const angle = offset * ANGLE_STEP + dragAngleOffset;
            const isActive = offset === 0;

            // Position on the arc
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * RADIUS;
            const z = -Math.abs(Math.cos(rad) * RADIUS) + RADIUS; // bring card forward relative to arc

            // Opacity fades as card gets further from center
            const opacity = Math.max(0.35, 1 - visibleOffset * 0.25);

            return (
              <CurvedCard
                key={product.slug}
                product={product}
                active={isActive}
                x={x}
                z={z}
                angle={angle}
                opacity={opacity}
                isDragging={isDragging}
                onClick={() => setActiveIndex(i)}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            "bg-white/5 border border-white/10 text-foreground",
            "transition-all duration-200 hover:bg-white/10 hover:border-white/25",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label="Previous product"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to ${p.name}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-8 bg-brand-purple"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === PRODUCTS.length - 1}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            "bg-white/5 border border-white/10 text-foreground",
            "transition-all duration-200 hover:bg-white/10 hover:border-white/25",
            "disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          aria-label="Next product"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hint */}
      <p className="mt-4 text-center text-xs text-muted/50 uppercase tracking-wider">
        Drag &middot; Arrow keys &middot; Click a card
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */

function CurvedCard({
  product,
  active,
  x,
  z,
  angle,
  opacity,
  isDragging,
  onClick,
}: {
  product: CarouselProduct;
  active: boolean;
  x: number;
  z: number;
  angle: number;
  opacity: number;
  isDragging: boolean;
  onClick: () => void;
}) {
  const Icon = product.icon;
  const [r, g, b] = product.glowColor;

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: "240px",
        height: "380px",
        marginLeft: "-120px",
        marginTop: "-190px",
        transform: `translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
        transformStyle: "preserve-3d",
        opacity,
        // Zero-duration during active drag so cards track the finger 1:1;
        // smooth spring after release for the snap-to-card.
        transition: isDragging
          ? "none"
          : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
        willChange: "transform",
        zIndex: active ? 50 : 10 - Math.round(Math.abs(angle) / 5),
      }}
    >
      {active ? (
        <Link
          href={`/products/${product.slug}`}
          onClick={(e) => {
            // Only navigate when already active
            if (!active) {
              e.preventDefault();
              onClick();
            }
          }}
          className="block w-full h-full"
          draggable={false}
        >
          <CardBody product={product} active={active} rgb={[r, g, b]} Icon={Icon} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="block w-full h-full cursor-pointer"
          aria-label={`View ${product.name}`}
        >
          <CardBody product={product} active={active} rgb={[r, g, b]} Icon={Icon} />
        </button>
      )}
    </div>
  );
}

function CardBody({
  product,
  active,
  rgb,
  Icon,
}: {
  product: CarouselProduct;
  active: boolean;
  rgb: readonly [number, number, number] | [number, number, number];
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const [r, g, b] = rgb;

  return (
    <div
      className={cn(
        "relative w-full h-full rounded-2xl overflow-hidden",
        "flex flex-col items-center justify-between p-8",
        "transition-all duration-500",
        active
          ? "shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          : "shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      )}
      style={{
        background: active
          ? `linear-gradient(155deg, rgba(${r},${g},${b},0.18) 0%, rgba(20,20,30,0.95) 55%, rgba(10,10,18,0.98) 100%)`
          : "linear-gradient(155deg, rgba(35,35,45,0.95) 0%, rgba(15,15,22,0.98) 100%)",
        border: active
          ? `1px solid rgba(${r},${g},${b},0.5)`
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: active
          ? `0 0 80px rgba(${r},${g},${b},0.25), inset 0 1px 0 rgba(255,255,255,0.08)`
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Big background letter */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span
          className={cn(
            "text-[11rem] font-bold leading-none select-none",
            "transition-all duration-500"
          )}
          style={{
            color: active
              ? `rgba(${r},${g},${b},0.25)`
              : "rgba(255,255,255,0.06)",
            textShadow: active
              ? `0 0 40px rgba(${r},${g},${b},0.4)`
              : "none",
          }}
        >
          {product.name.charAt(0)}
        </span>
      </div>

      {/* Top: icon */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
          )}
          style={{
            background: active
              ? `rgba(${r},${g},${b},0.2)`
              : "rgba(255,255,255,0.04)",
            color: active ? `rgb(${r},${g},${b})` : "rgba(255,255,255,0.4)",
            border: active
              ? `1px solid rgba(${r},${g},${b},0.3)`
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
        {product.isNew && active && <Badge>New</Badge>}
      </div>

      {/* Bottom: text block */}
      <div className="relative z-10 text-center w-full">
        <h3
          className={cn(
            "font-bold leading-tight transition-all duration-300",
            active ? "text-2xl text-white" : "text-xl text-white/70"
          )}
        >
          {product.name}
        </h3>
        <p
          className={cn(
            "text-sm mt-2 leading-snug transition-all duration-300",
            active ? "text-white/80" : "text-white/40"
          )}
        >
          {product.description}
        </p>
        <p
          className={cn(
            "text-xs mt-3 leading-relaxed transition-all duration-300",
            active ? "text-white/60" : "text-white/30"
          )}
        >
          {product.tagline}
        </p>

        {active && (
          <div
            className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium"
            style={{ color: `rgb(${r},${g},${b})` }}
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
