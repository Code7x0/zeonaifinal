/** ZeonAI homepage content — sourced from ZeonAI_Complete_Website_Copy_and_Cursor_Brief.md */

export const nav = [
  { label: "Platform", href: "/platform" },
  { label: "Industries", href: "/industries" },
  { label: "Customers", href: "/customers" },
  { label: "Trust", href: "/trust" },
  { label: "About", href: "/about" },
] as const;

export const homeNav = [
  { label: "Platform", href: "#platform" },
  { label: "Industries", href: "#industries" },
  { label: "Customers", href: "#customers" },
  { label: "Trust", href: "#trust" },
] as const;

/** Official ZeonAI product family (zeonai.com) */
export const solutions = [
  {
    id: "invoiceai",
    brand: "DeepDelve® InvoiceAI",
    title: "AI-based AP vendor invoice extraction and workflow",
    body: "Streamline vendor invoice processing. Cut through unstructured documents, automate data extraction, and integrate with ERP systems for validation, approval and posting.",
    href: "/products/invoiceai",
  },
  {
    id: "cashfloai",
    brand: "DeepDelve® CashfloAI",
    title: "Bank statement cash flow analysis and underwriting",
    body: "Optimise SMB lending analysis and underwriting. Analyse cash flow from diverse bank statements with 50+ decision parameters for faster, more accurate evaluations.",
    href: "/products/cashfloai",
  },
  {
    id: "docai",
    brand: "DeepDelve® DocAI",
    title: "Document processing across enterprise use cases",
    body: "Expense reports, building plans, resumes, ID documents, multilingual packs and lending forms — extract, validate and route with governed AI.",
    href: "/products/docai",
  },
  {
    id: "deepprobe",
    brand: "DeepDelve® DeepProbe",
    title: "Actionable insights from enterprise content",
    body: "Generative search that answers from your internal repositories — policies, contracts, SOPs, financial tables and regulatory documents — with current, cited responses.",
    href: "/products/deepprobe",
  },
] as const;

export const processSteps = [
  {
    id: "01",
    title: "Problem",
    timing: "Week 1 · discovery",
    body: "Find the friction in the real workflow: the rekeying, the inbox pile, the spreadsheet hand-off. Map it with your team, not guessed.",
  },
  {
    id: "02",
    title: "Ideation",
    timing: "Weeks 2–3 · design",
    body: "Sketch the agent, the screen and the human checkpoint with the people who will use it. Agree what done looks like and how it is measured.",
  },
  {
    id: "03",
    title: "Solution",
    timing: "Under 2 months · live",
    body: "One high-value use case live on AI Workspace, measured against the baseline, with a clear path to the next agent on the same platform.",
  },
] as const;

export const integrations = [
  "SAP",
  "Microsoft 365",
  "Dynamics 365",
  "Oracle NetSuite",
  "SharePoint",
  "Email / shared inbox",
  "ERP connectors",
  "Document repositories",
] as const;

export const aboutCopy = {
  vision:
    "At ZeonAI Labs, we are dedicated to revolutionising the way businesses handle document processing and information retrieval. Leveraging cutting-edge AI technologies, we aim to transform traditional methods into efficient, intelligent systems that drive better business outcomes.",
  expertise:
    "Founded by industry veterans with a wealth of experience in artificial intelligence, our team combines deep AI expertise with a proven track record in product development.",
  approach:
    "By keeping AI at the centre of our solutions and employing intelligent agents to act on AI insights, we tackle document management from a fresh, impactful perspective.",
  locations: ["Canada", "India", "Dubai", "Australia"],
} as const;

export const hero = {
  eyebrow: "ZeonAI platform / AI Workspace",
  headline: "The governed AI platform for enterprise knowledge and workflows.",
  body: "AI Workspace answers questions from your own documents and cites every source. Its agents read, check and route the paperwork behind a process, from the inbox to your ERP, and people approve what matters. Access control and an audit log are part of the platform, not an add-on.",
  primaryCta: { label: "Book a demo", href: "/demo" },
  secondaryCta: { label: "See the platform", href: "#platform" },
} as const;

