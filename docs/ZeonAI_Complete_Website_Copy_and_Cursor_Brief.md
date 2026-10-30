# ZeonAI Website --- Complete Copy & Cursor Implementation Pack

**Prepared:** 30 October 2026\
**Source site:** https://zeonai-website-preview.vercel.app/\
**Visual reference:** https://manifestai.com.au/\
**Purpose:** Give Cursor one organized source of truth for the current
ZeonAI website copy, page structure, UI/demo content, and implementation
direction.

------------------------------------------------------------------------

# 1. Instructions for Cursor

Use this document as the content source of truth for the ZeonAI website.

## What to build

Complete the existing ZeonAI website rather than inventing a new product
or changing the business proposition. Preserve the product names,
feature names, six-layer architecture, industry coverage, customer
examples, governance concepts, and demo workflow described below.

Use Manifest AI as a **design and information-architecture reference
only**: its broad pattern of a clear hero, platform explanation,
product/agent capabilities, industry workspaces, integrations, delivery
process, case studies, trust, and final conversion is useful. Do not
copy Manifest's wording, statistics, testimonials, customer claims,
branding, or proprietary visual assets. Use ZeonAI's own content below.

## Brand and visual direction

Blend: - **V7 Labs Editorial Minimal:** generous whitespace, refined
editorial hierarchy, simple borders, flat surfaces, restrained
components. - **Manifest AI:** selective cinematic dark sections,
confident enterprise composition, precise product UI, clear product
storytelling.

ZeonAI's own palette remains authoritative: - Ink `#010F0F` - Paper
`#FFFFFF` - Mist `#EDEDED` - Ink 70 `#5B6766` - Fog `#9AA8A6` - Line
`#DCE1E0` - Zeon Blue `#0977B3` - Teal `#20879D` - Leaf `#91C63B` - Gold
`#C78928` - Ember `#E1661C`

Use the ZeonAI multi-colour gradient (Zeon Blue → Teal → Leaf → Gold →
Ember, 135°) only for a very thin accent, logo detail, active indicator,
or a single data visualization. Do not replace ZeonAI's palette with
Manifest's violet or V7's orange.

Typography direction: - Editorial display serif for selected major
headlines if a licensed font is available. - Clean sans-serif for body
copy and UI. - Monospaced font only for technical labels and metadata. -
Use large, light-weight headlines, clear line lengths, restrained letter
spacing, and sentence case.

Visual rules: - Light-first overall, with dark cinematic moments in the
hero and selected technology/trust sections. - Use real product-like
dashboards, document excerpts, workflows, tables, and schematic
diagrams. - Keep cards flat, borders fine, shadows almost absent, and
spacing generous. - No generic AI slop: no glowing brains, robot
imagery, random particle backgrounds, glossy glassmorphism, gratuitous
3D, or meaningless floating cards. - Avoid unsupported claims. Numbers
in case studies are source-site claims and must be confirmed by the
business before public launch. - Use responsive layouts and
keyboard-accessible interactions. - Honor `prefers-reduced-motion`; any
automatic carousel/scene loop must have a visible pause control. - All
CTA buttons labelled "Book a demo" must reach the real demo form or
contact path. - The current preview says no form endpoint is configured.
Do not imply a form was successfully submitted until a backend/email
integration is actually connected.

## Implementation approach

1.  Audit the existing codebase before changing it.
2.  Reuse working components, routes, assets, and interaction patterns
    where appropriate.
3.  Map the copy below to the current sections; do not silently omit a
    section.
4.  Consolidate repeated agent names in marquee data rather than
    duplicating content in source code.
5.  Build actual responsive layouts and interactions, not a static
    screenshot.
6.  Do not invent certifications, integration availability, deployment
    guarantees, customer names, performance claims, or product features.
7.  Where the source content is ambiguous or appears to make a claim
    requiring verification, add a code comment or content TODO instead
    of fabricating certainty.

------------------------------------------------------------------------

# 2. Current ZeonAI Website --- Copy Inventory

This section records the visible content and structure of the current
ZeonAI preview. Repeated visual ticker items are grouped rather than
repeated verbatim. Product demo values and sample identities should be
treated as illustrative sample data unless the business confirms
otherwise.

## 2.1 Navigation

-   Skip to content
-   Platform
-   Industries
-   Customers
-   Trust
-   Book a demo

## 2.2 Hero

**Headline**\
The governed AI platform for enterprise knowledge and workflows.

**Body**\
AI Workspace answers questions from your own documents and cites every
source. Its agents read, check and route the paperwork behind a process,
from the inbox to your ERP, and people approve what matters. Access
control and an audit log are part of the platform, not an add-on.

**Primary CTA**\
Book a demo

**Secondary CTA**\
See the platform

**Hero/product label**\
ZeonAI platform / AI Workspace

## 2.3 Interactive AI Workspace capability tour

Controls: - Sample data - Pause the capability tour

Product areas: - Ask AI - Agent Hub - App Hub - AI Dashboards -
Workflows - Contract Intelligence

### Ask AI sample

Question: \> What approval do I need for capital spend above budget?

Assistant role: \> AI assistant, answering as Finance manager

