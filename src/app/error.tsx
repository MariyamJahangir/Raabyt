"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 md:py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-red-400 mb-4">
        Error
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Something went wrong
      </h1>
      <p className="text-base text-muted max-w-md mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-lg bg-gradient-to-r from-brand-purple to-brand-magenta text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  );
}
