import type { Metadata } from "next";
import { SolutionsPageClient } from "./client";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Raabyt's AI-powered enterprise suite adapts to every industry — manufacturing, healthcare, finance, retail, government, and education.",
};

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