Answer: \> Spend above the approved budget needs CFO sign-off once it
passes the delegated limit. Raise a variation request in Workflows and
attach the revised business case.

Cited sources: - Capital expenditure policy v4.pdf --- AI Drive, Finance
only - Delegation of authority.docx --- AI Drive, v12

Access message: \> 2 matching documents not shown: outside your access

### Agent Hub portfolio categories

Finance and reconciliation: - Invoice processing and 3-way match -
Partner billing reconciliation - Bank-ERP reconciliation - E-batch and
payment reconciliation - Remittance confirmation - Continuous closing -
Financial consolidation - Two-way matching - Fund analysis agent

Lending and credit: - Loan origination agent - Credit memo generation -
Credit scoring - KYC intelligence agent - KYC extraction - Financial
ratio and risk analysis - AI underwriting agent - Mortgage application
automation

Operations and documents: - AI sheet and AI docs - AI presentation -
Invoice PO 2-way matching - Contract analysis agent - Data migration
reconciliation - Workflow agent - EHS injury and incident analysis

Content and productivity: - Plagiarism detection - Summary agent - PPT
generation agent - Podcast generation agent - Image generation agent -
Email reporting - Topic summary and insight - Grammar correction -
Paraphrasing - AI audio - Media report - Fact check agent

Analytics: - Ad-hoc analytics agent - Dashboard agent - IP analysis
agent - Email analysis agent - Health data analysis - Geospatial
analysis - Deep analysis agent

Knowledge and contracts: - Contract intelligence agent - Topic and
article search - Secure knowledge discovery - AskAI - Generative search
and policy QA - Secure knowledge management

Portfolio callout: - 50+ agents in our portfolio

### Agent builder / supplier invoice agent

-   Sub-agents / Supplier invoice agent
-   Draft · 7 sub-agents

1.  Data ingestion
2.  Extraction
3.  Rule builder
4.  Validation
5.  Workflow
6.  Dashboard
7.  Output

### App Hub sample

Heading: \> Apps for your role

Counter: \> 6 apps

Available apps: - Assisted Benefits Builder --- Draft benefit summaries
from policy and plan documents. - Assisted Maintenance Planner --- Plan
maintenance from work orders and asset manuals. - Training Assistant ---
Answer staff questions from approved training material. - Voice
Timesheet --- Record time by voice and send it for approval.

Coming soon: - Grant Acquittal --- Prepare acquittal packs from spend
records. - DA Document Assessment --- Assess application documents
against your rules.

Actions/states: - Available - Coming soon - Open app - Preview

### AI Dashboards sample

Heading: \> Procurement overview

Sources: - Excel: Spend by supplier.xlsx - Database: Finance database

Metrics: - AUD 4.8m --- Spend this quarter - 312 --- Open invoices - 3.1
days --- Average approval time

Chart: - Spend by month - Months shown: Apr, May, Jun, Jul, Aug, Sep,
Oct

### Workflows sample

Workflow: \> Supplier invoice workflow

State: \> Running

Stages: 1. Ingest 2. Extract 3. Match 4. Rules 5. Approve --- Human
approval 6. Post

Approver: \> Finance approver

Context: \> Reviews the flagged exceptions

Status: \> Approved

### Contract Intelligence sample

Document: \> Supplier-agreement-v3.pdf

Source: \> From AI Drive, Legal

Extracted clauses: - Renewal --- It renews automatically unless either
party gives 90 days notice. - Payment --- Invoices are payable within 45
days of receipt. - Liability, flagged --- Liability is limited to the
fees paid in the prior 12 months.

Extracted fields: - Counterparty --- Example Supplier Ltd - Term --- 36
months - Renewal --- Auto, 90 days notice

Risk flag: - Liability cap above policy

------------------------------------------------------------------------

# 3. Section 01 --- Architecture

**Eyebrow**\
01 · Architecture

**Heading**\
The platform in one picture

**Intro**\
Every document moves through the same six layers, from the file you
upload to the record in your ERP.

**Supporting statement**\
The language model can be swapped. The layers underneath are what make
the output safe to act on.

**Interaction hint**\
Scroll to open the layers, or choose one.

## Layer 01 --- Data sources

**Description**\
Spreadsheets and PDFs come in by upload or from a connected repository.
They are read where they live, and the original file is kept with the
case.

**Details** - Spreadsheets: Sheets, header row, typed columns. - PDFs:
Key phrases and a document category. - Kept: The original file stays
with the case.

## Layer 02 --- Document processing

**Description**\
Document processing is configured, not hard-coded. You describe the
document once and the same setup reads every file of that kind.

**Details** - Spreadsheets: Numeric, alphabetic, date, time and
percentage columns, each with its own instructions. - PDFs: Whole
document, page by page, or fixed layout with variable pages. - Repeats:
Matching data on adjacent pages merges into one record.

## Layer 03 --- Rules engine

**Description**\
Rules live in named rule sets. Describe a rule in plain language and the
platform drafts it. A person reviews the draft before it is saved.

**Details** - Types: Calculation, validation, transformation,
assignment. - Output: Each rule names the variables it produces. -
Review: Generated rules are checked by a person.

## Layer 04 --- Workflows and approvals

