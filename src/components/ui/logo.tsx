import Image from "next/image";
import { cn } from "@/lib/utils";

const VARIANTS = {
  icon: {
    src: "/images/raabyt-icon.png",
  },
  full: {
    src: "/images/raabyt-logo-full.png",
  },
  wordmark: {
    src: "/images/raabyt-wordmark.png",
  },
} as const;

// Pixel heights for each size
const SIZES = {
  sm: "h-8",      // 32px
  md: "h-10",     // 40px
  lg: "h-14",     // 56px
  xl: "h-20",     // 80px
} as const;

export interface LogoProps {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
}

export function Logo({
  variant = "full",
  size = "md",
  className,
}: LogoProps) {
  return (
    <Image
      src={VARIANTS[variant].src}
      alt="Raabyt"
      width={400}
      height={400}
      className={cn(
        "object-contain w-auto",
        SIZES[size],
        className
      )}
      priority
      unoptimized
    />
  );
}
