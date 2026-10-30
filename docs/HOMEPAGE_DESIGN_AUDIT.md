# HOMEPAGE_DESIGN_AUDIT

**Status:** Phase Two complete — approved refinements implemented (2026-10-30).  
**Scope:** Homepage (`V7HomePage` and its sections) only.  
**Skills consulted:** Taste skill (local + run notes), Emil Kowalski design-eng / animate / apple-design principles, Hallmark floor (anti-slop, show-don’t-describe, no invented proof), UI/UX Pro Max / Impeccable guidance via available READMEs. Secondary-page redesigns are out of scope for implementation until homepage plan is approved.

---

## 1. Executive assessment

### Strengths
The homepage already has a **clear product story** and several sections that feel specific to ZeonAI rather than template SaaS: the **GLSL hills hero**, the **Feature108 product tour** with real screen compositions, the **scroll-pinned architecture**, the **engineering particle globe + threads**, the **role configurator**, and the **trust access/audit interactive**. Typography (Aeonik) and the black / cream / white / blue language are coherent enough to protect.

### Weaknesses
The page’s middle band (logo ticker → industries → quote marquee) is the weakest stretch: **generic trust copy**, **identical industry cards**, and a **metrics marquee** that mixes case-study figures with product slogans in a template “dark ticker” pattern. **FadeUp is applied almost everywhere**, so entrances feel habitual rather than authored. Surface treatment drifted after earlier polish (glass blur on ordinary industry cards). The **security section** is editorial but visually quiet compared to the denser product/engineering blocks above it, and **certification TODOs** sit in live UI.

### Highest-impact improvements (3–5)
1. **Tighten LogoTicker + QuoteMarquee** — quieter trust strip; stop slogan-as-headline; make outcome cards feel editorial, not stock dark SaaS.
2. **Differentiate Industries** — break identical card grid; one focal industry + quieter companions (or asymmetric rows), reduce pill chip clutter and glass blur.
3. **Choreograph FadeUp** — fewer scroll fades; shorter durations on repeated content; keep strong motion for Architecture / Engineering / Role.
4. **Hero readability polish** — keep GLSL hills and composition; improve type contrast, body measure, and reduced-motion / performance path for WebGL.
5. **Security / Trust closing rhythm** — align surface language with Trust interactive; demote unverified certification labels visually until confirmed.

---

## 2. Elements to preserve

| Element | Why protect |
| --- | --- |
| Section order (Hero → Logos → Industries → Quotes → Platform tour → Architecture → Engineering → Role → Customers → Trust → Security → Demo → Footer) | Narrative already maps problem → product → proof → governance → convert |
| Hero GLSL hills + centered Aeonik headline + single CTA | Distinctive, memorable, on-brand; not generic purple orb AI |
| Feature108 + `platform-screens` product tour | Highest-credibility “show the product” moment |
| Architecture pin + diagram + demos | Specific technical storytelling |
| Engineering globe + labeled threads | Signature visual; already art-directed |
| Role configurator dark workbench | Interactive, role-specific, product-led |
| Trust section role toggle + audit list | Explains governance without fake cert badges |
| Case-study bento (black / royal checkerboard) | Strong editorial rhythm; keep concept |
| Final CTA particle video + honest form error | Conversion block with distinctive visual and integrity |
| Nav glass mega-menu + soft press buttons | Already refined; avoid homepage-only regressions via shared chrome |

---

## 3. Section-by-section audit