**Description**\
A case has one holder at a time. The holder can delegate tasks without
giving up the case, and a case cannot close while a task is still open.

**Details** - Tasks: Open, submitted, sent back, resubmitted,
completed. - Deadlines: A task deadline cannot pass the case deadline. -
Closing: Blocked until every task is complete.

## Layer 05 --- Access and audit

**Description**\
Roles carry named permissions. Visibility tiers keep sensitive cases in
front of the right people only. Every action is written to an activity
log that nobody can edit.

**Details** - Roles: Named permissions, set by an administrator. -
Visibility: General, protected, or restricted to one owner. - Log: Read
only, with the actor and a timestamp.

## Layer 06 --- Outputs and integrations

**Description**\
Results go where the work happens: a dashboard, a downloadable report,
an export file, or your ERP through a connector.

**Details** - Formats: Dashboard view, report, export file. - ERP:
Posted through a connector. - Watchers: Notified in the app and by
email, read only.

------------------------------------------------------------------------

# 4. Section 02 --- Capabilities

**Eyebrow**\
02 · Capabilities

**Heading**\
How ZeonAI is shaping decisions across the enterprise

**Intro**\
One platform, every business process, and one place to enhance them.

**Interaction hint**\
Click an item or use the arrow keys.

## Capability list

### Ask AI

A persona-aware copilot that answers from your documents, with
citations.

### AI Drive

Governed documents with versions, lineage, indexing and permissions.

### Workflows

Steps, approvals and an audit trail, with agents and people working
together.

### AI Dashboards

Smart dashboards built from your Excel and database sources.

### Contract Intelligence

Clauses read, key terms extracted and risks flagged for review.

### Opportunity Management

Opportunities surfaced, qualified and moved through the pipeline.

### Quote Management

Quotes assembled from your library and routed for approval.

### App Hub

Intelligent apps, shown only for the roles that may use them.

### Agent Hub

Agents grouped by function, each running a workflow of sub-agents.

## Ask AI demo copy

Question: \> What approval do I need for capital spend above budget?

Assistant role: \> AI assistant, answering as Finance manager

Answer: \> Spend above the approved budget needs CFO sign-off once it
passes the delegated limit. Raise a variation request in Workflows and
attach the revised business case.

Sources: - Capital expenditure policy v4.pdf --- AI Drive, Finance
only - Delegation of authority.docx --- AI Drive, v12

Access message: \> 2 matching documents not shown: outside your access

Input placeholder: \> Ask about your documents

Helper: \> Type / to use a skill

Persona scenario: \> Priya Nair, Finance manager, asks which approvals a
capital request needs.

## AI Drive demo copy

Location: \> AI Drive / Legal / Contracts

Action: \> Upload documents

Document list: - Supplier master agreement.pdf --- v7 · Indexed ·
Confidential - Services order form.docx --- v3 · Indexed · Internal -
Data processing addendum.pdf --- v2 · Indexing · Confidential - Board
resolution, restricted.pdf --- v1 · Indexed · Restricted

Selected document: \> Supplier master agreement.pdf

Fields: - Owner --- Legal operations - Access --- Legal, Procurement -
Rights --- View only, no download - Index --- Searchable by Ask AI

Lineage: 1. v5 --- Drafted 2. v6 --- Reviewed by legal 3. v7 ---
Approved, current

Persona scenario: \> Daniel Okoye, Legal operations lead, finds the
governed copy of a supplier contract.

## Workflows demo copy

Workflow: \> Supplier invoice workflow

State: \> Running

Stages: 1. Ingest --- Invoice arrives from the shared inbox. 2. Extract
--- Header fields and line items read. 3. Match --- Matched to the
purchase order. 4. Rules --- Totals and tolerance checked. 5. Approve
--- A person approves the exceptions. 6. Post --- Posted to the ERP.

Approver: \> Finance approver

Task: \> Reviews the flagged exceptions

State: \> Approved

Audit trail: - 09:14:02 --- Invoice INV-20418 ingested from ap-inbox. -
09:14:05 --- Fields extracted and matched to PO-7731. - 09:14:09 --- Two
lines routed to the finance approver. - 09:21:40 --- Approved by the
finance approver, posted to the ERP.

Persona scenario: \> Kenji Ito, Compliance officer, approves the step a
workflow paused on.

## AI Dashboards demo copy

Dashboard: \> Procurement overview

Sources: - Excel: Spend by supplier.xlsx - Database: Finance database

Metrics: - AUD 4.8m --- Spend this quarter - 312 --- Open invoices - 3.1
days --- Average approval time - 38 --- Exceptions

Charts: - Spend by month - Approval time, days

Persona scenario: \> Amara Cole, Credit analyst, opens a dashboard built
from a spreadsheet and the finance database.

## Contract Intelligence demo copy

Document: \> Supplier-agreement-v3.pdf

Source: \> From AI Drive, Legal

Clauses: - Term --- This agreement runs for 36 months from the effective
date. - Renewal --- It renews automatically unless either party gives 90
days notice. - Payment --- Invoices are payable within 45 days of
receipt. - Liability, flagged --- Liability is limited to the fees paid
in the prior 12 months.