export const architectureLayers = [
  {
    key: "data-sources",
    id: "01",
    title: "Data sources",
    description:
      "Spreadsheets and PDFs come in by upload or from a connected repository. They are read where they live, and the original file is kept with the case.",
    details: [
      "Spreadsheets: sheets, header row, typed columns",
      "PDFs: key phrases and a document category",
      "Kept: the original file stays with the case",
    ],
  },
  {
    key: "document-processing",
    id: "02",
    title: "Document processing",
    description:
      "Document processing is configured, not hard-coded. You describe the document once and the same setup reads every file of that kind.",
    details: [
      "Spreadsheets: typed columns with their own instructions",
      "PDFs: whole document, page by page, or fixed layout",
      "Repeats: matching data on adjacent pages merges into one record",
    ],
  },
  {
    key: "rules-engine",
    id: "03",
    title: "Rules engine",
    description:
      "Rules live in named rule sets. Describe a rule in plain language and the platform drafts it. A person reviews the draft before it is saved.",
    details: [
      "Types: calculation, validation, transformation, assignment",
      "Output: each rule names the variables it produces",
      "Review: generated rules are checked by a person",
    ],
  },
  {
    key: "workflows-approvals",
    id: "04",
    title: "Workflows and approvals",
    description:
      "A case has one holder at a time. The holder can delegate tasks without giving up the case, and a case cannot close while a task is still open.",
    details: [
      "Tasks: open, submitted, sent back, resubmitted, completed",
      "Deadlines: a task deadline cannot pass the case deadline",
      "Closing: blocked until every task is complete",
    ],
  },
  {
    key: "access-audit",
    id: "05",
    title: "Access and audit",
    description:
      "Roles carry named permissions. Visibility tiers keep sensitive cases in front of the right people only. Every action is written to an activity log that nobody can edit.",
    details: [
      "Roles: named permissions, set by an administrator",
      "Visibility: general, protected, or restricted to one owner",
      "Log: read only, with the actor and a timestamp",
    ],
  },
  {
    key: "outputs-integrations",
    id: "06",
    title: "Outputs and integrations",
    description:
      "Results go where the work happens: a dashboard, a downloadable report, an export file, or your ERP through a connector.",
    details: [
      "Formats: dashboard view, report, export file",
      "ERP: posted through a connector",
      "Watchers: notified in the app and by email, read only",
    ],
  },
] as const;

export type ArchitectureLayerKey = (typeof architectureLayers)[number]["key"];

