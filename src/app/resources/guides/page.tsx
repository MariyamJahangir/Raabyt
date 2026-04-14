import type { Metadata } from "next";
import { GuidesIndexClient } from "./client";

export const metadata: Metadata = {
  title: "Enterprise Guides & Resources",
  description:
    "In-depth guides on enterprise ERP, firewall management, and on-premise vs cloud deployment from the Raabyt Technologies team.",
  alternates: { canonical: "/resources/guides" },
};

export default function GuidesPage() {
  return <GuidesIndexClient />;
}
