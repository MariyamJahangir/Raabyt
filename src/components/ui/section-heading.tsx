import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      className,
      eyebrow,
      heading,
      description,
      align = "center",
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-widest text-brand-purple mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground">
        {heading}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
);

SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