export const capabilities = [
  {
    id: "ask-ai",
    title: "Ask AI",
    summary:
      "A persona-aware copilot that answers from your documents, with citations.",
    problem:
      "Teams need answers from policies and packs they already have access to — without guessing which share drive holds the current version.",
    does:
      "A persona-aware copilot retrieves from AI Drive, cites every source, and withholds documents outside the asker’s access.",
    workflow: [
      "Ask a question in the context of a role",
      "Access and sensitivity rules are applied before retrieval",
      "Cited answer returns with source documents",
      "Export or act only on what the role allows",
    ],
    governance:
      "Access is checked before retrieval. Matching documents outside the role are withheld, not summarised.",
    sampleNote: "Sample data · illustrative persona scenario",
    persona:
      "Priya Nair, Finance manager, asks which approvals a capital request needs.",
    related: ["ai-drive", "workflows", "agent-hub"] as const,
  },
  {
    id: "ai-drive",
    title: "AI Drive",
    summary:
      "Governed documents with versions, lineage, indexing and permissions.",
    problem:
      "Policies, contracts and operational packs live in scattered shares with unclear versions and access.",
    does:
      "Keeps documents indexed, versioned and permissioned so Ask AI and agents work from the same governed library.",
    workflow: [
      "Upload or connect a repository",
      "Index for search with access rights",
      "Track lineage across versions",
      "Expose only what each role may open",
    ],
    governance:
      "Owner, access groups, view/download rights and sensitivity are set on each file.",
    sampleNote: "Sample data · illustrative document list",
    persona:
      "Daniel Okoye, Legal operations lead, finds the governed copy of a supplier contract.",
    related: ["ask-ai", "contracts", "workflows"] as const,
  },
  {
    id: "workflows",
    title: "Workflows",
    summary:
      "Steps, approvals and an audit trail, with agents and people working together.",
    problem:
      "Document processes stall between inbox, spreadsheet and ERP with weak exception handling.",
    does:
      "Runs multi-step workflows from ingest to post, pausing for human approval on exceptions.",
    workflow: [
      "Ingest from inbox or repository",
      "Extract and match fields",
      "Apply rules and tolerances",
      "Human approval on exceptions",
      "Post to ERP or export",
    ],
    governance:
      "Every stage writes to an audit trail. A case cannot close while a task is open.",
    sampleNote: "Sample data · supplier invoice workflow",
    persona:
      "Kenji Ito, Compliance officer, approves the step a workflow paused on.",
    related: ["agent-hub", "ask-ai", "dashboards"] as const,
  },
  {
    id: "dashboards",
    title: "AI Dashboards",
    summary: "Smart dashboards built from your Excel and database sources.",
    problem:
      "Operational metrics sit in spreadsheets and databases with no live, role-aware view.",
    does:
      "Builds operational dashboards from Excel and database sources teams already trust.",
    workflow: [
      "Connect spreadsheet or database sources",
      "Define metrics and charts",
      "Open a live operational view",
      "Drill into exceptions for review",
    ],
    governance:
      "Dashboards inherit source permissions; illustrative metrics are sample data.",
    sampleNote: "Sample data · procurement overview metrics",
    persona:
      "Amara Cole, Credit analyst, opens a dashboard built from a spreadsheet and the finance database.",
    related: ["ai-drive", "workflows", "agent-hub"] as const,
  },
  {
    id: "contracts",
    title: "Contract Intelligence",
    summary:
      "Clauses read, key terms extracted and risks flagged for review.",
    problem:
      "Legal teams spend hours finding renewal, liability and payment terms across agreement packs.",
    does:
      "Reads clauses, extracts key terms and flags risks for a person to review.",
    workflow: [
      "Open a contract from AI Drive",
      "Extract clauses and fields",
      "Flag risks against policy",
      "Human review before action",
    ],
    governance:
      "Risk flags are for review, not automatic acceptance. Source document stays with the case.",
    sampleNote: "Sample data · illustrative agreement excerpt",
    persona:
      "Daniel Okoye, Legal operations lead, reviews the clause the platform flagged.",
    related: ["ai-drive", "workflows", "ask-ai"] as const,
  },
  {
    id: "opportunity",
    title: "Opportunity Management",
    summary:
      "Opportunities surfaced, qualified and moved through the pipeline.",
    problem:
      "Tender leads arrive from many channels and stall before a disciplined pursuit decision.",
    does:
      "Surfaces, qualifies and moves opportunities through a governed pipeline.",
    workflow: [
      "Scan for new tenders",
      "Qualify fit against rules",
      "Move to pursue or quote",
      "Hand off to Quote Management",
    ],
    governance:
      "Stage changes are logged. Fit checks are reviewed by the tenders lead.",
    sampleNote: "Sample data · opportunity pipeline stages",
    persona:
      "Elena Marsh, Tenders lead, moves a qualified opportunity into pursuit.",
    related: ["quotes", "workflows", "agent-hub"] as const,
  },
  {
    id: "quotes",
    title: "Quote Management",
    summary: "Quotes assembled from your library and routed for approval.",
    problem:
      "Quotes are rebuilt by hand from price libraries with weak margin review.",
    does:
      "Assembles quotes from your library and routes them for pricing approval.",
    workflow: [
      "Assemble line items from the library",
      "Calculate totals and margin",
      "Send to pricing approver",
      "Approve and issue",
    ],
    governance:
      "Pricing approver reviews margin and terms before issue.",
    sampleNote: "Sample data · quote Q-1042 line items",
    persona:
      "Elena Marsh, Tenders lead, sends an assembled quote for approval.",
    related: ["opportunity", "workflows", "ai-drive"] as const,
  },
  {
    id: "app-hub",
    title: "App Hub",
    summary: "Intelligent apps, shown only for the roles that may use them.",
    problem:
      "Role-specific assistants are hard to discover and harder to govern.",
    does:
      "Shows intelligent apps only for the roles allowed to use them. Some apps are available; others are marked coming soon.",
    workflow: [
      "Open App Hub for your role",
      "See available apps only",
      "Open or preview an app",
      "Coming-soon apps stay labelled",
    ],
    governance:
      "Apps are role-filtered. Coming-soon items are labelled and not presented as generally available.",
    sampleNote: "Sample data · role-filtered app list",
    persona:
      "Rahul Mehta, Regional operations head, sees only the apps their role allows.",
    related: ["ask-ai", "workflows", "agent-hub"] as const,
  },
  {
    id: "agent-hub",
    title: "Agent Hub",
    summary:
      "Agents grouped by function, each running a workflow of sub-agents.",
    problem:
      "Document-heavy processes need repeatable agents with human checkpoints, not one-off scripts.",
    does:
      "Groups agents by function. Each agent runs a workflow of sub-agents, with people on the exceptions.",
    workflow: [
      "Choose or build an agent",
      "Configure sub-agents (ingest → output)",
      "Run against a case pack",
      "Review flagged lines and approve",
    ],
    governance:
      "Runs attach evidence. Approvals are human. Portfolio maturity varies by agent.",
    sampleNote:
      "Sample data · portfolio note: about 30% in production, about 50% in pilot/developed, about 20% still to be developed",
    persona:
      "Sam Whitaker, Accounts payable supervisor, reviews and approves a reconciliation agent's run.",
    related: ["workflows", "ask-ai", "dashboards"] as const,
  },
] as const;

