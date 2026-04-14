import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main";
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Tag = "div", ...props }, ref) => (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
);

Container.displayName = "Container";

export { Container };
