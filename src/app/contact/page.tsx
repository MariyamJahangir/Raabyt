import type { Metadata } from "next";
import { ContactPageClient } from "./client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Raabyt Technologies. Contact our sales team, request a demo, or reach out for support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
