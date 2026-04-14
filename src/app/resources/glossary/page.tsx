import type { Metadata } from "next";
import { GlossaryPageClient } from "./client";

export const metadata: Metadata = {
  title: "Enterprise Software Glossary",
  description:
    "Definitions of key enterprise software terms: ERP, CRM, HRM, DMS, UFM, on-premise deployment, zero trust architecture, and more.",
  alternates: { canonical: "/resources/glossary" },
};

export default function GlossaryPage() {
  return <GlossaryPageClient />;
}
