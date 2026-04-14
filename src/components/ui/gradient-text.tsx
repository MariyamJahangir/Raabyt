import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
}

const GradientText = forwardRef<HTMLElement, GradientTextProps>(
  ({ className, as: Tag = "span", ...props }, ref) => (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(
        "bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  )
);

GradientText.displayName = "GradientText";

export { GradientText };