Extracted fields: - Counterparty --- Example Supplier Ltd - Term --- 36
months - Renewal --- Auto, 90 days notice - Payment --- Net 45

Risk flags: - Liability cap above policy - Auto-renewal needs 90 days
notice

Persona scenario: \> Daniel Okoye, Legal operations lead, reviews the
clause the platform flagged.

## Opportunity Management demo copy

Dashboard: \> Opportunity pipeline

Notice: \> Opportunity scanner found 2 new tenders today

New: - Road resurfacing tender --- Closes 28 Nov - Depot maintenance
panel --- Closes 4 Dec

Qualifying: - Water main renewal --- Fit checked

Pursue: - Bridge inspection works --- Moved from Qualifying

Quoted: - Footpath upgrade --- Quote sent

Persona scenario: \> Elena Marsh, Tenders lead, moves a qualified
opportunity into pursuit.

## Quote Management demo copy

Quote: \> Quote Q-1042 / Sample Council

State: \> Draft

Line items:

  Item                                   Qty   Amount (AUD)
  ------------------------------------ ----- --------------
  Site survey                              1          2,400
  Materials, from your price library       1         18,750
  Labour, 6 crew days                      6          9,600
  Delivery and setup                       1          1,850
  **Total**                                      **32,600**

Approver: \> Pricing approver

Task: \> Reviews margin and terms

Action: \> Approve quote

Persona scenario: \> Elena Marsh, Tenders lead, sends an assembled quote
for approval.

## App Hub demo copy

Heading: \> Apps for your role

Counter: \> 6 apps

Available: - Assisted Benefits Builder --- Draft benefit summaries from
policy and plan documents. - Assisted Maintenance Planner --- Plan
maintenance from work orders and asset manuals. - Training Assistant ---
Answer staff questions from approved training material. - Voice
Timesheet --- Record time by voice and send it for approval.

Coming soon: - Grant Acquittal --- Prepare acquittal packs from spend
records. - DA Document Assessment --- Assess application documents
against your rules.

Persona scenario: \> Rahul Mehta, Regional operations head, sees only
the apps their role allows.

## Agent Hub demo copy

Agent portfolio categories: - Finance: invoice processing and 3-way
match, partner billing reconciliation, bank-ERP reconciliation, e-batch
and payment reconciliation, remittance confirmation, continuous closing,
financial consolidation, two-way matching, fund analysis. - Lending:
loan origination, credit memo generation, credit scoring, KYC
intelligence and extraction, financial ratio and risk analysis, AI
underwriting, mortgage application automation. - Operations: AI sheets
and docs, AI presentations, invoice/PO matching, contract analysis, data
migration reconciliation, workflow agent, EHS injury and incident
analysis. - Content: plagiarism detection, summaries, presentation
generation, podcast generation, image generation, email reporting, topic
insights, grammar correction, paraphrasing, AI audio, media reports,
fact checking. - Analytics: ad-hoc analytics, dashboards, IP analysis,
email analysis, health data analysis, geospatial analysis, deep
analysis. - Knowledge: contract intelligence, topic/article search,
secure knowledge discovery, AskAI, generative search and policy QA,
secure knowledge management.

Portfolio statement: \> 50+ agents in our portfolio

Portfolio maturity note: \> Portfolio: about 30% in production, about
50% developed or in pilot, about 20% still to be developed.

### Supplier invoice agent builder

Title: \> Sub-agents / Supplier invoice agent

State: \> Draft · 7 sub-agents

1.  **Data ingestion** --- Choose the source: file repository, database
    or email.
2.  **Extraction** --- Map fields from Excel and PDF templates.
3.  **Rule builder** --- Define reconciliation and validation logic.
4.  **Validation** --- Apply the rules to calculate fees.
5.  **Workflow** --- Set approval and review statuses.
6.  **Dashboard** --- Set up tracking and status views.
7.  **Output** --- Generate invoices and upload them to the ERP.

Run result: \> Reconciliation agent run

Outcome: \> 38 lines flagged for review, evidence attached

Persona: \> Sam Whitaker, Accounts payable supervisor, reviews and
approves a reconciliation agent's run.

Action: \> Approve run

Control: \> Pause the scene loop

------------------------------------------------------------------------

# 5. Section 03 --- Engineering

**Eyebrow**\
03 · Engineering

**Heading**\
How it works under the hood

**Intro**\
Six pieces, in the order a document meets them.

## 01 --- Pipeline

**Heading**\
Hubs, agents and sub-agents

**Copy**\
A hub groups related agents. Each agent does one business task, and
every agent runs the same four sub-agents in order. The result can go to
a dashboard, a report, an export file or your ERP.

## 02 --- Document processing

**Heading**\
Configured, not hard-coded

**Copy**\
You describe the document once. For a spreadsheet that means its sheets,
header row and typed columns, each with its own instructions. For a PDF
it means key phrases, a document category and an extraction mode, with
data that repeats across adjacent pages merged into one record.

### Spreadsheet configuration example

-   sheet: Finance
-   header_row: 0

  Column   Label            Type
  -------- ---------------- ------------
  Inv No   Invoice number   alphabetic
  Date     Invoice date     date
  Total    Amount           numeric
  Tax      Rate             percentage

