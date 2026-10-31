# Route audit — non-homepage premium redesign

## Homepage (out of scope)

| Route | Status |
| --- | --- |
| `/` | **Do not redesign** — approved |

## In-scope gaps vs master brief

| Brief page | Current route | Weakness | Plan |
| --- | --- | --- | --- |
| DeepDelve DocumentAI | Missing (href `#docai`) | No dedicated page | Add `/products/docai` |
| DeepDelve InvoiceAI | Missing (href `#invoiceai`) | No dedicated page | Add `/products/invoiceai` |
| DeepDelve CashfloAI | Missing (href `#cashfloai`) | No dedicated page | Add `/products/cashfloai` |
| DeepProbe | Missing (href `#deepprobe`) | No dedicated page | Add `/products/deepprobe` first (system) |
| Blog / Resources | Missing | No editorial index | Add `/resources` with honest empty/index from available content |
| Request a Demo | `/demo` | Reuses homepage `FinalCta` video band | Dedicated conversion layout |
| Contact Us | `/contact` | Thin + side mock | Simple trustworthy contact |

## Existing supporting routes (visual consistency)

`/platform`, `/products`, `/agents`, `/agent-library`, `/architecture`, `/integrations`, `/engineering`, `/industries`, `/industries/[slug]`, `/trust`, `/security`, `/responsible-ai`, `/deployment`, `/about`, `/how-we-work`, `/customers`, `/case-studies`, legal — keep white heroes; improve product index to surface DeepDelve family; no homepage regression.

## Implementation order

1. DeepProbe page + shared product UI primitives  
2. DocAI → InvoiceAI → CashfloAI  
3. Demo + Contact  
4. Resources  
5. Nav + `solutions` hrefs  
6. Browser QA + typecheck
