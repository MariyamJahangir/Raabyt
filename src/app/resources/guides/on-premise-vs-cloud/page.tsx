import type { Metadata } from "next";
import { OnPremVsCloudClient } from "./client";

export const metadata: Metadata = {
  title: "On-Premise vs Cloud Software: The Enterprise Decision Guide",
  description:
    "An objective comparison of on-premise and cloud software deployment for enterprises. Covers cost, security, compliance, performance, and AI capabilities.",
  alternates: { canonical: "/resources/guides/on-premise-vs-cloud" },
  openGraph: {
    title: "On-Premise vs Cloud Software: The Enterprise Decision Guide",
    description:
      "A data-driven comparison to help enterprises choose the right deployment model.",
    type: "article",
    images: [{ url: "/og?title=On-Premise+vs+Cloud+Software", width: 1200, height: 630 }],
  },
};

export default function OnPremVsCloudPage() {
  return <OnPremVsCloudClient />;
}
