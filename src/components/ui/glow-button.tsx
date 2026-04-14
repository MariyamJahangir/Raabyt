"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative inline-flex group">
      {/* Animated glow halo */}
      <div
        className={cn(
          "absolute -inset-1 rounded-lg opacity-60 blur-lg transition-opacity duration-500",
          "bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-purple",
          "bg-[length:200%_100%] animate-[glow-shift_3s_ease-in-out_infinite]",
          "group-hover:opacity-100"
        )}
        aria-hidden="true"
      />
      {/* Button */}
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "h-12 px-8 text-base font-semibold text-white rounded-lg",
          "bg-gradient-to-r from-brand-purple to-brand-magenta",
          "transition-transform duration-200 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