| Section | Current strengths | Issues found | Proposed improvements | Scope | Risk | Expected benefit |
| --- | --- | --- | --- | --- | --- | --- |
| **SiteHeader** | Clear IA; glass chrome; keyboard mega-menu | Shared with secondary pages — any change leaks; underline accent can feel “SaaS default”; floating bar + mega z-index historically fragile | Keep behavior. Minor: slightly stronger focus rings, ensure mega panel contrast; **no structural redesign** | Minor | Medium (shared) | Polish without identity change |
| **Hero** | Unique WebGL field; calm centered type; one CTA | Body copy dense for first viewport; `#292929` vs pure black slightly muddy; WebGL always-on cost; entrance 0.75s + stagger may feel slow; no secondary link to `#platform` despite content suggesting “see platform” | Soften body to ~2 sentences or better measure; optional `#platform` ghost link; pause/simplify hills on `prefers-reduced-motion` / low power; keep hills concept | Moderate | Low–Med | Clearer first read + better performance |
| **LogoTicker** | Real brand marks (when licensed/approved) | Headline “Trusted by Leading Organizations Worldwide” is generic AI-slop; trailing “Faster, Easier, Accurate and Efficient” is slogan noise; marquee cells are empty white boxes with little hierarchy; no pause on hover for a11y | Replace headlines with quieter Zeon-specific line (or remove second line); unify mark optical sizing; pause marquee on hover/focus; optional static grid on reduced-motion | Moderate | Low | Instantly less “template trust strip” |
| **Industries** | Solid content from brief; links work | Six near-identical rounded cards; glass/blur on ordinary cards; pill use-case chips feel badge-slop; low visual differentiation vs secondary industry pages | Keep section. Compose as **1 featured + grid** or alternating density; solid cream/white surfaces (drop blur); fewer chips (1–2) or text list; stronger focal industry visual optional | Moderate | Low | More intentional, less card farm |
| **QuoteMarquee** | Dark band creates rhythm; case metrics from brief | Auto-scrolling metrics feel stock; last two “quotes” are product slogans, not outcomes — dilutes proof; border+dark cards repeat; no way to read calmly | Split: true outcome cards only; move slogans out; slower marquee or snap carousel with pause; ensure disclaimer for preview metrics stays visible | Moderate | Low | Stronger proof signal |
| **FeatureBentos / Platform tour** | Best product storytelling; autoplay with pause | Caption + CTA row can feel secondary to the shell; Lucide tab icons are generic; badge labels slightly chippy | Keep screens. Refine tab typography/weight; quieter badges; ensure CTA uses shared button language; don’t redesign tour | Minor | Low | Slightly more crafted chrome around strong core |
| **Architecture** | Pin scroll + demos are distinctive | Centered heading block repeats homepage pattern; pin height can feel long; mobile falls back to static (OK) but denser | Keep pin. Tighten heading measure; ensure layer transitions feel interruptible; small spacing polish only | Minor | Med (scroll sync) | Smoother read of strong concept |
| **Engineering** | Globe + threads are signature | Glass label chips + dark field are heavy after Architecture dark; CTA “Read more” competes with density | Keep globe. Soften label surfaces slightly; ensure thread contrast; leave interaction logic alone | Minor | Med | Continuity without losing signature |
| **RoleConfigurator** | Interactive, useful, dark product UI | Dense after Engineering (two dark technical blocks in a row); Lucide role icons generic | Keep. Slightly more air in header; consider a one-line bridge from Engineering; don’t rebuild | Minor | Low | Breathing room |
| **CustomerStories** | Bento + case visuals work | Hover lift on every card is a bit “polish kit”; royal/black checkerboard strong but metric emphasis needs confirmation note nearby | Keep layout. Soften hover; ensure confirmation disclaimer for preview figures near section | Minor | Low | Editorial calm |
| **TrustSection** | Interactive access story is excellent | Dark module after customers light → trust dark is fine; internal chrome dense | Keep concept. Micro spacing / type consistency with Role workbench | Minor | Low | Consistency |
| **SecurityCompliance** | Editorial “report” frame is a good idea | Feels like a quieter appendix after richer Trust UI; large unverified cert names dominate; grey `#F7F7F7` band less connected to cream/ink system | Demote unverified labels; align background to cream or paper; tighten “governed AI” paragraph hierarchy; keep editorial frame | Moderate | Low | Closing trust without fake authority |
| **FinalCta** | Distinctive particle video; honest form | Form already polished; long page before CTA; sculpture may dominate mobile | Keep. Mobile: ensure form before heavy video if needed (order already considered); don’t rewrite form | Minor | Low | Conversion clarity |
| **SiteFooter** | Dense, useful | Standard dark footer; fine | Leave unless shared polish with header | Minor | Low | — |
| **Global motion (`FadeUp`)** | Shared token system exists | Nearly every block fades up ~0.75s → page feels “animated by default” | Raise the bar: animate only section headers + key visuals; content visible by default more often | Moderate | Low | More premium, less AI-demo |

---

## 4. Anti-AI-slop findings

