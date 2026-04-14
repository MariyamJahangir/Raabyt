import type { Metadata } from "next";
import { AboutPageClient } from "./client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Raabyt Technologies builds secure, AI-powered on-premise enterprise software trusted by 500+ organizations in 50+ countries.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