### PDF configuration example

-   key_phrases: Invoice No., PO No.
-   category: Invoice

Extraction modes: - Whole document - Page by page - Fixed layout,
variable pages

-   merge_adjacent: true

## 03 --- Business rules

**Heading**\
Rule sets in four types

**Copy**\
A rule is a calculation, a validation, a transformation or an
assignment, and rules are grouped into named rule sets. Describe the
rule in plain language and the platform drafts it. A person reviews the
draft before it is saved.

Prompt: \> Calculate GST at 18% on the invoice total

Draft state: \> Draft --- review before saving

Example rule:

``` yaml
rule_set: Invoice checks
type: Calculation
output: gst_amount

gst_amount = invoice_total * 0.18
```

## 04 --- Access

**Heading**\
Roles and visibility tiers

**Copy**\
Roles carry named permissions. A case is general, protected, or
restricted to one owner, and only the current holder of a case can act
on it. An administrator override exists, but only as an explicit
permission you grant, and it never reaches a restricted case.

CTA: \> Try the roles in Governance

  Tier         Who can see it                      Who can act
  ------------ ----------------------------------- --------------------
  General      Everyone in the organisation        The current holder
  Protected    Roles cleared for protected cases   The current holder
  Restricted   One owner                           That owner only

Note: \> Administrator override: an explicit permission, not available
on restricted cases.

## 05 --- Delegation

**Heading**\
Tasks without handing over the case

**Copy**\
The holder delegates tasks and keeps the case. Each task has a deadline
that cannot pass the case deadline, and moves from open to completed,
with send-back and resubmission in between. A case cannot close while a
task is still open.

## 06 --- Audit and notifications

**Heading**\
A log nobody can edit

**Copy**\
Every action is written to a read-only activity log with the actor and a
timestamp. It cannot be edited or deleted. Watchers are told about each
change in the app and by email, and they cannot act on the case.

Sample activity log: - 09:14:02 --- case.created by creator - 09:20:41
--- case.forwarded by creator - 10:02:09 --- task.delegated by holder -
11:47:30 --- task.sent_back by holder - 13:05:18 --- task.completed by
holder

Note: \> Watchers are notified in the app and by email, but cannot act
on the case.

------------------------------------------------------------------------

# 6. Section 04 --- Industries

**Eyebrow**\
04 · Industries

**Heading**\
Built for regulated, document-heavy sectors

**Intro**\
The same platform, with agents built for each sector. Examples from our
agent portfolio.

Industry selectors: - Financial services and lending - Superannuation
and finance - Media and publishing - Government and public sector -
Defence - Metals and manufacturing

## Financial services and lending

**Intro**\
Faster, better-documented credit decisions without adding headcount.

Process: 1. Intake 2. Extract 3. Check 4. Approve

Platform: \> Runs on AI Workspace · Agent Hub

Use cases: - **Mortgage application automation** --- Reads application
packs and checks them against lending policy. - **AI underwriting** ---
Assembles the evidence an underwriter needs into one view. - **KYC
intelligence** --- Extracts and verifies identity and entity details. -
**Credit memo generation** --- Drafts the credit memo from verified data
for review.

## Superannuation and finance

**Intro**\
Clean payables and reconciliations, with an audit trail for every
exception.

Process: 1. Intake 2. Extract 3. Check 4. Approve

Platform: \> Runs on AI Workspace · Agent Hub

Use cases: - **Invoice processing and 3-way match** --- Matches invoices
to purchase orders and goods receipts. - **E-batch and payment
reconciliation** --- Reconciles payment batches against bank records. -
**Fund analysis** --- Summarises fund data for investment and board
reporting. - **Bank-ERP reconciliation** --- Matches bank records to the
ledger and flags the differences for review.

## Media and publishing

**Intro**\
More output from the same newsroom, with checks before anything is
published.

Process: 1. Ask 2. Access 3. Retrieve 4. Cite

Platform: \> Runs on AI Workspace · Core

Use cases: - **Topic summary and insight** --- Condenses coverage and
research into a briefing. - **Fact check** --- Flags claims that need a
source before publication. - **AI audio** --- Turns written stories into
audio versions. - **Topic and article search** --- Finds related
coverage across the archive.

## Government and public sector

**Intro**\
Answers from policy and data, with access controls that match the
classification.

Process: 1. Ask 2. Retrieve 3. Act 4. Review

Platform: \> Runs on AI Workspace · Core and Agent Hub

Use cases: - **Generative search and policy questions** --- Answers
policy questions with citations to the source. - **Financial analysis**
--- Analyses budget and expenditure data on request. - **Geospatial
analysis** --- Brings location data into reports and decisions. -
**Secure knowledge discovery** --- Searches restricted archives within
each user's clearance.

## Defence

**Intro**\
Knowledge discovery for classified environments, deployed on your own
infrastructure.

Process: 1. Ask 2. Access 3. Retrieve 4. Cite

Platform: \> Runs on AI Workspace · Core

