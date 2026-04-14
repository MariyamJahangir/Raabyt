import type { Metadata } from "next";
import { BlogListingClient } from "./client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on enterprise software, security, AI, and on-premise deployment from the Raabyt Technologies team.",
};

export default function BlogPage() {
  return <BlogListingClient />;
}
