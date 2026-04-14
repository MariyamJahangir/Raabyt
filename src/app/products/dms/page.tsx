import type { Metadata } from "next";
import { DMSPageClient } from "./client";

export const metadata: Metadata = {
  title: "DMS - Document Management System",
  description:
    "Raabyt DMS provides secure document storage, version control, and AI-powered document intelligence — all deployed on your infrastructure.",
};

export default function DMSPage() {
  return <DMSPageClient />;
}