Use cases: - **Secure knowledge discovery** --- Finds what personnel
need within their clearance. - **Classified document questions** ---
Answers questions on restricted documents, with citations. -
**Access-controlled search** --- Search that enforces need-to-know on
every result. - **SOP and doctrine management** --- Keeps procedures
current, versioned and searchable.

## Metals and manufacturing

**Intro**\
Less paperwork between the plant floor and the finance team.

Process: 1. Intake 2. Extract 3. Check 4. Approve

Platform: \> Runs on AI Workspace · Agent Hub

Use cases: - **Vendor invoice processing** --- Captures and validates
vendor invoices for posting. - **EHS injury and incident analysis** ---
Finds patterns in safety reports to prevent repeats. - **Data migration
reconciliation** --- Checks migrated records against the source
system. - **Invoice and PO 2-way matching** --- Matches vendor invoices
to purchase orders and routes mismatches to the right person.

------------------------------------------------------------------------

# 7. Role-Based Platform Selector

**Heading**\
Who are you?

**Intro**\
Pick your role. The modules and agents set up for it light up, and the
rest stay off. Start with what you need, add more later.

**Prompt**\
Choose one

Roles: - Finance manager - Legal and contracts lead - Procurement and
tenders lead - Compliance and KYC officer - Operations head - Credit
analyst

CTA: \> Your team, your workflow --- Tell us your function and we'll
show the fit

### Example: Finance manager

Status: \> Set up for Finance manager: 6 of 12 modules

Modules: - Ask AI --- Included - Search --- Not needed - Notifications
--- Included - AI Drive --- Included - AI Dashboards --- Not needed -
Workflows --- Included - Contract Intelligence --- Not needed - App Hub
--- Not needed - Quote Management --- Not needed - Opportunity
Management --- Not needed - Dashboard --- Included - Agent Hub ---
Included

Agents: - InvoiceAI - Bank and ERP reconciliation - Budget variance
review

CTA: \> Book a demo with these modules

Supporting line: \> Start with what you need, add more later.

------------------------------------------------------------------------

# 8. Section 05 --- Customers and Case Studies

**Eyebrow**\
05 · Customers

**Heading**\
Customers and case studies

**Intro**\
Real deployments across lending, finance and media, with the results
each one delivered.

**Important:** The figures and outcomes below are copied from the
current ZeonAI preview. Confirm permission, customer approval,
definitions, and evidence for each statistic before publishing them as
public claims.

## Case study 01 --- Mortgage application automation

Sector: \> Lending

Headline metric: \> 70%+ reduction in manual effort on loan application
forms

Context: \> Multi-page loan application forms, 30,000+ documents a
month, 10,000+ users onboarded

Supporting metrics: - 30,000+ documents a month - 10,000+ users
onboarded - 70% cut in processing time

Products: - DocAI - AI Workspace · Agent Hub

Customer description: \> Australian credit asset management firm

### The challenge

Multi-page loan application forms took extensive manual effort to
extract and validate, which led to inefficiencies and potential errors.

### What we deployed

DocAI on Agent Hub reads each form, with a validation screen for quick
checks and corrections, connected to the firm's financial systems.

### The outcome

Staff moved to strategic work. AI-driven validation ensures near-zero
data errors and processing time fell by 70%, so loan approvals arrive
sooner.

## Case study 02 --- Billing agent

Sector: \> Lending

Headline metric: \> 80% reduction in manual processing of partner
billing

Context: \> Monthly partner fee calculations, 8,000+ documents a month

Supporting metrics: - 8,000+ documents a month - 99%+ accuracy - 60%
faster partner payments

Products: - InvoiceAI - AI Workspace · Agent Hub

Customer description: \> Lending bank in the US

### The challenge

Monthly partner fee calculations across several fee types were done by
hand with SQL queries and Excel templates.

### What we deployed

InvoiceAI on Agent Hub extracts partner agreements, calculates the fee
structures and posts invoices through an ERP integration, with a
validation screen for quick checks.

### The outcome

Billing disputes fall away with 99%+ accuracy, partners are paid 60%
faster, and automated audit trails reduce compliance risk.

## Case study 03 --- Financial operations intelligence

Sector: \> Superannuation and finance

Headline metric: \> 80--85% reduction in daily receipting time

Context: \> Daily bank statement receipting, 5,000+ documents a month

Supporting metrics: - 5,000+ documents a month - 99%+ matching
accuracy - Exceptions reviewed by people

Product: \> Reconciliation agent · AI Workspace · Agent Hub

Customer description: \> Leading superannuation fund

### The challenge

Receipting meant identifying employer deposits on daily bank statements
by hand and preparing batches in spreadsheets, passed between receipting
officers by email.

### What we deployed

A reconciliation agent on Agent Hub reads bank statement narratives,
matches deposits to employer accounts and generates the batch files in
real time. Exceptions and duplicates go to a person.

### The outcome

Staff review only the exceptions. Fund allocation is faster, operational
risk is lower, and human review keeps compliance in place.

## Case study 04 --- AI Workspace for content intelligence

Sector: \> Media

Headline metric: \> 20--28% lower operating cost

Context: \> High-volume text and audio content, 5,000+ documents a month

Supporting metrics: - Errors down from 20% to under 1% - 5x more
customers served - No added headcount

