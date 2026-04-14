import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn("relative h-px w-full", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />
    </div>
  )
);

Divider.displayName = "Divider";

export { Divider };
