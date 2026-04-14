import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 md:py-32 text-center">
      <Logo variant="full" size="xl" className="mb-8" />
      <p className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-brand-purple to-brand-magenta bg-clip-text text-transparent mb-4">
        404
      </p>
      <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
        Page not found
      </h1>
      <p className="text-base text-muted max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-lg bg-gradient-to-r from-brand-purple to-brand-magenta text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-200"
        >
          Go Home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded-lg bg-transparent border border-white/20 text-foreground hover:bg-white/5 transition-all duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