| Finding | Location | Recommendation | Why |
| --- | --- | --- | --- |
| Generic trust headline + slogan pair | LogoTicker | **Replace / remove** second slogan; rewrite first line to something specific or quieter | Could sit on any AI site |
| Identical industry card farm + pill chips | Industries | **Refine** composition; cut chip density | Classic AI landing pattern |
| Glass / blur on ordinary white cards | Industries (`backdrop-blur-sm`) | **Remove** blur; solid surface | Glass without elevation purpose |
| Dark metric marquee mixing proof + slogans | QuoteMarquee | **Refine** content set; slow/pause motion | Stock “social proof ticker” |
| Repeated scroll fade-ins | Most sections | **Reduce** | Hallmark / Emil: animate less often |
| Lucide icons as primary product identity | Platform tabs, Role, Trust | **Keep but quiet** — don’t replace with fake custom icons unless real brand icons exist | Icons aren’t the problem; over-reliance is |
| Oversized unverified compliance names | Security | **Demote** until confirmed | Invented authority risk (Hallmark #8) |
| Continuous WebGL decoration | Hero | **Keep with performance gate** | Distinctive, but must not tax low-end devices blindly |
| Particle globe | Engineering | **Keep** | Specific, purposeful technical metaphor |
| Glow / purple blobs | — | Not a primary issue on this homepage | Don’t invent a problem |

---

## 5. Proposed visual refinements

### Typography
- Keep Aeonik. Do **not** swap the brand face.
- Hero body: target ~17–18px with max ~48–52ch; slightly higher contrast (`#111` / `#3a3a3a` rather than muddy mid-grey on busy WebGL).
- Section H2 scale is already strong (36→52); avoid further upsizing.
- LogoTicker H2 at 22–28px competing with section titles — demote to 15–16px label or single quieter sentence.

### Color & surfaces
- Preserve black / white / cream (`#F6F4EF`) / accent blue (`#356DFF` / `#245BDB`).
- Prefer **hard chapter edges** (light ↔ dark) over soft grey `#F7F7F7` islands where possible (Security).
- Industry cards: solid white or cream; 1px `#DCE1E0`; no backdrop blur.
- Avoid adding new accent colors.

### Spacing & composition
- Industries: break 3×2 sameness (featured row or 2+4).
- Quote band: taller calm cards OR fewer items on screen; less “conveyor belt.”
- After Engineering → Role: add ~8–16px more header breathing or a thin paper separator — no new section.

### Product visuals
- Protect Feature108 screens, Architecture demos, Engineering globe, Trust panels, Case visuals.
- Do not invent denser fake UI chrome.

### Animations
- `durationEnter` 0.75 → consider **0.5–0.55** for repeated FadeUps; or skip FadeUp on card grids.
- Marquees: respect `prefers-reduced-motion` (already partially handled); add **hover pause**.
- Keep Architecture pin and Engineering draws as the “delight budget.”

### Interactions
- Keep press scale on primary CTAs.
- Soften customer card hover lift (1px is fine; avoid stacking shadow + lift everywhere).

### Responsive
- Hero WebGL: ensure canvas doesn’t block tap targets (already `pointer-events-none`).
- Quote marquee width `min(540px, 80vw)` OK; verify reduced-motion static stack.
- Architecture mobile static path: verify copy remains readable without pin.

---

## 6. Before-and-after concepts (highest impact)

### A. LogoTicker
| | |
| --- | --- |
| **Now** | Centered marketing headlines + endless logo boxes + second slogan |
| **After** | One quiet line (e.g. “Selected organizations we work with”) or no headline; optically balanced marks; pause on hover; optional reduced-motion static wrap |
| **Recognizable** | Same brands, same strip position |

### B. Industries
| | |
| --- | --- |
| **Now** | Six equal frosted cards + three pills each |
| **After** | One wider featured industry + five compact rows/cards; solid surfaces; one use-case line each |
| **Recognizable** | Same six industries, same links, same section title |

### C. QuoteMarquee
| | |
| --- | --- |
| **Now** | Six scrolling dark cards including two non-outcome slogans |
| **After** | Four outcome cards only + visible confirmation note; slower or pauseable motion |
| **Recognizable** | Dark band between Industries and Platform still provides rhythm |

### D. Motion diet
| | |
| --- | --- |
| **Now** | Most blocks FadeUp similarly |
| **After** | Headers + signature visuals animate; grids often appear static or with one group fade |
| **Recognizable** | Page still feels alive via Architecture / Engineering / tour |

---

## 7. Implementation plan (post-approval only)

### Priority 1 — High impact, low risk
1. LogoTicker copy + marquee pause + mark sizing — `logo-ticker.tsx`, `globals.css` (marquee only if needed)
2. QuoteMarquee content filter + pause/a11y — `quote-marquee.tsx`
3. Industries surface/composition — `industries.tsx`
4. FadeUp usage diet on homepage sections — selective edits in listed components (not `fade-up.tsx` defaults if that would affect secondary pages — prefer local `y={0}` / remove wrappers on homepage)

### Priority 2 — Meaningful visual improvements
5. Hero type contrast + optional secondary link + reduced-motion WebGL gate — `hero.tsx`, possibly `glsl-hills.tsx`
6. Security section tone + demote unverified labels — `security-compliance-section.tsx`
7. Customer bento hover soft + disclaimer placement — `customer-stories-section.tsx`
8. Platform tab chrome quieting — `feature-bentos.tsx` / `shadcnblocks-com-feature108.tsx` (**shared with any Feature108 reuse — check**)

### Priority 3 — Optional polish
9. Architecture heading measure / spacing — `architecture-section.tsx` (careful with pin)
10. Engineering label surface soften — `engineering-section.tsx`
11. Role header air — `role-configurator.tsx`
12. Header focus/contrast micro — `site-header.tsx` (**shared — verify secondary pages**)

### Files likely affected
`logo-ticker.tsx`, `industries.tsx`, `quote-marquee.tsx`, `hero.tsx`, `glsl-hills.tsx`, `security-compliance-section.tsx`, `customer-stories-section.tsx`, `feature-bentos.tsx` / `shadcnblocks-com-feature108.tsx`, optionally `architecture-section.tsx`, `engineering-section.tsx`, `role-configurator.tsx`, `site-header.tsx`.

**Avoid unless approved:** rewriting `home-page.tsx` section order; replacing GLSL hills; replacing Engineering globe; changing FinalCta form honesty; new animation libraries (GSAP/Matter/Three extras).

---

## 8. Risk and regression plan

| Risk | Mitigation |
| --- | --- |
| Shared Feature108 / header changes leak to other routes | Diff each shared file; visual check `/platform` and one industry page |
| Architecture pin breakage | Touch spacing/copy only; re-test desktop Lenis pin + mobile fallback |
| WebGL reduced-motion changes blank hero | Static poster / last frame / CSS fallback field |
| Marquee a11y | Pause on hover/focus; reduced-motion → static |
| Copy changes sounding like new claims | Only remove/relabel; no new metrics or logos |
| Secondary pages regression | Don’t change `page-shell` / secondary kit in this pass |

**Test checklist (after approval):** desktop 1440 & 1280, tablet, mobile; keyboard nav; reduced-motion; console errors; `npm run typecheck` + `npm run build`; spot-check `/`, `/platform`, `/trust`.

---

## 9. Final recommendation

### Direction
Keep the homepage’s **product-and-systems narrative** and its **signature technical visuals**. Spend the polish budget on the **generic middle band** (logos, industries, quotes), a **motion diet**, and **closing trust honesty** — not on inventing a new hero or new sections.

### Needs your approval

**Essential (recommended)**
- [ ] LogoTicker: remove/replace generic headlines; pause marquee
- [ ] QuoteMarquee: outcomes-only; pause/slow; keep metric confirmation
- [ ] Industries: break identical card grid; remove unnecessary glass
- [ ] Reduce habitual FadeUp on homepage grids
- [ ] Security: demote unverified certification emphasis

**High value**
- [ ] Hero readability + reduced-motion/performance gate for GLSL hills
- [ ] Soften customer-card hover; keep bento concept
- [ ] Quiet Feature108 badges/tabs (if shared impact acceptable)

**Subjective / optional**
- [ ] Architecture / Engineering / Role micro spacing only
- [ ] Shared header focus tweaks

**Not recommended**
- New section order or new homepage sections
- Replacing GLSL hills, Engineering globe, or Feature108 screens
- New motion libraries
- New brand palette or font family

---

**STOP — awaiting approval before any implementation.**
