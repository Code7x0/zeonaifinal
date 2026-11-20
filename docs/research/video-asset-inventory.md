# ZeonAI video asset inventory

Source of truth for placements: **ZeonAI Website — Video Placement Brief**.  
Runtime registry: `src/components/sites/v7labs/video/registry.ts`.

## Product films in repo (`public/sites/v7labs/video/`)

| File | Topic | Wired to |
|------|-------|----------|
| `deepprobe-knowledge.mp4` | Knowledge box / Ask AI | home-hero, ask-ai + ai-drive tabs, ask-ai + ai-drive capabilities, product AI Workspace |
| `invoice-to-bill.mp4` | Invoice → bill agentic | workflows tab, workflows capability, InvoiceAI product, partner-billing case |
| `financial-close.mp4` | Financial close / CFO | dashboards tab + capability, CashfloAI product, financial industry |
| `agent-bricks.mp4` | Agent Bricks | agent-hub tab + capability /agents |
| `hypercare-agent.mp4` | Hypercare agent | contracts tab, app-hub capability, DocAI product |
| `about-founder.mp4` | About atmosphere | about-founder |
| `demo-expectations.mp4` | Demo preview | demo-expectations |

Playback: muted autoplay loops when in view (`ProductVideo` `preferAutoplay`).

## Still missing (brief slots without film)

- Technology loops: `tech-rerun`, `tech-dashboard-calc`, `tech-rule-builder` (page keeps mock windows)
- Remaining industries: super, media, gov, defence, metals
- Remaining cases: mortgage, bank-statement, media
- Remaining capabilities: contracts, opportunity, quotes

## How to publish another recording

1. Place file at `public/sites/v7labs/video/<name>.mp4`
2. Point the slot in `registry.ts` at that path with `status: "ready"`
