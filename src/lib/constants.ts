import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  TrendingUp,
  ShoppingCart,
  Wallet,
  Shield,
} from "lucide-react";

// Raabyt company info
export const COMPANY = {
  name: "Raabyt Technologies",
  tagline: "Secure AI-Powered On-Premise Enterprise Software",
  url: "https://raabyt.com",
  email: "info@raabyt.com",
} as const;

// Product catalog with icons
export interface ProductItem {
  name: string;
  slug: string;
  description: string;
  tagline: string;
  icon: LucideIcon;
  isNew?: boolean;
  /** Accent color for the card glow effect — [r, g, b] */
  glowColor: [number, number, number];
}

export const PRODUCTS: ProductItem[] = [
  { name: "ERP", slug: "erp", description: "Enterprise Resource Planning", tagline: "End-to-end enterprise resource planning", icon: LayoutDashboard, glowColor: [139, 92, 246] },
  { name: "CRM", slug: "crm", description: "Customer Relationship Management", tagline: "Customer relationship management", icon: Users, glowColor: [59, 130, 246] },
  { name: "HRM", slug: "hrm", description: "Human Resource Management", tagline: "Human resource management", icon: UserCog, glowColor: [236, 72, 153] },
  { name: "DMS", slug: "dms", description: "Document Management System", tagline: "Document management system", icon: FileText, glowColor: [245, 158, 11] },
  { name: "Sales", slug: "sales", description: "Sales Management", tagline: "Sales pipeline and automation", icon: TrendingUp, glowColor: [16, 185, 129] },
  { name: "Purchase", slug: "purchase", description: "Purchase Management", tagline: "Procurement and vendor management", icon: ShoppingCart, glowColor: [249, 115, 22] },
  { name: "Finance", slug: "finance", description: "Financial Management", tagline: "Financial accounting and reporting", icon: Wallet, glowColor: [168, 85, 247] },
  { name: "UFM", slug: "ufm", description: "Unified Firewall Management", tagline: "Unified Firewall Management", icon: Shield, isNew: true, glowColor: [6, 182, 212] },
];

// Navigation items
export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Solutions", href: "/solutions" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
];

// Partner program data
export interface PartnerType {
  title: string;
  description: string;
  iconName: string;
}

export const PARTNER_TYPES: PartnerType[] = [
  { title: "Reseller", iconName: "DollarSign", description: "Grow your revenue and strengthen customer relationships by delivering powerful, end-to-end CRM solutions with Raabyt as your trusted vendor of choice." },
  { title: "On-Prem Deployment", iconName: "Server", description: "Offer as a one-time solution with yearly support and service backed by Raabyt, combining flexible billing with powerful business management tools to strengthen your customers' day-to-day operations." },
  { title: "Procurement Partner", iconName: "Package", description: "Simplify procurement and drive profitability by leveraging Raabyt's ecosystem to offer integrated ERP solutions to your customers. Ensuring incumbency protection." },
  { title: "Marketing Partner", iconName: "Megaphone", description: "Expand business reach by distributing Raabyt ERP solutions to customers, adding value through local expertise and long-term relationship building." },
  { title: "Strategic Alliance Partner", iconName: "Handshake", description: "Collaborate with Raabyt to deliver integrated business solutions, streamline operations, and support customers through scalable and innovative ecosystems." },
];

export interface PartnerTier {
  name: string;
  revenue: string;
  newBuy: string;
  nonProtected: string;
  supportRenewal: string;
  nonIncumbent: string;
  customization: string;
  description: string;
}

export const PARTNER_TIERS: PartnerTier[] = [
  { name: "Platinum", revenue: "$100K", newBuy: "45%", nonProtected: "10%", supportRenewal: "45%", nonIncumbent: "10%", customization: "45%", description: "Platinum Partners have demonstrated continued success positioning the Raabyt solutions and become eligible for participation in growth rebates." },
  { name: "Gold", revenue: "$60K", newBuy: "35%", nonProtected: "10%", supportRenewal: "35%", nonIncumbent: "10%", customization: "35%", description: "Gold Partners unlock accelerated discounts and partner business upon continuing their Raabyt learning journey." },
  { name: "Silver", revenue: "$35K", newBuy: "25%", nonProtected: "10%", supportRenewal: "25%", nonIncumbent: "10%", customization: "25%", description: "New partners are onboarded at Silver to take advantage of deal registration and renewal incumbency benefits." },
  { name: "Authorized", revenue: "$0", newBuy: "10%", nonProtected: "10%", supportRenewal: "10%", nonIncumbent: "10%", customization: "10%", description: "Entry level, no revenue commitment required." },
];