export type Capability = (typeof capabilities)[number];
export type CapabilityId = Capability["id"];

export function getCapability(id: string) {
  return capabilities.find((c) => c.id === id);
}

export const agentCategories = [
  {
    title: "Finance and reconciliation",
    agents: [
      "Invoice processing and 3-way match",
      "Partner billing reconciliation",
      "Bank-ERP reconciliation",
      "E-batch and payment reconciliation",
      "Financial consolidation",
      "Fund analysis agent",
    ],
  },
  {
    title: "Lending and credit",
    agents: [
      "Loan origination agent",
      "Credit memo generation",
      "KYC intelligence agent",
      "AI underwriting agent",
      "Mortgage application automation",
    ],
  },
  {
    title: "Operations and documents",
    agents: [
      "Contract analysis agent",
      "Invoice PO 2-way matching",
      "Data migration reconciliation",
      "EHS injury and incident analysis",
      "Workflow agent",
    ],
  },
  {
    title: "Knowledge and contracts",
    agents: [
      "Contract intelligence agent",
      "Secure knowledge discovery",
      "Generative search and policy QA",
      "Secure knowledge management",
    ],
  },
] as const;

export const industries = [
  {
    id: "financial",
    label: "Financial services and lending",
    intro:
      "Faster, better-documented credit decisions without adding headcount.",
    process: ["Intake", "Extract", "Check", "Approve"],
    platform: "Runs on AI Workspace · Agent Hub",
    useCases: [
      {
        title: "Mortgage application automation",
        body: "Reads application packs and checks them against lending policy.",
      },
      {
        title: "AI underwriting",
        body: "Assembles the evidence an underwriter needs into one view.",
      },
      {
        title: "KYC intelligence",
        body: "Extracts and verifies identity and entity details.",
      },
      {
        title: "Credit memo generation",
        body: "Drafts the credit memo from verified data for review.",
      },
    ],
  },
  {
    id: "super",
    label: "Superannuation and finance",
    intro:
      "Clean payables and reconciliations, with an audit trail for every exception.",
    process: ["Intake", "Extract", "Check", "Approve"],
    platform: "Runs on AI Workspace · Agent Hub",
    useCases: [
      {
        title: "Invoice processing and 3-way match",
        body: "Matches invoices to purchase orders and goods receipts.",
      },
      {
        title: "E-batch and payment reconciliation",
        body: "Reconciles payment batches against bank records.",
      },
      {
        title: "Fund analysis",
        body: "Summarises fund data for investment and board reporting.",
      },
      {
        title: "Bank-ERP reconciliation",
        body: "Matches bank records to the ledger and flags differences for review.",
      },
    ],
  },
  {
    id: "media",
    label: "Media and publishing",
    intro:
      "More output from the same newsroom, with checks before anything is published.",
    process: ["Ask", "Access", "Retrieve", "Cite"],
    platform: "Runs on AI Workspace · Core",
    useCases: [
      {
        title: "Topic summary and insight",
        body: "Condenses coverage and research into a briefing.",
      },
      {
        title: "Fact check",
        body: "Flags claims that need a source before publication.",
      },
      {
        title: "AI audio",
        body: "Turns written stories into audio versions.",
      },
      {
        title: "Topic and article search",
        body: "Finds related coverage across the archive.",
      },
    ],
  },
  {
    id: "gov",
    label: "Government and public sector",
    intro:
      "Answers from policy and data, with access controls that match the classification.",
    process: ["Ask", "Retrieve", "Act", "Review"],
    platform: "Runs on AI Workspace · Core and Agent Hub",
    useCases: [
      {
        title: "Generative search and policy questions",
        body: "Answers policy questions with citations to the source.",
      },
      {
        title: "Financial analysis",
        body: "Analyses budget and expenditure data on request.",
      },
      {
        title: "Geospatial analysis",
        body: "Brings location data into reports and decisions.",
      },
      {
        title: "Secure knowledge discovery",
        body: "Searches restricted archives within each user's clearance.",
      },
    ],
  },
  {
    id: "defence",
    label: "Defence",
    intro:
      "Knowledge discovery for classified environments, deployed on your own infrastructure.",
    process: ["Ask", "Access", "Retrieve", "Cite"],
    platform: "Runs on AI Workspace · Core",
    useCases: [
      {
        title: "Secure knowledge discovery",
        body: "Finds what personnel need within their clearance.",
      },
      {
        title: "Classified document questions",
        body: "Answers questions on restricted documents, with citations.",
      },
      {
        title: "Access-controlled search",
        body: "Search that enforces need-to-know on every result.",
      },
      {
        title: "SOP and doctrine management",
        body: "Keeps procedures current, versioned and searchable.",
      },
    ],
  },
  {
    id: "metals",
    label: "Metals and manufacturing",
    intro: "Less paperwork between the plant floor and the finance team.",
    process: ["Intake", "Extract", "Check", "Approve"],
    platform: "Runs on AI Workspace · Agent Hub",
    useCases: [
      {
        title: "Vendor invoice processing",
        body: "Captures and validates vendor invoices for posting.",
      },
      {
        title: "EHS injury and incident analysis",
        body: "Finds patterns in safety reports to prevent repeats.",
      },
      {
        title: "Data migration reconciliation",
        body: "Checks migrated records against the source system.",
      },
      {
        title: "Invoice and PO 2-way matching",
        body: "Matches vendor invoices to purchase orders and routes mismatches.",
      },
    ],
  },
] as const;