Products: - AI Workspace - DocAI

Customer description: \> Leading Australian media agency

### The challenge

Manual processes could not synthesise large volumes of content, leaving
information gaps and outdated reports. Keyword search missed context,
and manual summaries were costly and subjective.

### What we deployed

AI Workspace turns text and audio into real-time summaries, with
semantic search, consistent sentiment analysis and archive queries.

### The outcome

Operating costs fell by 20--28% and error rates from 20% to under 1%.
The same team now serves 5x more customers without more headcount.

Interaction: \> Pause automatic slides

------------------------------------------------------------------------

# 9. Section 06 --- Governance and Trust

**Eyebrow**\
06 · Governance

**Heading**\
Governed by design, not added afterwards

**Intro**\
Access control, human review and an audit log are built into every part
of AI Workspace, from the first search to the record posted in your ERP.

## Audit trail demo

Location: \> AI Workspace / Admin / Audit trail

Status: \> Sample data

Label: \> audit-trail

Timestamp context: \> today, read only

Events: 1. 09:14:02 · finance.manager --- Asked about capital spend
approvals. 2. 09:14:02 · access.check --- Role and sensitivity rules
applied. 3. 09:14:03 · retrieval --- 2 documents withheld: outside
access. 4. 09:14:04 · answer --- Answered with 2 cited sources. 5.
09:16:40 · finance.manager --- Exported the cited answer.

## Access you control

Steps: 1. **Admin defines roles** --- Set up the roles your teams need,
once. 2. **Roles map to modules** --- Each role gets only the modules it
needs. 3. **People see only what their role allows** --- Access is
checked before anything is retrieved.

Interactive role preview: - View as: Finance / Executive

Finance permissions shown: - Can open: Agent Hub - Can open: Workflows -
Can open: Dashboard - Can open: AI Drive - Can open: Ask AI - No access:
AI Dashboards - No access: Notifications - No access: Search - No
access: Contract Intelligence

Summary: \> Finance sees 5 of 9 modules.

Disclaimer: \> Roles shown are examples, not customer data.

## Enterprise-grade security and compliance

**Intro**\
Upholding strict data security and privacy standards is at the core of
everything we do.

Trust labels in current preview: - SOC 2 --- Compliance - ISO 27001 ---
Information security management - GDPR --- GDPR-ready systems

Other listed capabilities: - **Role-based access** --- Granular
permission controls ensure users only access what they need. Access is
checked before anything is retrieved. - **Encryption** --- End-to-end
encryption for data at rest and in transit. - **Two-factor
authentication and audit logs** --- Two-factor authentication and
comprehensive audit trails. - **Legal archiving** --- Compliant data
retention and GDPR-ready systems. - **Disaster recovery** --- Robust
backup systems and business continuity planning. - **Deployment on your
terms** --- On-premises or private cloud deployment with full data and
model sovereignty.

## Governed AI

> Answers are drawn only from the documents and repositories the person
> can already open, and each one cites its sources. Check an output
> against the source before you act on it.

## Deployment options

-   On-premises
-   Private cloud
-   AWS
-   GCP
-   Azure

**Trust-content verification note:** Confirm certification status,
encryption implementation, two-factor authentication, archiving,
disaster recovery, data sovereignty, and supported deployment
environments with the product/security owner before making these claims
public.

------------------------------------------------------------------------

# 10. Book a Demo

**Heading**\
Book a demo

**Intro**\
See AI Workspace on a workflow that matters to you. Tell us a little
about your team and we will arrange a time.

## What happens next

1.  **A conversation about your process** --- We start with the workflow
    or knowledge problem that costs you most.
2.  **The platform on a relevant workflow** --- We show AI Workspace on
    a scenario from your sector, or on a sample of your documents if you
    share one.
3.  **Deployment and governance answers** --- Cloud, private cloud or
    on-premises, and how role-based access, review and audit work in
    your environment.

## Your details

Form helper: \> All fields are required unless marked optional.

Fields: - Name - Work email - Company - Role (optional) - Your role or
team (optional)

Interested in: - AI Workspace - Agent Hub - Both

Optional: - Message

Honeypot field label: \> Leave this field empty

Consent: \> I agree that ZeonAI Labs may contact me about this request.
See the privacy policy.

Submit button: \> Book a demo

### Current error states

> We could not send your request.

> Email us at contact@zeonai.com and we will reply directly.

Fallback: \> This form needs JavaScript. Email us at contact@zeonai.com
instead.

### Success state

Heading: \> Thanks, your demo request is in.

Body: \> We will reply to the email address you gave us to arrange a
time.

Current staging warning: \> Staging build: no form endpoint is
configured, so nothing was sent or stored.

**Implementation requirement:** Do not show the success state unless the
form has actually been accepted by a connected endpoint. Wire the form
to a real approved backend or email service, add server-side validation
and spam protection, and show honest success/error feedback. If no
endpoint is available, use the fallback email route and do not claim
that the request was stored.

------------------------------------------------------------------------

# 11. Footer

**Short brand statement** \> Governed AI for enterprise knowledge and
workflows.

**Product statement** \> AI Workspace, the enterprise AI platform.

**Email** \> contact@zeonai.com

