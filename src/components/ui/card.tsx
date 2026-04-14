import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Card ─── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white/5 backdrop-blur-xl border border-white/10",
        "transition-shadow duration-300",
        "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/* ─── CardHeader ─── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 pt-6 pb-2", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/* ─── CardBody ─── */

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-6 py-4", className)}
      {...props}
    />
  )
);
CardBody.displayName = "CardBody";

/* ─── CardFooter ─── */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pb-6 pt-2 flex items-center border-t border-white/5",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter };
