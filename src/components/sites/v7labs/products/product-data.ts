/**
 * DeepDelve product pages — copy from ZeonAI content / solutions SoT.
 * Sample UI values are illustrative demo content, not verified metrics.
 */

export type ProductSlug = "docai" | "invoiceai" | "cashfloai" | "deepprobe";

export type ProductDef = {
  slug: ProductSlug;
  brand: string;
  label: string;
  title: string;
  lead: string;
  promise: string;
  workflow: readonly { id: string; title: string; body: string; human?: boolean }[];
  useCases: readonly { title: string; body: string }[];
  crossLinks: readonly { href: string; label: string }[];
  faq: readonly { q: string; a: string }[];
};

export const PRODUCTS: Record<ProductSlug, ProductDef> = {
  docai: {
    slug: "docai",
    brand: "DeepDelve® DocAI",
    label: "Product · DocumentAI",
    title: "Documents become structured, reviewable information.",
    lead: "Expense reports, building plans, resumes, ID packs, multilingual files and lending forms — extract, validate and route with governed AI.",
    promise:
      "Turn complex unstructured documents into fields your people can check, with the source passage still in view.",
    workflow: [
      {
        id: "01",
        title: "Ingest",
        body: "Upload or connect a repository. Original files stay with the case.",
      },
      {
        id: "02",
        title: "Classify",
        body: "Document type is configured once, then applied to every file of that kind.",
      },
      {
        id: "03",
        title: "Extract",
        body: "Fields and clauses are pulled into a structured review surface.",
      },
      {
        id: "04",
        title: "Validate",
        body: "Confidence and missing values surface for a human checkpoint.",
        human: true,
      },
      {
        id: "05",
        title: "Route",
        body: "Approved results move to workflow, table export, or the next system.",
      },
    ],
    useCases: [
      {
        title: "Lending packs",
        body: "Application forms and supporting PDFs into a reviewable field set before credit decisioning.",
      },
      {
        title: "Identity and KYC packs",
        body: "IDs and multilingual packs extracted with a validation screen for quick checks.",
      },
      {
        title: "Enterprise forms",
        body: "Expense, HR and operations forms described once and reused across volume.",
      },
    ],
    crossLinks: [
      { href: "/products/invoiceai", label: "InvoiceAI" },
      { href: "/products/cashfloai", label: "CashfloAI" },
      { href: "/products/deepprobe", label: "DeepProbe" },
    ],
    faq: [
      {
        q: "Does DocAI replace human review?",
        a: "No. People stay on exceptions and low-confidence fields. Approvals are explicit checkpoints in the workflow.",
      },
      {
        q: "Where do outputs go?",
        a: "Structured tables, downloads, or connectors scoped per engagement — not a universal plug-and-play claim.",
      },
    ],
  },
  invoiceai: {
    slug: "invoiceai",
    brand: "DeepDelve® InvoiceAI",
    label: "Product · InvoiceAI",
    title: "Capture, check, match and route invoices.",
    lead: "Streamline vendor invoice processing. Cut through unstructured documents, automate extraction, and integrate with ERP for validation, approval and posting.",
    promise:
      "Invoice data is easier to capture and match — with people on the exceptions before anything posts.",
    workflow: [
      {
        id: "01",
        title: "Receive",
        body: "Invoices arrive by inbox, upload or connector.",
      },
      {
        id: "02",
        title: "Extract",
        body: "Supplier, numbers, dates, lines, tax and totals become structured fields.",
      },
      {
        id: "03",
        title: "Validate",
        body: "Rules check completeness and format before matching.",
      },
      {
        id: "04",
        title: "Match",
        body: "PO and goods receipt comparison flags variance for review.",
        human: true,
      },
      {
        id: "05",
        title: "Approve",
        body: "A person clears the exception before ERP post.",
        human: true,
      },
      {
        id: "06",
        title: "Output",
        body: "Posted document with an audit trail of what changed.",
      },
    ],
    useCases: [
      {
        title: "AP vendor invoices",
        body: "Three-way match with freight and tax variance held for a person.",
      },
      {
        title: "Partner fee billing",
        body: "Agreements extracted, fee structures calculated, invoices posted through ERP with a validation screen.",
      },
    ],
    crossLinks: [
      { href: "/products/docai", label: "DocAI" },
      { href: "/products/cashfloai", label: "CashfloAI" },
      { href: "/agents", label: "Agent Hub" },
    ],
    faq: [
      {
        q: "Can InvoiceAI approve without a person?",
        a: "Exceptions and mismatches are routed for human review. Do not treat the product as autonomous posting.",
      },
    ],
  },
  cashfloai: {
    slug: "cashfloai",
    brand: "DeepDelve® CashfloAI",
    label: "Product · CashfloAI",
    title: "Cash-flow visibility from bank statements.",
    lead: "Optimise SMB lending analysis and underwriting. Analyse cash flow from diverse bank statements with decision parameters for faster, more accurate evaluations.",
    promise:
      "Financial documents become a reviewable cash view — illustrative values, source-linked where the product supports it.",
    workflow: [
      {
        id: "01",
        title: "Source",
        body: "Bank statements and spreadsheets enter as documents or sheets.",
      },
      {
        id: "02",
        title: "Structure",
        body: "Inflows, outflows and periods become typed fields.",
      },
      {
        id: "03",
        title: "Validate",
        body: "Missing or mismatched values surface for review.",
        human: true,
      },
      {
        id: "04",
        title: "View",
        body: "A finance dashboard summarises due, overdue and period comparison — sample data labelled.",
      },
      {
        id: "05",
        title: "Decide",
        body: "Underwriting parameters inform a human decision, not an invented score claim.",
        human: true,
      },
    ],
    useCases: [
      {
        title: "SMB lending underwriting",
        body: "Cash-flow analysis from bank statements with configurable decision parameters.",
      },
      {
        title: "Statement reconciliation",
        body: "Mismatched or missing values held for a person before the next step.",
      },
    ],
    crossLinks: [
      { href: "/products/invoiceai", label: "InvoiceAI" },
      { href: "/products/docai", label: "DocAI" },
      { href: "/products/deepprobe", label: "DeepProbe" },
    ],
    faq: [
      {
        q: "Are dashboard figures real performance claims?",
        a: "No. Figures in product previews are illustrative sample data for UI demonstration.",
      },
    ],
  },
  deepprobe: {
    slug: "deepprobe",
    brand: "DeepDelve® DeepProbe",
    label: "Product · DeepProbe",
    title: "Answers with evidence, permissions and a trail.",
    lead: "Generative search across policies, contracts, SOPs, financial tables and regulatory documents — current, cited responses from your repositories.",
    promise:
      "Find reliable answers across enterprise information with citations you can open and access you can see.",
    workflow: [
      {
        id: "01",
        title: "Ask",
        body: "A persona-aware query against governed documents.",
      },
      {
        id: "02",
        title: "Retrieve",
        body: "Access checks run before anything is returned.",
      },
      {
        id: "03",
        title: "Cite",
        body: "Every claim points to a source passage.",
      },
      {
        id: "04",
        title: "Review",
        body: "People act on exceptions; the audit log records the trail.",
        human: true,
      },
    ],
    useCases: [
      {
        title: "Policy answers",
        body: "Credit, spend and compliance questions answered from the documents your role may see.",
      },
      {
        title: "Contract intelligence",
        body: "Clauses extracted and risks flagged for legal review on the same platform.",
      },
      {
        title: "Regulated industries",
        body: "Lending, finance, media, government, defence and manufacturing — on the same governed stack.",
      },
    ],
    crossLinks: [
      { href: "/architecture", label: "Architecture" },
      { href: "/platform", label: "AI Workspace" },
      { href: "/trust", label: "Trust Centre" },
    ],
    faq: [
      {
        q: "How is this different from a generic chatbot?",
        a: "DeepProbe answers from your repositories with citations, role-based access and an audit trail — not open-web invention.",
      },
    ],
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCTS) as ProductSlug[];

export function getProduct(slug: string): ProductDef | undefined {
  return PRODUCTS[slug as ProductSlug];
}