**Contact link** \> Talk to our team (contact@zeonai.com)

Navigation: - Platform - Industries - Customers - Trust - Book a demo

Office locations: - **India** --- Neeladri Vihar, Chandrasekharpur,
Bhubaneswar, Odisha 751021 - **United Arab Emirates** --- Meydan
Grandstand area, Dubai - **Canada** --- 180 Howden Blvd, Brampton, ON
L6S 0E6

Copyright: \> © 2026 ZeonAI Labs Private Ltd. All Rights Reserved

Footer links: - contact@zeonai.com - LinkedIn - X - Facebook - Privacy
policy - Terms

------------------------------------------------------------------------

# 12. Manifest AI --- What to Learn From the Reference

Use these as **structure and presentation lessons**, not as text to
copy.

The Manifest AI homepage currently organizes its story around: 1. A
clear enterprise AI promise and primary conversion action. 2. A
layer-by-layer platform explanation. 3. Product capabilities and agent
workflows. 4. Industry-specific workspaces. 5. Integration ecosystem. 6.
A simple engagement process. 7. Case studies and measurable outcomes. 8.
Customer proof. 9. Trust, security, and deployment. 10. A final
proof-of-value/demo CTA.

For ZeonAI, adapt that order to the existing content and terminology: -
Hero - Interactive AI Workspace product tour - Six-layer architecture -
Platform capabilities - Engineering details - Industry use cases -
Role-based module selector - Customer stories - Governance and trust -
Demo form - Footer

Do not use Manifest AI's: - Brand name or aOS terminology. - Headlines
or body copy. - Customer testimonials. - Case-study figures or
performance claims. - Certifications or security claims. - Logos or
screenshots. - Proprietary artwork or page assets.

Use ZeonAI's own platform names, examples, content, brand palette, and
verified proof.

------------------------------------------------------------------------

# 13. Content and Product Consistency Checks

Before shipping, review these points with the ZeonAI team:

1.  **Product naming:** Confirm whether the main platform is
    consistently called "AI Workspace" and whether "ZeonAI platform" is
    a label rather than a separate product.
2.  **Agent portfolio:** The site says "50+ agents" while the portfolio
    list is much longer than the small set shown in the interactive
    marquee. Confirm what is counted and what is available.
3.  **Portfolio maturity:** Confirm the 30% production / 50% developed
    or pilot / 20% planned split.
4.  **Coming soon features:** Confirm whether Grant Acquittal and DA
    Document Assessment should remain labelled "Coming soon."
5.  **Customer metrics:** Confirm every statistic and obtain approval to
    publish the anonymous case studies.
6.  **Compliance claims:** Verify SOC 2, ISO 27001, GDPR-related
    wording, encryption, two-factor authentication, archiving, disaster
    recovery, and deployment claims.
7.  **Deployment support:** Confirm which of AWS, GCP, Azure, private
    cloud, and on-premises are available today.
8.  **Integrations:** The current hero copy mentions SharePoint, ERP,
    and email in demo UI. Confirm the actual supported connectors and
    avoid implying every connector is generally available.
9.  **Demo form:** The current preview explicitly says no form endpoint
    is configured. Connect it before launch or retain an honest email
    fallback.
10. **Contact details and office addresses:** Verify all contact details
    and addresses.
11. **Privacy and terms:** Ensure Privacy policy and Terms routes exist
    and contain approved legal content.
12. **Accessibility:** Check keyboard operation, focus visibility, form
    labels/errors, contrast, responsive reflow, reduced motion, and
    pause controls.

------------------------------------------------------------------------

# 14. Final Cursor Task

Implement the complete ZeonAI marketing website using the existing
repository and this copy inventory.

-   Audit the code and report the current framework, routes, components,
    assets, and incomplete sections before making destructive changes.
-   Preserve the six architecture layers and the exact product
    terminology.
-   Complete all sections in the order listed above, using responsive
    layouts.
-   Use the ZeonAI palette and the editorial/cinematic direction
    described at the top.
-   Build the product tour, capability selector, architecture
    interactions, industry selector, role-based module selector,
    case-study presentation, governance preview, and demo form as
    functional UI.
-   Keep the visuals premium and restrained. Prefer realistic product
    screens, data tables, document excerpts, workflow diagrams, and
    clean typography over abstract AI illustrations.
-   Reuse existing assets if they fit. Do not invent customer logos or
    create fake certification badges.
-   Use sample UI data only where explicitly labelled as sample/demo
    content.
-   Do not add unverified claims or copy competitor wording.
-   Add responsive behavior, accessibility states, reduced-motion
    handling, and clear interaction feedback.
-   Connect the demo form to a real endpoint only if
    credentials/configuration are already provided. Otherwise keep the
    fallback and do not simulate a successful submission.
-   After implementation, check all navigation, CTA links, form states,
    responsive breakpoints, console errors, and build/lint output.
-   Report what was completed, what remains blocked, and which claims
    require business verification.

**Definition of done:** Every listed website section exists, the copy is
mapped correctly, all visible controls have meaningful behavior, the
design is responsive and accessible, the form is honest about its
status, and no unsupported claims or competitor copy have been
introduced.
