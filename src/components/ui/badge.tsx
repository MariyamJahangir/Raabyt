import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-brand-purple/15 text-brand-purple border-brand-purple/25",
  success:
    "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  warning:
    "bg-amber-500/15 text-amber-400 border-amber-500/25",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge };
