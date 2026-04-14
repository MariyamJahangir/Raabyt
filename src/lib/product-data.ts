import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Package, Factory, BarChart3, Boxes, ClipboardList,
  Users, Contact, Target, PieChart, MessageSquare, Zap,
  UserCog, CalendarDays, GraduationCap, Banknote, Clock, UserCheck,
  FileText, FolderSearch, GitBranch, Lock, FileCheck, Workflow,
  TrendingUp, Receipt, LineChart, Megaphone, Handshake, BarChart,
  ShoppingCart, FileSpreadsheet, Truck, CheckCircle, ListChecks, Scale,
  Wallet, BookOpen, ArrowLeftRight, Calculator, CreditCard, FileBarChart,
} from "lucide-react";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface ProductStep {
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductPageData {
  name: string;
  slug: string;
  eyebrow: string;
  headline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  features: ProductFeature[];
  benefits: ProductBenefit[];
  steps: ProductStep[];
  integrations: string[];
  faqs: ProductFAQ[];
}

export const PRODUCT_PAGES: Record<string, ProductPageData> = {
  erp: {
    name: "ERP",
    slug: "erp",
    eyebrow: "RAABYT ERP",
    headline: "Enterprise Resource Planning",
    description:
      "Manage operations, inventory, manufacturing, and supply chain from a single AI-powered platform. Full visibility into every business process, deployed securely on your infrastructure.",
    metaTitle: "ERP - Enterprise Resource Planning",
    metaDescription:
      "Raabyt ERP delivers AI-powered enterprise resource planning with on-premise deployment. Manage operations, inventory, and manufacturing securely.",
    features: [
      { icon: LayoutDashboard, title: "Unified Operations Dashboard", description: "Real-time visibility across all departments — production, inventory, procurement, and logistics in one view." },
      { icon: Package, title: "Inventory & Warehouse", description: "Multi-warehouse management with AI-driven demand forecasting and automated reorder points." },
      { icon: Factory, title: "Manufacturing Execution", description: "Bill of materials, production scheduling, work orders, and quality control with real-time tracking." },
      { icon: BarChart3, title: "Advanced Analytics", description: "Customizable reports and AI-generated insights that surface bottlenecks before they become problems." },
      { icon: Boxes, title: "Supply Chain Management", description: "End-to-end supply chain visibility with vendor scorecards, lead time tracking, and automated alerts." },
      { icon: ClipboardList, title: "Compliance & Audit Trail", description: "Complete audit logging with role-based access control. Meet ISO, SOC 2, and industry-specific regulations." },
    ],
    benefits: [
      { title: "Eliminate data silos across departments", description: "Unify finance, operations, HR, and sales on a single platform. No more spreadsheet reconciliation or conflicting reports — one source of truth for every decision." },
      { title: "Reduce operational costs by up to 30%", description: "AI-powered automation handles repetitive tasks while predictive analytics optimize inventory levels, reducing waste and carrying costs across your entire operation." },
      { title: "Deploy with zero data exposure", description: "Unlike cloud ERPs, Raabyt runs entirely within your infrastructure. Your production data, trade secrets, and financial records never leave your servers." },
    ],
    steps: [
      { title: "Assessment", description: "We audit your current systems, data flows, and pain points to design the optimal deployment." },
      { title: "Configuration", description: "Modules are configured to your processes — not the other way around. Custom workflows, fields, and automations." },
      { title: "Migration", description: "Secure data migration from legacy systems with validation checks and rollback capabilities." },
      { title: "Go Live", description: "Phased rollout with dedicated support. Training, monitoring, and optimization from day one." },
    ],
    integrations: ["SAP", "Oracle", "Microsoft 365", "Slack", "QuickBooks", "Salesforce", "Jira", "Power BI"],
    faqs: [
      { question: "What is Raabyt ERP?", answer: "Raabyt ERP is an AI-powered enterprise resource planning platform that unifies operations, inventory, manufacturing, finance, and supply chain management into a single on-premise solution. It gives organizations complete visibility across every department while ensuring full data sovereignty, since all data stays on your own infrastructure." },
      { question: "What industries does Raabyt ERP serve?", answer: "Raabyt ERP serves a wide range of industries including manufacturing, retail, distribution, healthcare, construction, and professional services. Its modular architecture allows each deployment to be tailored to industry-specific workflows, compliance requirements, and operational needs." },
      { question: "What modules are included in Raabyt ERP?", answer: "Raabyt ERP includes modules for financial management, inventory and warehouse management, manufacturing execution, supply chain management, procurement, human resources, and advanced analytics. Each module can be deployed independently or as part of a fully integrated suite." },
      { question: "Can Raabyt ERP be deployed entirely on-premise?", answer: "Yes. Raabyt ERP is designed for full on-premise deployment. Your data never leaves your infrastructure, ensuring complete data sovereignty and compliance with regulations." },
      { question: "How long does a typical ERP implementation take?", answer: "Most implementations complete in 8-16 weeks depending on scope. Our phased approach ensures minimal disruption, with core modules going live first and additional modules added incrementally." },
      { question: "Does Raabyt ERP include AI features?", answer: "Yes. AI-powered demand forecasting, anomaly detection, and natural language reporting are built into the platform and run entirely on your servers — no cloud API dependencies." },
    ],
  },

  crm: {
    name: "CRM",
    slug: "crm",
    eyebrow: "RAABYT CRM",
    headline: "Customer Relationship Management",
    description:
      "Manage your entire sales pipeline, customer interactions, and deal flow with AI-powered insights. Build deeper relationships and close deals faster — all on your own infrastructure.",
    metaTitle: "CRM - Customer Relationship Management",
    metaDescription:
      "Raabyt CRM provides AI-powered pipeline management, contact tracking, and deal automation — deployed on-premise for full data sovereignty.",
    features: [
      { icon: Users, title: "360° Contact Management", description: "Complete customer profiles with interaction history, communication logs, and AI-generated relationship scores." },
      { icon: Target, title: "Pipeline Management", description: "Visual deal pipelines with drag-and-drop stages, probability scoring, and automated follow-up sequences." },
      { icon: Contact, title: "Lead Scoring & Routing", description: "AI-powered lead qualification that routes hot prospects to the right reps based on fit and intent signals." },
      { icon: PieChart, title: "Revenue Analytics", description: "Forecasting models, win/loss analysis, and rep performance dashboards that update in real time." },
      { icon: MessageSquare, title: "Omnichannel Communication", description: "Email, phone, chat, and social interactions tracked in one timeline. Never miss context on a customer." },
      { icon: Zap, title: "Workflow Automation", description: "Trigger automated emails, task assignments, and deal stage updates based on customer actions and AI predictions." },
    ],
    benefits: [
      { title: "Close deals 40% faster with AI insights", description: "Predictive analytics identify the highest-value opportunities and recommend next-best actions. Reps focus on selling, not data entry." },
      { title: "Keep customer data under your control", description: "Customer PII, deal terms, and communication records stay on your servers. Meet GDPR, CCPA, and industry-specific data residency requirements." },
      { title: "Unified view of every customer touchpoint", description: "No more switching between tools. Every email, call, meeting note, and support ticket is linked to the customer record for complete context." },
    ],
    steps: [
      { title: "Discovery", description: "Map your sales process, pipeline stages, and team structure to design the perfect CRM configuration." },
      { title: "Setup", description: "Import contacts, configure pipelines, set up automations, and integrate with your email and calendar." },
      { title: "Training", description: "Hands-on training for sales reps, managers, and admins. Custom playbooks for your workflows." },
      { title: "Optimization", description: "Ongoing AI model tuning, automation refinement, and quarterly business reviews with your team." },
    ],
    integrations: ["Gmail", "Outlook", "Slack", "Zoom", "LinkedIn", "Mailchimp", "HubSpot", "Calendly"],
    faqs: [
      { question: "What is Raabyt CRM?", answer: "Raabyt CRM is an AI-powered customer relationship management platform that helps businesses manage their entire sales pipeline, customer interactions, and deal flow from a single on-premise system. It combines contact management, lead scoring, deal tracking, and omnichannel communication to help teams build deeper relationships and close deals faster." },
      { question: "What pipeline management features does Raabyt CRM offer?", answer: "Raabyt CRM provides visual drag-and-drop deal pipelines with customizable stages, AI-driven probability scoring, automated follow-up sequences, and deal velocity tracking. Managers get real-time pipeline health dashboards, while reps receive AI-recommended next-best actions to move deals forward." },
      { question: "What reporting and analytics are available in Raabyt CRM?", answer: "Raabyt CRM includes revenue forecasting models, win/loss analysis, rep performance dashboards, pipeline conversion reports, and AI-generated insights that update in real time. Custom reports can be built with drag-and-drop builders and scheduled for automatic distribution to stakeholders." },
      { question: "Can I migrate from Salesforce to Raabyt CRM?", answer: "Yes. We provide automated migration tools that import contacts, deals, activities, and custom fields from Salesforce with full data integrity validation." },
      { question: "Is customer data stored on-premise?", answer: "Absolutely. All customer PII, deal data, and communications stay on your servers. This ensures compliance with GDPR, CCPA, and industry-specific data residency requirements." },
      { question: "Does the CRM integrate with email and calendar?", answer: "Yes. Raabyt CRM integrates with Gmail, Outlook, and calendar systems to automatically log emails, schedule meetings, and sync contacts bidirectionally." },
    ],
  },

  hrm: {
    name: "HRM",
    slug: "hrm",
    eyebrow: "RAABYT HRM",
    headline: "Human Resource Management",
    description:
      "Streamline payroll, attendance, recruitment, and employee management with AI-powered HR automation. Empower your workforce while keeping sensitive data on-premise.",
    metaTitle: "HRM - Human Resource Management",
    metaDescription:
      "Raabyt HRM delivers AI-powered payroll, attendance, recruitment, and employee management — deployed on-premise for maximum data privacy.",
    features: [
      { icon: UserCog, title: "Employee Lifecycle Management", description: "Onboarding to offboarding — manage the entire employee journey with automated workflows and self-service portals." },
      { icon: Banknote, title: "Payroll & Compensation", description: "Multi-currency, multi-region payroll processing with tax compliance, deductions, and automated disbursement." },
      { icon: CalendarDays, title: "Attendance & Leave", description: "Biometric integration, shift scheduling, leave management, and overtime tracking with real-time dashboards." },
      { icon: GraduationCap, title: "Learning & Development", description: "Training programs, skill assessments, and career path planning with AI-recommended courses." },
      { icon: Clock, title: "Time & Productivity", description: "Project-level time tracking, productivity analytics, and workload balancing across teams." },
      { icon: UserCheck, title: "Recruitment & ATS", description: "AI-powered candidate screening, interview scheduling, and applicant tracking from posting to offer letter." },
    ],
    benefits: [
      { title: "Protect employee data with on-premise deployment", description: "Salary records, performance reviews, and personal information stay within your infrastructure. Full compliance with labor laws and data protection regulations." },
      { title: "Reduce HR admin workload by 60%", description: "Automate payroll runs, leave approvals, onboarding checklists, and compliance reporting. Your HR team focuses on strategy, not paperwork." },
      { title: "Improve retention with AI-driven insights", description: "Predictive models identify flight-risk employees and surface engagement trends before they become attrition problems." },
    ],
    steps: [
      { title: "HR Audit", description: "Review your HR processes, policies, and compliance requirements to plan the migration." },
      { title: "Data Import", description: "Securely import employee records, payroll history, and organizational structure." },
      { title: "Policy Config", description: "Set up leave policies, attendance rules, payroll schedules, and approval workflows." },
      { title: "Launch", description: "Phased rollout with employee self-service portal training and admin workshops." },
    ],
    integrations: ["ADP", "Workday", "BambooHR", "Slack", "Microsoft Teams", "Okta", "Google Workspace", "SAP SuccessFactors"],
    faqs: [
      { question: "What is Raabyt HRM?", answer: "Raabyt HRM is an AI-powered human resource management platform that streamlines payroll, attendance, recruitment, and employee lifecycle management on a single on-premise system. It automates routine HR tasks while keeping sensitive employee data fully within your infrastructure, ensuring compliance with labor laws and data protection regulations." },
      { question: "What recruitment features does Raabyt HRM include?", answer: "Raabyt HRM includes a full applicant tracking system (ATS) with AI-powered candidate screening, resume parsing, interview scheduling, collaborative hiring scorecards, and automated offer letter generation. The system tracks candidates from job posting through onboarding in a single unified workflow." },
      { question: "How does Raabyt HRM help with compliance?", answer: "Raabyt HRM automates compliance with labor laws, tax regulations, and data protection standards across multiple jurisdictions. It maintains complete audit trails for all HR actions, generates statutory reports, enforces policy-based workflows, and provides built-in support for GDPR, SOC 2, and industry-specific regulatory requirements." },
      { question: "How does Raabyt HRM handle multi-country payroll?", answer: "Raabyt HRM supports multi-currency, multi-region payroll with configurable tax rules, statutory compliance, and localized pay slip generation for each country." },
      { question: "Can employees access HRM through a self-service portal?", answer: "Yes. Employees can view payslips, submit leave requests, update personal information, and access company policies through a web and mobile self-service portal." },
      { question: "Is employee data encrypted?", answer: "Yes. All employee data is encrypted at rest (AES-256) and in transit (TLS 1.3). Role-based access controls ensure only authorized personnel can view sensitive records." },
    ],
  },

  dms: {
    name: "DMS",
    slug: "dms",
    eyebrow: "RAABYT DMS",
    headline: "Document Management System",
    description:
      "Secure document storage, version control, and workflow automation. Keep your intellectual property safe with on-premise deployment and AI-powered document intelligence.",
    metaTitle: "DMS - Document Management System",
    metaDescription:
      "Raabyt DMS provides secure document storage, version control, and AI-powered document intelligence — all deployed on your infrastructure.",
    features: [
      { icon: FileText, title: "Smart Document Storage", description: "Hierarchical folder structure with metadata tagging, full-text search, and AI-powered auto-classification." },
      { icon: GitBranch, title: "Version Control", description: "Track every change with full version history, diff comparison, and one-click rollback to any previous version." },
      { icon: FolderSearch, title: "AI-Powered Search", description: "Natural language search across documents, images, and scanned PDFs with OCR and semantic understanding." },
      { icon: Lock, title: "Access Control & Encryption", description: "Granular permissions at folder and document level with AES-256 encryption at rest and in transit." },
      { icon: FileCheck, title: "Approval Workflows", description: "Multi-step document approval workflows with parallel/sequential routing, e-signatures, and audit trails." },
      { icon: Workflow, title: "Process Automation", description: "Automate document routing, notifications, retention policies, and archival based on configurable rules." },
    ],
    benefits: [
      { title: "Eliminate unauthorized document access", description: "Role-based access, watermarking, and download restrictions ensure sensitive documents are only seen by authorized personnel. Complete audit trail of every view and edit." },
      { title: "Find any document in seconds", description: "AI-powered search understands context, not just keywords. Search across PDFs, Word docs, spreadsheets, and scanned images with natural language queries." },
      { title: "Automate compliance and retention", description: "Configure retention policies per document type, automate archival, and generate compliance reports. Meet regulatory requirements with zero manual effort." },
    ],
    steps: [
      { title: "Content Audit", description: "Assess your current document landscape — file servers, SharePoint, local drives — and plan the migration." },
      { title: "Structure Design", description: "Design folder taxonomy, metadata schemas, and permission models tailored to your organization." },
      { title: "Migration", description: "Bulk import with metadata preservation, duplicate detection, and link integrity checking." },
      { title: "Adoption", description: "User training, desktop/mobile app deployment, and integration with existing tools." },
    ],
    integrations: ["SharePoint", "Google Drive", "Dropbox", "Microsoft 365", "DocuSign", "Adobe Sign", "Confluence", "Notion"],
    faqs: [
      { question: "What is Raabyt DMS?", answer: "Raabyt DMS is an AI-powered document management system that provides secure document storage, version control, and workflow automation on your own infrastructure. It combines full-text search, OCR, smart classification, and approval workflows to help organizations manage their entire document lifecycle while maintaining complete data sovereignty." },
      { question: "What search capabilities does Raabyt DMS offer?", answer: "Raabyt DMS features AI-powered natural language search that understands context, not just keywords. It searches across PDFs, Word documents, spreadsheets, and scanned images using OCR and semantic understanding. Users can find any document in seconds with metadata filters, full-text queries, and AI-suggested related documents." },
      { question: "How does Raabyt DMS support regulatory compliance?", answer: "Raabyt DMS enforces retention policies per document type, automates archival schedules, and maintains complete audit trails of every view, edit, and download. It supports compliance with ISO, SOX, HIPAA, and GDPR through role-based access controls, watermarking, and configurable document lifecycle rules that generate compliance reports automatically." },
      { question: "Can Raabyt DMS handle scanned paper documents?", answer: "Yes. Built-in OCR converts scanned documents into searchable text. AI auto-classification tags and routes documents based on their content." },
      { question: "How does version control work?", answer: "Every edit creates a new version with full diff tracking. You can compare any two versions side-by-side and roll back to any previous version with one click." },
      { question: "Does DMS support e-signatures?", answer: "Yes. Raabyt DMS integrates with DocuSign and Adobe Sign for legally binding e-signatures, or you can use our built-in signature workflow for internal approvals." },
    ],
  },

  sales: {
    name: "Sales",
    slug: "sales",
    eyebrow: "RAABYT SALES",
    headline: "Sales Automation",
    description:
      "Automate quotes, manage orders, and forecast revenue with precision. AI-powered sales intelligence helps your team close bigger deals faster — with complete data privacy.",
    metaTitle: "Sales - Sales Automation",
    metaDescription:
      "Raabyt Sales delivers AI-powered quoting, order management, and revenue forecasting — deployed on-premise for enterprise security.",
    features: [
      { icon: TrendingUp, title: "AI Sales Forecasting", description: "Machine learning models that predict quarterly revenue with 95% accuracy based on pipeline data and historical trends." },
      { icon: Receipt, title: "Quote-to-Cash", description: "Generate professional quotes, handle approvals, convert to orders, and track through fulfillment — all in one workflow." },
      { icon: LineChart, title: "Revenue Intelligence", description: "Real-time revenue dashboards, deal velocity tracking, and AI-flagged at-risk deals with recommended actions." },
      { icon: Megaphone, title: "Sales Engagement", description: "Sequenced outreach campaigns with email tracking, call logging, and AI-optimized send times." },
      { icon: Handshake, title: "Partner & Channel Sales", description: "Manage reseller networks, track partner deals, and automate commission calculations across channels." },
      { icon: BarChart, title: "Territory Management", description: "AI-balanced territory assignments, quota planning, and performance benchmarking across regions and teams." },
    ],
    benefits: [
      { title: "Increase forecast accuracy to 95%", description: "AI models analyze pipeline health, deal progression patterns, and rep behavior to deliver forecasts your CFO can trust — no more sandbagging or happy ears." },
      { title: "Cut quote turnaround from days to minutes", description: "Templated quotes with dynamic pricing, automated discount approvals, and one-click PDF generation. Prospects get proposals while they're still engaged." },
      { title: "Protect your sales intelligence on-premise", description: "Competitive intelligence, customer pricing, and deal strategies are your most sensitive data. Keep them on your servers, not in someone else's cloud." },
    ],
    steps: [
      { title: "Sales Process Mapping", description: "Document your sales methodology, stages, and approval chains to configure the optimal workflow." },
      { title: "Data & Integration", description: "Import historical deals, connect email/calendar, and integrate with your existing CRM if needed." },
      { title: "Automation Setup", description: "Build quote templates, approval workflows, engagement sequences, and forecasting models." },
      { title: "Rep Enablement", description: "Sales team training, mobile app setup, and playbook creation for rapid adoption." },
    ],
    integrations: ["Salesforce", "HubSpot", "Gmail", "Outlook", "Stripe", "QuickBooks", "Zoom", "LinkedIn Sales Nav"],
    faqs: [
      { question: "What is Raabyt Sales?", answer: "Raabyt Sales is an AI-powered sales automation platform that handles quoting, order management, revenue forecasting, and sales engagement from a single on-premise system. It helps sales teams close bigger deals faster with predictive intelligence and automated workflows, while keeping competitive intelligence and pricing data securely on your servers." },
      { question: "Does Raabyt Sales include territory management?", answer: "Yes. Raabyt Sales provides AI-balanced territory assignments that optimize coverage based on market potential, account density, and rep capacity. It includes quota planning, performance benchmarking across regions and teams, and automatic rebalancing recommendations when territories need adjustment." },
      { question: "How does Raabyt Sales integrate with other systems?", answer: "Raabyt Sales integrates natively with Salesforce, HubSpot, Gmail, Outlook, Stripe, QuickBooks, Zoom, and LinkedIn Sales Navigator. It also connects with Raabyt CRM and Raabyt Finance for end-to-end quote-to-cash workflows, and offers an open API for custom integrations with any third-party system." },
      { question: "How accurate is the AI sales forecasting?", answer: "Our ML models achieve 95% accuracy for quarterly revenue predictions by analyzing pipeline health, deal velocity, rep behavior, and historical patterns." },
      { question: "Can I generate quotes and proposals from the platform?", answer: "Yes. Templated quotes with dynamic pricing, automated discount approvals, and one-click PDF generation. Proposals can be sent and tracked directly from the system." },
      { question: "Does it work with my existing CRM?", answer: "Raabyt Sales integrates with Salesforce, HubSpot, and Raabyt CRM. You can also use it as a standalone sales automation platform." },
    ],
  },

  purchase: {
    name: "Purchase",
    slug: "purchase",
    eyebrow: "RAABYT PURCHASE",
    headline: "Procurement Management",
    description:
      "Streamline purchase orders, vendor management, and approval workflows. AI-optimized procurement that reduces costs and strengthens your supply chain — deployed on your terms.",
    metaTitle: "Purchase - Procurement Management",
    metaDescription:
      "Raabyt Purchase provides AI-powered procurement automation, vendor management, and PO workflows — deployed on-premise for enterprise control.",
    features: [
      { icon: ShoppingCart, title: "Purchase Order Automation", description: "Create, approve, and track POs with multi-level approval chains, budget checks, and automated three-way matching." },
      { icon: FileSpreadsheet, title: "Vendor Management", description: "Centralized vendor database with performance scoring, contract tracking, and automated compliance verification." },
      { icon: Truck, title: "Receiving & Inspection", description: "Track deliveries, manage goods receipt, quality inspection workflows, and automatic inventory updates." },
      { icon: CheckCircle, title: "Approval Workflows", description: "Configurable multi-tier approvals based on amount, category, and department with mobile approval support." },
      { icon: ListChecks, title: "Budget Control", description: "Real-time budget tracking, overspend alerts, and AI-powered spend analysis across departments and categories." },
      { icon: Scale, title: "Contract Management", description: "Manage vendor contracts, renewal reminders, pricing agreements, and SLA compliance tracking." },
    ],
    benefits: [
      { title: "Reduce procurement cycle time by 50%", description: "Automated PO generation, AI-matched vendors, and mobile approvals slash the time from requisition to order. No more email chains and paper forms." },
      { title: "Save 15-25% on procurement spend", description: "AI-powered spend analysis surfaces consolidation opportunities, identifies maverick spending, and recommends preferred vendors based on price, quality, and reliability." },
      { title: "Full audit trail for compliance", description: "Every requisition, approval, PO, and payment is logged with timestamps and user attribution. Meet SOX, ISO, and internal audit requirements effortlessly." },
    ],
    steps: [
      { title: "Spend Analysis", description: "Analyze current procurement data to identify savings opportunities and process inefficiencies." },
      { title: "Workflow Design", description: "Configure approval matrices, budget controls, and vendor qualification workflows." },
      { title: "Vendor Onboarding", description: "Import vendor database, set up self-service portals, and configure compliance requirements." },
      { title: "Rollout", description: "Department-by-department rollout with training, catalog setup, and integration testing." },
    ],
    integrations: ["SAP Ariba", "Coupa", "QuickBooks", "NetSuite", "Xero", "Amazon Business", "Microsoft Dynamics", "Slack"],
    faqs: [
      { question: "What is Raabyt Purchase?", answer: "Raabyt Purchase is an AI-powered procurement management platform that streamlines purchase orders, vendor management, and approval workflows on your own infrastructure. It automates the entire procure-to-pay cycle, helping organizations reduce costs, strengthen supply chains, and maintain full compliance with audit requirements." },
      { question: "Does Raabyt Purchase include contract management?", answer: "Yes. Raabyt Purchase provides centralized contract management with vendor pricing agreements, renewal reminders, SLA compliance tracking, and automated alerts before contracts expire. All contract documents are versioned and searchable, with full audit trails for every change." },
      { question: "What reporting capabilities does Raabyt Purchase offer?", answer: "Raabyt Purchase includes AI-powered spend analysis dashboards, vendor performance scorecards, budget vs. actual reports, purchase order cycle time analytics, and savings tracking. Custom reports can be built with drag-and-drop builders and scheduled for automatic distribution to procurement leaders and department heads." },
      { question: "Can Raabyt Purchase enforce budget controls?", answer: "Yes. Real-time budget tracking prevents overspend with configurable alerts, hard limits by department/category, and AI-powered spend analysis." },
      { question: "How does three-way matching work?", answer: "The system automatically matches purchase orders, goods receipts, and vendor invoices. Discrepancies are flagged for review before payment is authorized." },
      { question: "Do vendors get a self-service portal?", answer: "Yes. Vendors can submit invoices, update information, check payment status, and respond to RFQs through a secure self-service portal." },
    ],
  },

  finance: {
    name: "Finance",
    slug: "finance",
    eyebrow: "RAABYT FINANCE",
    headline: "Financial Management",
    description:
      "General ledger, accounts payable/receivable, and financial reporting powered by AI. Enterprise-grade accounting with real-time insights — your financial data stays on your servers.",
    metaTitle: "Finance - Financial Management",
    metaDescription:
      "Raabyt Finance provides AI-powered accounting, GL, AP/AR, and financial reporting — deployed on-premise for maximum data security.",
    features: [
      { icon: Wallet, title: "General Ledger", description: "Multi-entity, multi-currency general ledger with automated journal entries, intercompany transactions, and real-time balances." },
      { icon: BookOpen, title: "Accounts Payable", description: "Invoice capture with AI-powered data extraction, three-way matching, automated approval routing, and payment scheduling." },
      { icon: ArrowLeftRight, title: "Accounts Receivable", description: "Automated invoicing, payment tracking, dunning workflows, and AI-predicted collection timelines." },
      { icon: Calculator, title: "Budgeting & Forecasting", description: "Multi-dimensional budgets, rolling forecasts, and variance analysis with AI-powered projections." },
      { icon: CreditCard, title: "Expense Management", description: "Receipt scanning with OCR, policy compliance checks, automated categorization, and integrated reimbursement." },
      { icon: FileBarChart, title: "Financial Reporting", description: "GAAP/IFRS-compliant reports, customizable dashboards, and scheduled report distribution to stakeholders." },
    ],
    benefits: [
      { title: "Close the books 5x faster", description: "Automated reconciliation, AI-powered anomaly detection, and pre-configured close checklists reduce month-end close from weeks to days." },
      { title: "Protect financial data with on-premise security", description: "Revenue figures, payroll data, and banking credentials are your most sensitive information. Raabyt Finance keeps them within your four walls." },
      { title: "Real-time financial visibility for leadership", description: "Live dashboards showing cash position, burn rate, revenue trends, and P&L by department. No waiting for the monthly report — data is always current." },
    ],
    steps: [
      { title: "Financial Assessment", description: "Review your chart of accounts, reporting requirements, and compliance standards." },
      { title: "System Configuration", description: "Set up entities, currencies, fiscal calendars, tax rules, and approval workflows." },
      { title: "Data Migration", description: "Import historical transactions, open balances, vendor/customer records, and fixed assets." },
      { title: "Go Live & Close", description: "Parallel run period, first month-end close support, and ongoing optimization." },
    ],
    integrations: ["QuickBooks", "Xero", "Stripe", "PayPal", "Plaid", "Expensify", "NetSuite", "SAP"],
    faqs: [
      { question: "What is Raabyt Finance?", answer: "Raabyt Finance is an AI-powered financial management platform that provides general ledger, accounts payable, accounts receivable, budgeting, and financial reporting capabilities on a single on-premise system. It delivers enterprise-grade accounting with real-time insights while ensuring your financial data never leaves your servers." },
      { question: "How does Raabyt Finance handle expense management?", answer: "Raabyt Finance includes integrated expense management with mobile receipt scanning via OCR, automated policy compliance checks, AI-powered categorization, and streamlined reimbursement workflows. Employees submit expenses from their phone, managers approve with one tap, and the system posts entries directly to the general ledger." },
      { question: "What audit capabilities does Raabyt Finance provide?", answer: "Raabyt Finance maintains a complete, tamper-proof audit trail of every transaction, journal entry, approval, and modification with timestamps and user attribution. It supports internal and external audit workflows with configurable controls, segregation of duties enforcement, and automated compliance reports for SOX, GAAP, and IFRS requirements." },
      { question: "Does Raabyt Finance support multi-entity consolidation?", answer: "Yes. Manage multiple legal entities with automatic intercompany eliminations, currency translation, and consolidated financial statements." },
      { question: "How fast is month-end close?", answer: "Customers typically reduce close time by 80% — from weeks to days — using automated reconciliation, AI anomaly detection, and pre-configured close checklists." },
      { question: "Is it compliant with GAAP and IFRS?", answer: "Yes. Raabyt Finance supports both GAAP and IFRS reporting standards with configurable chart of accounts, revenue recognition rules, and statutory reports." },
    ],
  },
};
