import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ScrollRestoration } from "@/components/layout/scroll-restoration";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { OrganizationSchema } from "@/components/seo/json-ld";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raabyt.com"),
  title: {
    default: "Raabyt - Secure AI-Powered Enterprise Software",
    template: "%s | Raabyt - Enterprise Software",
  },
  description:
    "Raabyt provides secure, AI-powered, on-premise enterprise software including ERP, CRM, HRM, DMS, and Unified Firewall Management.",
  keywords: [
    "enterprise software",
    "on-premise ERP",
    "CRM software",
    "unified firewall management",
    "AI enterprise",
    "secure business software",
  ],
  openGraph: {
    title: "Raabyt - Secure AI-Powered Enterprise Software",
    description:
      "Raabyt provides secure, AI-powered, on-premise enterprise software including ERP, CRM, HRM, DMS, and Unified Firewall Management.",
    url: "https://raabyt.com",
    siteName: "Raabyt Technologies",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Raabyt - Secure AI-Powered Enterprise Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raabyt - Secure AI-Powered Enterprise Software",
    description:
      "Raabyt provides secure, AI-powered, on-premise enterprise software including ERP, CRM, HRM, DMS, and Unified Firewall Management.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "placeholder-google-verification",
    other: {
      "msvalidate.01": "placeholder-bing-verification",
    },
  },
  alternates: {
    canonical: "https://raabyt.com",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full dark`}>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground overflow-x-hidden">
        <OrganizationSchema />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:inline-flex focus:items-center focus:rounded-lg focus:bg-brand-purple focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>

        <Header />

        <main
          id="main-content"
          className="flex-1"
        >
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <ScrollToTop />
        <SmoothScroll />
        <CursorGlow />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
