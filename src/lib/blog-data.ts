export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: BlogAuthor;
  tags: string[];
  content: string;
}

export const AUTHORS: Record<string, BlogAuthor> = {
  arjun: {
    name: "Arjun Mehta",
    role: "CEO, Raabyt Technologies",
    bio: "Arjun founded Raabyt in 2019 with a mission to bring AI-powered enterprise software on-premise. He writes about enterprise strategy, data sovereignty, and the future of business technology.",
  },
  sarah: {
    name: "Sarah Chen",
    role: "CTO, Raabyt Technologies",
    bio: "Sarah leads engineering at Raabyt, overseeing platform architecture and AI capabilities. She writes about engineering practices, security architecture, and emerging technologies.",
  },
  marcus: {
    name: "Marcus Adler",
    role: "CPO, Raabyt Technologies",
    bio: "Marcus shapes the Raabyt product vision and roadmap. He writes about product strategy, UX for enterprise, and how AI is reshaping business workflows.",
  },
};

export const BLOG_CATEGORIES = [
  "All",
  "Product Updates",
  "Security",
  "Engineering",
  "Industry",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-on-premise-software-is-making-a-comeback",
    title: "Why On-Premise Software Is Making a Comeback in 2026",
    excerpt:
      "After a decade of cloud-first thinking, enterprises are rediscovering the strategic advantages of on-premise deployment. Here's what's driving the shift.",
    category: "Industry",
    date: "2026-03-15",
    readTime: 8,
    author: AUTHORS.arjun,
    tags: ["On-Premise", "Data Sovereignty", "Enterprise Strategy", "Cloud vs On-Prem"],
    content: `## The pendulum swings back

For the past decade, the enterprise software narrative has been dominated by a single word: cloud. SaaS vendors promised lower upfront costs, automatic updates, and infinite scalability. And for many organizations, cloud delivery made sense.

But in 2026, something is shifting. A growing number of CTOs and CIOs — particularly in regulated industries, government, and security-conscious enterprises — are reconsidering on-premise deployment. Not out of nostalgia, but out of strategic necessity.

## What changed?

### 1. Data sovereignty is no longer optional

Regulations like GDPR, CCPA, and a growing patchwork of national data protection laws have made data residency a board-level concern. When your ERP, CRM, and HR data sits in a vendor's cloud — often spread across regions you don't control — compliance becomes a moving target.

On-premise deployment eliminates this ambiguity entirely. Your data lives on your servers, in your data centers, under your jurisdiction.

### 2. The true cost of cloud is becoming clear

The initial allure of SaaS pricing — "no capex, just opex" — has given way to a more nuanced understanding. After 5-7 years, cumulative SaaS subscription costs often exceed what an on-premise deployment would have cost, including hardware and maintenance.

For large enterprises processing millions of transactions, the math increasingly favors ownership over rental.

### 3. AI makes on-premise more capable

The traditional knock against on-premise was that it couldn't keep up with cloud innovation. But modern AI frameworks run beautifully on enterprise hardware. Organizations can now deploy sophisticated ML models — for demand forecasting, anomaly detection, and natural language processing — entirely within their own infrastructure.

Raabyt's AI capabilities, for example, are designed from the ground up to run on-premise. No data leaves the customer's environment, yet they get the same predictive analytics and automation that cloud vendors offer.

## The hybrid reality

This isn't about choosing sides. Many organizations are adopting a hybrid approach — cloud for collaboration tools and non-sensitive workloads, on-premise for core business systems that process sensitive data.

The key insight is that deployment model should be a *choice*, not a constraint imposed by your software vendor.

## What to look for in modern on-premise software

If you're evaluating on-premise options, look for:

- **AI-native architecture** that doesn't depend on cloud APIs
- **Modern UX** that matches SaaS quality
- **Container-based deployment** for easy updates and scaling
- **API-first design** for integration with your existing stack
- **Vendor commitment** to on-premise as a first-class deployment model, not an afterthought

## The bottom line

On-premise isn't making a comeback because of anti-cloud sentiment. It's making a comeback because enterprises are getting smarter about where their most sensitive data should live — and demanding software that respects that decision.

The best enterprise software gives you the power of AI, the polish of modern UX, and the freedom to deploy wherever makes sense for your business. That's not a step backward. It's a step forward.`,
  },
  {
    slug: "introducing-ufm-unified-firewall-management",
    title: "Introducing UFM: Unified Firewall Management",
    excerpt:
      "Today we're launching Raabyt UFM — a centralized platform for managing firewalls across vendors, locations, and deployment models from a single pane of glass.",
    category: "Product Updates",
    date: "2026-02-28",
    readTime: 6,
    author: AUTHORS.sarah,
    tags: ["UFM", "Security", "Product Launch", "Firewall", "Zero Trust"],
    content: `## A new chapter for Raabyt

Today we're excited to announce the launch of **Raabyt UFM** (Unified Firewall Management) — our newest product and our first step into enterprise cybersecurity.

UFM represents a fundamental expansion of Raabyt's mission. We've always built software that keeps enterprise data under the customer's control. Now we're building software that actively *protects* that data.

## The problem UFM solves

Enterprise networks are complex. A typical mid-size organization manages firewalls from multiple vendors — Cisco in the data center, Palo Alto at the edge, Fortinet in branch offices — each with its own management console, policy syntax, and reporting format.

This fragmentation creates blind spots. Security teams spend more time switching between dashboards than actually analyzing threats. Policy inconsistencies creep in. Compliance audits become weeks-long exercises in data gathering.

UFM eliminates this fragmentation.

## How it works

### Centralized dashboard

UFM provides a single, real-time view of every firewall rule, every policy, and every threat across your entire network. One login, one dashboard, one source of truth.

### AI-powered threat detection

Our anomaly detection engine uses machine learning trained on network traffic patterns to identify threats that rule-based systems miss — lateral movement, data exfiltration attempts, and zero-day exploits.

### Multi-vendor abstraction

UFM speaks the native language of every major firewall vendor. Create a policy once, and UFM translates and deploys it across Cisco, Palo Alto, Fortinet, Check Point, Juniper, and more.

### Compliance automation

Generate SOC 2, ISO 27001, and PCI-DSS compliance reports on demand. UFM continuously monitors your firewall configurations against compliance frameworks and alerts you to drift before auditors find it.

## Architecture

UFM is deployed on-premise, just like every other Raabyt product. The management plane runs within your infrastructure, communicating with firewalls over secure, encrypted channels. No telemetry, no cloud dependencies.

For organizations with air-gapped networks, UFM supports fully offline operation.

## Pricing

UFM is available in three tiers:

- **Starter** — Up to 10 firewalls
- **Professional** — Up to 100 firewalls (includes AI threat detection)
- **Enterprise** — Unlimited firewalls (includes dedicated security engineer)

## What's next

This launch is just the beginning. Our roadmap includes SIEM integration, automated incident response playbooks, and network microsegmentation capabilities.

We're building UFM to be the security command center that every enterprise network deserves — powerful, vendor-neutral, and entirely under your control.

[Schedule a security assessment](/contact) to see UFM in action.`,
  },
  {
    slug: "how-ai-is-transforming-enterprise-resource-planning",
    title: "How AI Is Transforming Enterprise Resource Planning",
    excerpt:
      "From demand forecasting to anomaly detection, AI is fundamentally reshaping what ERP systems can do. Here's how Raabyt is leading the charge.",
    category: "Engineering",
    date: "2026-02-10",
    readTime: 10,
    author: AUTHORS.marcus,
    tags: ["AI", "ERP", "Machine Learning", "Automation", "Enterprise"],
    content: `## Beyond automation

Enterprise Resource Planning systems have been the backbone of large organizations for decades. But for most of that history, "intelligence" in an ERP meant pre-configured business rules and scheduled batch reports.

AI changes the game entirely.

Modern AI capabilities — machine learning, natural language processing, computer vision — are transforming ERPs from record-keeping systems into *decision-making partners*. Here's how.

## 1. Predictive demand forecasting

Traditional ERPs calculate reorder points based on historical averages and safety stock formulas. AI-powered forecasting goes further:

- **Pattern recognition** across hundreds of variables — seasonality, economic indicators, social media sentiment, weather data
- **Dynamic adjustment** that updates forecasts daily as new data arrives
- **Confidence intervals** that help procurement teams understand the uncertainty in each prediction

At Raabyt, our demand forecasting models have achieved 92% accuracy for 30-day predictions in manufacturing environments — compared to 67% for rule-based approaches.

## 2. Intelligent anomaly detection

Financial fraud, inventory shrinkage, and process deviations often hide in the noise of thousands of daily transactions. AI excels at finding these needles in haystacks.

Raabyt ERP's anomaly detection engine continuously monitors:

- **Transaction patterns** — flagging purchases that deviate from vendor history
- **Process timing** — identifying bottlenecks before they cascade into delays
- **Quality metrics** — detecting drift in production quality before it triggers customer complaints

The key is that these insights surface *proactively*, not in a month-end report when it's too late to act.

## 3. Natural language interfaces

One of the most transformative AI applications in ERP is the simplest to understand: you can just *ask* the system what you want to know.

Instead of navigating five screens to build a report, a finance director can ask: "What were our top 10 customers by revenue last quarter, and how does that compare to the same period last year?"

Raabyt's AI Copilot translates natural language into queries, generates visualizations, and even explains the results in plain language. This democratizes access to business intelligence — you no longer need to be a power user to get answers.

## 4. Automated workflow optimization

AI can analyze how your team actually uses the ERP and suggest process improvements:

- **Approval routing** — predicting which approvals will be rubber-stamped and suggesting auto-approval rules
- **Task prioritization** — highlighting which purchase orders, production orders, or support tickets need attention first
- **Resource allocation** — recommending optimal staffing for production shifts based on order forecasts

## 5. Computer vision for inventory and quality

For manufacturing and warehouse operations, computer vision adds a powerful new input channel:

- **Automated receiving** — scan incoming shipments to verify quantities and identify damage
- **Quality inspection** — visual defect detection on production lines
- **Inventory audits** — drone-based or camera-based cycle counting

## The on-premise AI advantage

Here's where deployment model matters. Cloud ERP vendors run AI models on their infrastructure, which means your business data — transactions, customer information, production metrics — must leave your environment for processing.

Raabyt runs all AI inference on-premise. Your data stays on your servers. The models train on your data without it ever crossing a network boundary.

For industries with strict data handling requirements — defense, healthcare, financial services — this isn't a nice-to-have. It's a prerequisite.

## What's next for AI in ERP

We're still in the early innings. Over the next 2-3 years, expect to see:

- **Autonomous procurement** — AI systems that negotiate with vendors and execute purchases within pre-approved parameters
- **Predictive maintenance integration** — ERP systems that schedule maintenance based on IoT sensor data and production forecasts
- **Multi-modal AI** — combining text, images, sensor data, and structured data for holistic business intelligence

The organizations that adopt AI-native ERP systems today will have a compounding advantage over those that wait. The question isn't whether AI will transform ERP — it's whether you'll be leading the transformation or catching up.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags);
}
