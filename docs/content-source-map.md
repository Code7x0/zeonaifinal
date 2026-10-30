# ZeonAI content source map (internal)

Primary SoT: `docs/ZeonAI_Complete_Website_Copy_and_Cursor_Brief.md`  
IA / mega-menu pattern: Manifest AI — structure & interaction only  
Implementation SoT: this repository

## Navigation hierarchy (desktop mega-menu)

**Product** — `/platform`, `/products`, `/agents`, `/agent-library`, `/architecture`, `/integrations`, `/engineering`  
**Industries** — `/industries` + 6 sector detail routes  
**Company** — `/about`, `/how-we-work`, `/case-studies` → `/customers`, `/contact`, `/demo`  
**Trust** — `/trust`, `/security`, `/responsible-ai`, `/deployment`, `/privacy-policy`, `/terms`  
**CTA** — Book a demo → `/demo`

## Route → source

| Route | Source | Notes |
| --- | --- | --- |
| `/` | Brief §§2–10 | Homepage preserved |
| `/platform` | Brief §§2–4 | Overview |
| `/platform/[capability]` | Brief §4 | 9 capabilities |
| `/products` | Brief §4 | Capability index |
| `/agents` | Brief Agent Hub | Reuses capability detail |
| `/agent-library` | Brief agent portfolio | Maturity caveat shown |
| `/architecture` | Brief §3 | Six layers intact |
| `/integrations` | Brief integrations list | Scoped per engagement |
| `/engineering` | Brief §5 | Existing interactive page |
| `/industries/*` | Brief §6 | Six industries only |
| `/customers/*` | Brief §8 | Four cases; metrics TBD |
| `/case-studies` | Redirect | → `/customers` |
| `/about` | Brief + Manifest consulting arm stated carefully | |
| `/how-we-work` | Brief process steps | Not a timeline guarantee |
| `/contact` | contact@zeonai.com + `/demo` | |
| `/demo` | Brief §10 | No fake success |
| `/trust` | Brief §9 | Interactive demos reused |
| `/security` | Brief trust items/labels | Certs TBD |
| `/responsible-ai` | Brief governance behaviours | Not Manifest red-lines |
| `/deployment` | Brief deployments list | Confirm per deal |
| `/privacy*`, `/terms` | Interim legal | Needs counsel |

## Still requires client confirmation

- Case-study statistics
- SOC 2 / ISO / GDPR public claims
- Encryption, 2FA, archiving, DR, sovereignty
- Integration & deployment availability
- Approved Privacy / Terms
- Demo form backend