export type Industry = (typeof industries)[number];

export function getIndustry(id: string) {
  return industries.find((i) => i.id === id);
}

export const roles = [
  {
    id: "finance",
    label: "Finance manager",
    included: 6,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Workflows", status: "included" },
      { name: "Dashboard", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "Notifications", status: "included" },
      { name: "AI Dashboards", status: "off" },
      { name: "Contract Intelligence", status: "off" },
      { name: "App Hub", status: "off" },
      { name: "Quote Management", status: "off" },
      { name: "Opportunity Management", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["InvoiceAI", "Bank and ERP reconciliation", "Budget variance review"],
  },
  {
    id: "legal",
    label: "Legal and contracts lead",
    included: 5,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Contract Intelligence", status: "included" },
      { name: "Workflows", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "AI Dashboards", status: "off" },
      { name: "App Hub", status: "off" },
      { name: "Quote Management", status: "off" },
      { name: "Opportunity Management", status: "off" },
      { name: "Dashboard", status: "off" },
      { name: "Notifications", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["Contract intelligence", "Clause extraction", "Risk flagging"],
  },
  {
    id: "procurement",
    label: "Procurement and tenders lead",
    included: 6,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "Opportunity Management", status: "included" },
      { name: "Quote Management", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Workflows", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "Contract Intelligence", status: "off" },
      { name: "AI Dashboards", status: "off" },
      { name: "App Hub", status: "off" },
      { name: "Dashboard", status: "off" },
      { name: "Notifications", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["Opportunity scanner", "Quote assembly", "Supplier matching"],
  },
  {
    id: "compliance",
    label: "Compliance and KYC officer",
    included: 5,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Workflows", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "Dashboard", status: "included" },
      { name: "Contract Intelligence", status: "off" },
      { name: "App Hub", status: "off" },
      { name: "Quote Management", status: "off" },
      { name: "Opportunity Management", status: "off" },
      { name: "AI Dashboards", status: "off" },
      { name: "Notifications", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["KYC intelligence", "Credit scoring", "Policy QA"],
  },
  {
    id: "ops",
    label: "Operations head",
    included: 6,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "App Hub", status: "included" },
      { name: "Workflows", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "Dashboard", status: "included" },
      { name: "Contract Intelligence", status: "off" },
      { name: "Quote Management", status: "off" },
      { name: "Opportunity Management", status: "off" },
      { name: "AI Dashboards", status: "off" },
      { name: "Notifications", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["Maintenance planner", "Training assistant", "Voice timesheet"],
  },
  {
    id: "credit",
    label: "Credit analyst",
    included: 5,
    total: 12,
    modules: [
      { name: "Ask AI", status: "included" },
      { name: "AI Dashboards", status: "included" },
      { name: "AI Drive", status: "included" },
      { name: "Agent Hub", status: "included" },
      { name: "Dashboard", status: "included" },
      { name: "Workflows", status: "off" },
      { name: "Contract Intelligence", status: "off" },
      { name: "App Hub", status: "off" },
      { name: "Quote Management", status: "off" },
      { name: "Opportunity Management", status: "off" },
      { name: "Notifications", status: "off" },
      { name: "Search", status: "off" },
    ],
    agents: ["Credit memo generation", "Ratio and risk analysis", "Underwriting pack"],
  },
] as const;

/**
 * Case studies from ZeonAI_Complete_Website_Copy_and_Cursor_Brief.md.
 * TODO: confirm permission, definitions, and evidence before public launch.
 * Manifest AI case-study stats are NOT used here (brief is content SoT).
 */
export const caseStudies = [
  {
    slug: "mortgage-application-automation",
    title: "Mortgage application automation at lending scale",
    sector: "Lending",
    industry: "Lending",
    metric: "70%+ reduction in manual effort on loan application forms",
    metricShort: "70%+",
    metricLabel: "Less manual effort",
    context:
      "Multi-page loan application forms, 30,000+ documents a month, 10,000+ users onboarded",
    customer: "Australian credit asset management firm",
    products: "DocAI · AI Workspace · Agent Hub",
    summary:
      "DocAI reads multi-page loan forms at scale, with a validation screen and a live connection into the firm’s financial systems.",
    challenge:
      "Multi-page loan application forms took extensive manual effort to extract and validate, which led to inefficiencies and potential errors.",
    deployed:
      "DocAI on Agent Hub reads each form, with a validation screen for quick checks and corrections, connected to the firm's financial systems.",
    outcome:
      "Staff moved to strategic work. AI-driven validation ensures near-zero data errors and processing time fell by 70%, so loan approvals arrive sooner.",
    heroTheme: "ink" as const,
    visualType: "document" as const,
    metrics: [
      { value: "70%+", label: "Less manual effort" },
      { value: "30,000+", label: "Documents a month" },
      { value: "10,000+", label: "Users onboarded" },
      { value: "70%", label: "Faster processing time" },
    ],
    related: ["partner-billing-automation", "bank-statement-receipting"] as const,
  },
  {
    slug: "partner-billing-automation",
    title: "Partner billing with audit trails for every fee type",
    sector: "Lending",
    industry: "Lending",
    metric: "80% reduction in manual processing of partner billing",
    metricShort: "80%",
    metricLabel: "Less manual billing work",
    context: "Monthly partner fee calculations, 8,000+ documents a month",
    customer: "Lending bank in the US",
    products: "InvoiceAI · AI Workspace · Agent Hub",
    summary:
      "InvoiceAI extracts partner agreements, calculates fee structures, and posts invoices through ERP — with a validation screen and a full audit trail.",
    challenge:
      "Monthly partner fee calculations across several fee types were done by hand with SQL queries and Excel templates.",
    deployed:
      "InvoiceAI on Agent Hub extracts partner agreements, calculates the fee structures and posts invoices through an ERP integration, with a validation screen for quick checks.",
    outcome:
      "Billing disputes fall away with 99%+ accuracy, partners are paid 60% faster, and automated audit trails reduce compliance risk.",
    heroTheme: "pale" as const,
    visualType: "billing" as const,
    metrics: [
      { value: "80%", label: "Less manual processing" },
      { value: "60%", label: "Faster partner payment" },
      { value: "99%+", label: "Billing accuracy" },
      { value: "8,000+", label: "Documents a month" },
    ],
    related: [
      "mortgage-application-automation",
      "bank-statement-receipting",
    ] as const,
  },
  {
    slug: "bank-statement-receipting",
    title: "Daily bank statement receipting for a superannuation fund",
    sector: "Superannuation and finance",
    industry: "Superannuation and finance",
    metric: "80–85% reduction in daily receipting time",
    metricShort: "80–85%",
    metricLabel: "Less receipting time",
    context: "Daily bank statement receipting, 5,000+ documents a month",
    customer: "Leading superannuation fund",
    products: "Reconciliation agent · AI Workspace · Agent Hub",
    summary:
      "A reconciliation agent matches employer deposits on bank statements in real time, with exceptions routed to a person.",
    challenge:
      "Receipting meant identifying employer deposits on daily bank statements by hand and preparing batches in spreadsheets, passed between receipting officers by email.",
    deployed:
      "A reconciliation agent on Agent Hub reads bank statement narratives, matches deposits to employer accounts and generates the batch files in real time. Exceptions and duplicates go to a person.",
    outcome:
      "Staff review only the exceptions. Fund allocation is faster, operational risk is lower, and human review keeps compliance in place.",
    heroTheme: "paper" as const,
    visualType: "reconciliation" as const,
    metrics: [
      { value: "80–85%", label: "Less receipting time" },
      { value: "5,000+", label: "Documents a month" },
      { value: "99%+", label: "Matching accuracy" },
      { value: "Human", label: "Exceptions reviewed" },
    ],
    related: [
      "partner-billing-automation",
      "media-content-intelligence",
    ] as const,
  },
  {
    slug: "media-content-intelligence",
    title: "Media content intelligence without added headcount",
    sector: "Media",
    industry: "Media",
    metric: "20–28% lower operating cost",
    metricShort: "20–28%",
    metricLabel: "Lower operating cost",
    context: "High-volume text and audio content, 5,000+ documents a month",
    customer: "Leading Australian media agency",
    products: "AI Workspace · DocAI",
    summary:
      "AI Workspace turns text and audio into real-time summaries, with semantic search and consistent sentiment analysis.",
    challenge:
      "Manual processes could not synthesise large volumes of content, leaving information gaps and outdated reports. Keyword search missed context, and manual summaries were costly and subjective.",
    deployed:
      "AI Workspace turns text and audio into real-time summaries, with semantic search, consistent sentiment analysis and archive queries.",
    outcome:
      "Operating costs fell by 20–28% and error rates from 20% to under 1%. The same team now serves 5x more customers without more headcount.",
    heroTheme: "mist" as const,
    visualType: "media" as const,
    metrics: [
      { value: "20–28%", label: "Lower operating cost" },
      { value: "<1%", label: "Error rate (from ~20%)" },
      { value: "5×", label: "More customers served" },
      { value: "5,000+", label: "Documents a month" },
    ],
    related: [
      "mortgage-application-automation",
      "bank-statement-receipting",
    ] as const,
  },
] as const;

export type CaseStudy = (typeof caseStudies)[number];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const trustItems = [
  {
    title: "Role-based access",
    body: "Granular permission controls ensure users only access what they need. Access is checked before anything is retrieved.",
  },
  {
    title: "Encryption",
    body: "End-to-end encryption for data at rest and in transit.",
  },
  {
    title: "Two-factor authentication and audit logs",
    body: "Two-factor authentication and comprehensive audit trails.",
  },
  {
    title: "Legal archiving",
    body: "Compliant data retention and GDPR-ready systems.",
  },
  {
    title: "Disaster recovery",
    body: "Robust backup systems and business continuity planning.",
  },
  {
    title: "Deployment on your terms",
    body: "On-premises or private cloud deployment with full data and model sovereignty.",
  },
] as const;

/** TODO: verify certification status with security owner before public claims */
export const trustLabels = [
  { name: "SOC 2", note: "Compliance" },
  { name: "ISO 27001", note: "Information security management" },
  { name: "GDPR", note: "GDPR-ready systems" },
] as const;

export const deployments = [
  "On-premises",
  "Private cloud",
  "AWS",
  "GCP",
  "Azure",
] as const;

export const offices = [
  {
    region: "India",
    flag: "🇮🇳",
    address: "Neeladri Vihar, Chandrasekharpur, Bhubaneswar, Odisha 751021",
  },
  {
    region: "United Arab Emirates",
    flag: "🇦🇪",
    address: "Meydan Grandstand area, Dubai",
  },
  {
    region: "Canada",
    flag: "🇨🇦",
    address: "180 Howden Blvd, Brampton, ON L6S 0E6",
  },
] as const;

export const engineering = [
  {
    id: "01",
    label: "pipeline",
    title: "Hubs, agents and sub-agents",
    body: "A hub groups related agents. Each agent does one business task, and every agent runs the same four sub-agents in order. The result can go to a dashboard, a report, an export file or your ERP.",
  },
  {
    id: "02",
    label: "document processing",
    title: "Configured, not hard-coded",
    body: "You describe the document once. For a spreadsheet that means its sheets, header row and typed columns, each with its own instructions. For a PDF it means key phrases, a document category and an extraction mode, with data that repeats across adjacent pages merged into one record.",
  },
  {
    id: "03",
    label: "business rules",
    title: "Rule sets in four types",
    body: "A rule is a calculation, a validation, a transformation or an assignment, and rules are grouped into named rule sets. Describe the rule in plain language and the platform drafts it. A person reviews the draft before it is saved.",
  },
  {
    id: "04",
    label: "access",
    title: "Roles and visibility tiers",
    body: "Roles carry named permissions. A case is general, protected, or restricted to one owner, and only the current holder of a case can act on it. An administrator override exists, but only as an explicit permission you grant, and it never reaches a restricted case.",
  },
  {
    id: "05",
    label: "delegation",
    title: "Tasks without handing over the case",
    body: "The holder delegates tasks and keeps the case. Each task has a deadline that cannot pass the case deadline, and moves from open to completed, with send-back and resubmission in between. A case cannot close while a task is still open.",
  },
  {
    id: "06",
    label: "audit and notifications",
    title: "A log nobody can edit",
    body: "Every action is written to a read-only activity log with the actor and a timestamp. It cannot be edited or deleted. Watchers are told about each change in the app and by email, and they cannot act on the case.",
  },
] as const;
