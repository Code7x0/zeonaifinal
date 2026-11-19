import { ProductVideo } from "../video";
import { IntegrationEcosystem } from "../integrations/integration-ecosystem";
import { MockWindow } from "./mock-window";
import { ModelRouterMock } from "./model-router-mock";
import { Dia, Keys, Nd } from "./diagram-bits";
import { TechIcons as I } from "./icons";

export function Pillars() {
  return (
    <>
      {/* 01 Runtime */}
      <section className="pillar" id="runtime">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">01 · Agent runtime</span>
            <h2>An agent runtime we wrote ourselves.</h2>
            <p className="lede">
              A loop-based agent core with graph execution: workflows branch, run
              in parallel and merge. Nothing in the loop is a black box we cannot
              open, fix or explain to your auditor.
            </p>
          </div>
          <div>
            <ProductVideo assetId="tech-rerun" tone="light" />
            <p className="mt-3 text-[13px] leading-[1.5] text-[var(--g-600)]">
              A reviewer changes a value at step 03; the run resumes from that
              step with the rest of the graph intact.
            </p>
          </div>
        </div>
        <div className="wrap">
          <Dia links="a>b,b>c,c>r1,c>r2,c>r3" label="Generate once · freeze · execute">
            <div className="fl">
              <Nd n="a" icon={I.spark} title="Model drafts the rule" sub="From plain language" />
              <Nd n="b" icon={I.eye} title="A person reviews it" sub="Before anything runs" />
              <Nd n="c" icon={I.lock} title="Frozen · v7" sub="Versioned and locked" variant="k" />
              <div className="stk">
                <Nd n="r1" title="Run 1" sub={<span className="pill ok">same result</span>} variant="sm" />
                <Nd n="r2" title="Run 2" sub={<span className="pill ok">same result</span>} variant="sm" />
                <Nd n="r3" title="Run 3" sub={<span className="pill ok">same result</span>} variant="sm" />
              </div>
            </div>
          </Dia>
          <Keys
            items={[
              { title: "Frozen logic", body: "Same input, same result." },
              { title: "Explainable values", body: "Assigned, calculated or assumed: always recorded." },
              { title: "Rerun from any step", body: "Fix one value, replay from there." },
              { title: "Skills that compound", body: "Learns from good runs. No retraining." },
            ]}
          />
        </div>
      </section>

      {/* 02 Retrieval */}
      <section className="pillar tint" id="retrieval">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">02 · Retrieval</span>
            <h2>Retrieval that reads the whole document first.</h2>
            <p className="lede">
              Most pipelines cut a document into passages and index each one alone.
              A line like “this reduced churn by 18%” then loses what “this” was. We
              index every passage with the document around it still in view.
            </p>
            <a
              className="more"
              href="https://zeonai.hashnode.dev/late-chunking-jina-v4-context-aware-embeddings-self-hosted-on-gcp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the engineering note <span>→</span>
            </a>
          </div>
          <MockWindow title="Index · Retention_review.pdf">
            <div className="cmp">
              <div>
                <div className="lbl">Indexed alone</div>
                <p>
                  “<mark>This</mark> reduced churn by 18% in the second half.”
                </p>
                <p style={{ marginTop: 10, color: "var(--g-500)", fontSize: 12 }}>
                  What reduced it? The passage no longer says.
                </p>
              </div>
              <div className="good">
                <div className="lbl" style={{ color: "var(--blue-600)" }}>
                  Indexed in context
                </div>
                <p>
                  “<mark>This</mark> reduced churn by 18% in the second half.”
                </p>
                <p style={{ marginTop: 10, color: "var(--blue-600)", fontSize: 12 }}>
                  this → the loyalty pricing change, §2.1
                </p>
              </div>
            </div>
            <div className="ans">
              <div className="lbl">Answer</div>
              <p>
                The loyalty pricing change reduced churn by 18% in the second
                half.<sup>[1]</sup> It was approved by the pricing committee in
                March.<sup>[2]</sup>
              </p>
              <div className="src">
                <span>[1] Retention_review.pdf · §4.3</span>
                <span>[2] Committee_minutes.docx · p.2</span>
              </div>
            </div>
          </MockWindow>
        </div>
        <div className="wrap">
          <Dia links="a>b,b>c,c>d,d>e" label="From document to cited answer">
            <div className="fl">
              <Nd n="a" icon={I.doc} title="Whole document" sub="Text, tables, page images" />
              <Nd n="b" icon={I.lines} title="Read in full" sub="Before any cutting" />
              <Nd n="c" icon={I.layers} title="Passages keep context" sub="Each one knows its document" variant="k" />
              <Nd n="d" icon={I.search} title="Hybrid search" sub="Keyword and meaning, access-checked" />
              <Nd n="e" icon={I.check} title="Cited answer" sub="Every claim linked to a passage" variant="b" />
            </div>
          </Dia>
          <Keys
            items={[
              { title: "Context-aware", body: "Every passage knows its document." },
              { title: "Hybrid, multimodal", body: "Text, tables and page images in one index." },
              { title: "Cited", body: "Every claim links to its source passage." },
              { title: "Inside your boundary", body: "Documents never leave to be indexed." },
            ]}
          />
        </div>
      </section>

      {/* 03 Memory */}
      <section className="pillar" id="memory">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">03 · Memory</span>
            <h2>Two memories. One assistant.</h2>
            <p className="lede">
              Organisation memory is everything your company already knows: its
              documents, systems and data, reached through connectors and the
              index. Personal memory is how you work. Our agent harness brings the
              two together on every request, so an answer is grounded in the
              organization and shaped for the person asking.
            </p>
          </div>
          <MockWindow title="What I remember">
            <div className="lbl">Preferences</div>
            <div className="row">
              <span className="grow">Show amounts in millions</span>
              <span className="pill b">You said</span>
              <span style={{ color: "var(--g-400)" }}>✎ ✕</span>
            </div>
            <div className="row">
              <span className="grow">Tables before charts</span>
              <span className="pill">Learned · 3 chats</span>
              <span style={{ color: "var(--g-400)" }}>✎ ✕</span>
            </div>
            <div className="lbl" style={{ marginTop: 18 }}>
              About your work
            </div>
            <div className="row">
              <span className="grow">
                Procurement lead
                <small>Projects: Harbour Road · North Depot · Quay 4</small>
              </span>
              <span className="pill b">You said</span>
              <span style={{ color: "var(--g-400)" }}>✎ ✕</span>
            </div>
            <div className="lbl" style={{ marginTop: 18 }}>
              Recent work
            </div>
            <div className="row">
              <span className="grow">
                Q3 portfolio summary
                <small>27 Oct · from Portfolio_Q3.xlsx</small>
              </span>
              <span style={{ color: "var(--g-400)" }}>✕</span>
            </div>
            <div className="lbl" style={{ marginTop: 18 }}>
              From your organization · reached live
            </div>
            <div className="row">
              <span className="grow">
                Procurement policy v6
                <small>Document library · cited</small>
              </span>
              <span className="pill ok">Access checked</span>
            </div>
            <div className="row">
              <span className="grow">
                Vendor ledger
                <small>ERP · governed fetch</small>
              </span>
              <span className="pill">Read-only</span>
            </div>
            <div className="foot">
              <span>
                Personal notes are private to you. Organisation knowledge follows
                your access.
              </span>
              <span className="pill ok">Scoped</span>
            </div>
          </MockWindow>
        </div>
        <div className="wrap">
          <Dia
            links="s1>p,s2>o,s3>o,s4>o,p>h,o>h,h>a"
            label="Personal and organization memory, through one harness"
          >
            <div className="fl">
              <div className="stk">
                <Nd n="s1" title="What you tell it" sub={<span className="pill ok">private</span>} variant="sm" />
                <Nd n="s2" title="Connectors" sub={<span className="pill b">live</span>} variant="sm" />
                <Nd n="s3" title="Vector index" sub={<span className="pill b">cited</span>} variant="sm" />
                <Nd n="s4" title="ERP and data" sub={<span className="pill b">read</span>} variant="sm" />
              </div>
              <div className="stk" style={{ flex: 1.5 }}>
                <Nd
                  n="p"
                  icon={I.person}
                  title="Personal memory"
                  sub="Your preferences, role and recent work. Yours alone."
                />
                <Nd
                  n="o"
                  icon={I.db}
                  title="Organisation memory"
                  sub="Documents, systems and data. Access-checked for each person."
                />
              </div>
              <Nd
                n="h"
                icon={I.harness}
                title="Agent harness"
                sub="Brings both to every request, inside your permissions"
                variant="k"
              />
              <Nd
                n="a"
                icon={I.bot}
                title="Grounded and personal"
                sub="The organization’s knowledge, answered the way you work"
                variant="b"
              />
            </div>
          </Dia>
          <Keys
            k3
            items={[
              { title: "Organisation memory", body: "A gold mine: everything your company already knows, in reach." },
              { title: "Personal memory", body: "How you work, remembered across chats and pages." },
              { title: "Better together", body: "Your role and projects point the agent at the right knowledge." },
              { title: "Permissions travel", body: "Organisation memory honours each person’s access." },
              { title: "Only you teach it", body: "A document cannot plant a personal memory." },
              { title: "Yours to see and delete", body: "Every personal note is visible and removable." },
            ]}
          />
        </div>
      </section>

      {/* 04 Determinism */}
      <section className="pillar tint" id="determinism">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">04 · AI-assisted determinism</span>
            <h2>Probabilistic where it helps. Deterministic where it counts.</h2>
            <p className="lede">
              A language model can give two answers to the same question. So we use
              it for what it is good at, reading messy input and proposing, and
              hand execution to fixed rules and code. The result is consistent,
              predictable and auditable, down to every number on a dashboard.
            </p>
            <a
              className="more"
              href="https://zeonai.hashnode.dev/what-it-really-takes-to-build-an-ai-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the engineering note <span>→</span>
            </a>
          </div>
          <div>
            <ProductVideo assetId="tech-dashboard-calc" tone="light" />
            <p className="mt-3 text-[13px] leading-[1.5] text-[var(--g-600)]">
              Opening “View calculation” shows the formula and row set behind a
              locked KPI — arithmetic outside the model.
            </p>
          </div>
        </div>
        <div className="wrap">
          <Dia
            links="m1>m2,m2>m3,c1>c2,c2>c3,l1>d,l2>d"
            label="AI interprets · deterministic logic executes"
          >
            <div className="fl">
              <div className="stk" style={{ flex: 2.8 }}>
                <div className="lane" data-n="l1">
                  <div className="lbl">AI · interprets</div>
                  <div className="fl">
                    <Nd n="m1" title="Reads messy input" />
                    <Nd n="m2" title="Classifies and proposes" />
                    <Nd n="m3" title="Writes the logic once" />
                  </div>
                </div>
                <div className="lane" data-n="l2">
                  <div className="lbl" style={{ color: "var(--g-900)" }}>
                    Deterministic · executes
                  </div>
                  <div className="fl">
                    <Nd n="c1" title="Rules and code run" variant="k" />
                    <Nd n="c2" title="Schemas validate" variant="k" />
                    <Nd n="c3" title="Result locked" variant="k" />
                  </div>
                </div>
              </div>
              <Nd
                n="d"
                icon={I.check}
                title="Same input, same result"
                sub="Consistent, predictable, auditable"
                variant="b"
              />
            </div>
          </Dia>
          <Keys
            k3
            items={[
              { title: "AI handles the mess", body: "Unstructured text, scans and spreadsheets, interpreted." },
              { title: "Logic governs execution", body: "Fixed rules and code run the action, not the model." },
              { title: "Written once, run every time", body: "The model drafts the rule. Every run repeats it exactly." },
              { title: "Guardrails", body: "Structured outputs, validation and workflow limits." },
              { title: "Pinned behaviour", body: "Prompts and models are versioned, so results stay stable." },
              { title: "Every number computed", body: "Dashboard figures come from code, with the calculation shown." },
            ]}
          />
        </div>
      </section>

      {/* 05 Router */}
      <section className="pillar" id="router">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">05 · Model router</span>
            <h2>The right model for each step.</h2>
            <p className="lede">
              One workflow may plan with a reasoning model, extract with a fast one
              and classify with a small one. Our router decides step by step,
              inside a policy your organization sets.
            </p>
          </div>
          <ModelRouterMock />
        </div>
        <div className="wrap">
          <Dia links="a>b,b>t1,b>t2,b>t3,t1>c,t2>c,t3>c" label="One step, routed">
            <div className="fl">
              <Nd n="a" icon={I.grid} title="A workflow step" sub="Plan, extract, classify, write" />
              <Nd n="b" icon={I.harness} title="Router" sub="Inside your policy" variant="k" />
              <div className="stk">
                <Nd n="t1" title="Reasoning" sub={<span className="tier r">deep</span>} variant="sm" />
                <Nd n="t2" title="Fast" sub={<span className="tier f">parallel</span>} variant="sm" />
                <Nd n="t3" title="Small" sub={<span className="tier s">low cost</span>} variant="sm" />
              </div>
              <Nd n="c" icon={I.page} title="Metered and logged" sub="Model, cost and fallback recorded" variant="b" />
            </div>
          </Dia>
          <Keys
            items={[
              { title: "Model-agnostic", body: "Swap the model, keep the workflow." },
              { title: "Your allow-list", body: "One approved model means one model." },
              { title: "Fallback", body: "Switches within policy and records it." },
              { title: "Fewer calls", body: "Cache, fan out, search first." },
            ]}
          />
        </div>
      </section>

      {/* 06 Tokens */}
      <section className="pillar tint" id="tokens">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">06 · Token economics</span>
            <h2>Every token accounted for.</h2>
            <p className="lede">
              Agents spend. Each model call is metered against the organization,
              the user and the agent that made it, so cost is a governed quantity
              and not a surprise at the end of the month.
            </p>
          </div>
          <MockWindow title="Usage · this month">
            <div className="lbl">By agent · credits</div>
            <div className="bar-row">
              <span>Invoice matching</span>
              <div className="track">
                <i style={{ width: "62%" }} />
              </div>
              <span>6,210</span>
            </div>
            <div className="bar-row">
              <span>Bank reconciliation</span>
              <div className="track">
                <i style={{ width: "41%" }} />
              </div>
              <span>4,090</span>
            </div>
            <div className="bar-row">
              <span>Contract review</span>
              <div className="track">
                <i className="hot" style={{ width: "93%" }} />
              </div>
              <span>9,340</span>
            </div>
            <div className="bar-row">
              <span>Ask AI</span>
              <div className="track">
                <i style={{ width: "28%" }} />
              </div>
              <span>2,780</span>
            </div>
            <div className="lbl" style={{ marginTop: 18 }}>
              Limits
            </div>
            <div className="row">
              <span className="grow">Organisation pool</span>
              <span className="pill ok">71% used</span>
            </div>
            <div className="row">
              <span className="grow">Contract review · agent budget</span>
              <span className="pill warn">93% · alert sent</span>
            </div>
            <div className="row">
              <span className="grow">Per-task cap</span>
              <span className="pill">12 steps</span>
            </div>
          </MockWindow>
        </div>
        <div className="wrap">
          <Dia links="a>b,b>p1,b>p2,b>p3,p1>c,p2>c,p3>c" label="Where every call is counted">
            <div className="fl">
              <Nd n="a" icon={I.bot} title="Every model call" sub="Chat, agent or background job" />
              <Nd n="b" icon={I.gauge} title="One meter" sub="No path around it" variant="k" />
              <div className="stk">
                <Nd n="p1" title="Organisation pool" sub={<span className="pill ok">71%</span>} variant="sm" />
                <Nd n="p2" title="User allowance" sub={<span className="pill ok">38%</span>} variant="sm" />
                <Nd n="p3" title="Agent budget" sub={<span className="pill warn">93%</span>} variant="sm" />
              </div>
              <Nd n="c" icon={I.stop} title="At the limit: stop and alert" sub="Never a surprise bill" variant="b" />
            </div>
          </Dia>
          <Keys
            items={[
              { title: "One meter", body: "No call goes around it." },
              { title: "Budgets that hold", body: "Agents stop at their limit." },
              { title: "Cheaper by design", body: "Tiering and caching, same quality." },
              { title: "Visible", body: "Cost per team, agent and workflow." },
            ]}
          />
        </div>
      </section>
      {/* 07 Security */}
      <section className="pillar" id="security">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">07 · Agent security</span>
            <h2>Agents with less authority than the people they work for.</h2>
            <p className="lede">
              An agent acts for a person and can never do more than that person
              can. The limits are enforced in code around the model, not asked of
              it in a prompt.
            </p>
          </div>
          <MockWindow title="Tool calls · agent run">
            <div className="row">
              <span className="num">01</span>
              <span className="grow">
                search_documents
                <small>as finance.manager · 2 withheld, outside access</small>
              </span>
              <span className="pill ok">Allowed</span>
            </div>
            <div className="row">
              <span className="num">02</span>
              <span className="grow">
                fetch_ledger
                <small>read-only · governed fetch</small>
              </span>
              <span className="pill ok">Allowed</span>
            </div>
            <div className="row">
              <span className="num">03</span>
              <span className="grow">
                search_documents
                <small>extra parameter: org_id</small>
              </span>
              <span className="pill no">Refused</span>
            </div>
            <div className="row">
              <span className="num">04</span>
              <span className="grow">
                run_analysis
                <small>sandbox · no network · 41 s · destroyed</small>
              </span>
              <span className="pill ok">Allowed</span>
            </div>
            <div className="row">
              <span className="num">05</span>
              <span className="grow">
                route_for_approval
                <small>changes a record</small>
              </span>
              <span className="pill warn">Needs you</span>
            </div>
            <div className="foot">
              <span>5 calls logged · user, arguments, result, model version</span>
              <span className="pill">Audit</span>
            </div>
          </MockWindow>
        </div>
        <div className="wrap">
          <Dia
            links="a>g1,g1>g2,g2>g3,g3>g4,g4>g5,g5>s"
            label="Five gates between an agent and your systems"
          >
            <div className="fl">
              <Nd n="a" icon={I.bot} title="Agent" sub="Acting for one person" variant="k" />
              <div className="gates">
                <div className="gt" data-n="g1">
                  <span className="ic">{I.person}</span>
                  Verified identity
                </div>
                <div className="gt" data-n="g2">
                  <span className="ic">{I.doc}</span>
                  Closed tool contract
                </div>
                <div className="gt" data-n="g3">
                  <span className="ic">{I.lock}</span>
                  Access check
                </div>
                <div className="gt" data-n="g4">
                  <span className="ic">{I.shield}</span>
                  Sandbox
                </div>
                <div className="gt" data-n="g5">
                  <span className="ic">{I.check}</span>
                  Human approval
                </div>
              </div>
              <Nd
                n="s"
                icon={I.servers}
                title="Your systems"
                sub="Read-only unless a person confirms"
                variant="b"
              />
            </div>
          </Dia>
          <Keys
            k3
            items={[
              { title: "Identity on every call", body: "Sees only what its user can open." },
              { title: "Closed contracts", body: "Invented parameters are refused." },
              { title: "Content is data", body: "Reading something grants nothing." },
              { title: "Sandboxed code", body: "No network. Destroyed after the run." },
              { title: "Humans confirm writes", body: "Create, change, route, delete: all wait." },
              { title: "Read-only by default", body: "Agents never query your systems directly." },
            ]}
          />
        </div>
      </section>

      {/* 08 Sovereign */}
      <section className="pillar dark" id="sovereign">
        <div className="wrap">
          <div className="wide rv">
            <div>
              <span className="mono eyebrow">08 · Sovereign deployment</span>
              <h2>
                Your boundary.
                <br />
                Your models.
              </h2>
            </div>
            <p className="lede">
              The same platform runs in three places. You choose where the data
              sits and which models may touch it, and that choice is built into
              the deployment, not left to configuration.
            </p>
          </div>
          <div className="modes rv">
            <div className="mode">
              <span className="mono">Mode 01</span>
              <h3>Your cloud, your region</h3>
              <p>
                Deployed into your own AWS, Azure or Google Cloud account. Data
                stays in the region you choose.
              </p>
              <div className="bound" data-l="Your account · your region">
                <span className="tag">platform</span>
                <span className="tag">data</span>
                <span className="tag">index</span>
              </div>
              <div className="out">models → your approved gateway</div>
            </div>
            <div className="mode">
              <span className="mono">Mode 02</span>
              <h3>Private cloud</h3>
              <p>
                A dedicated environment for one organization, with the frontier
                model you choose.
              </p>
              <div className="bound" data-l="Dedicated environment">
                <span className="tag">platform</span>
                <span className="tag">data</span>
                <span className="tag">index</span>
                <span className="tag">model endpoint</span>
              </div>
              <div className="out">no shared tenancy</div>
            </div>
            <div className="mode">
              <span className="mono">Mode 03</span>
              <h3>Air-gapped, on-premises</h3>
              <p>
                No route to the internet. Open-weight models on your own GPUs.
                Delivered for a national defense customer.
              </p>
              <div className="bound" data-l="Your network">
                <span className="tag">platform</span>
                <span className="tag">data</span>
                <span className="tag">index</span>
                <span className="tag">models</span>
                <span className="tag">gpus</span>
              </div>
              <div className="out">outbound connections: none</div>
            </div>
          </div>
          <div className="points rv">
            <div>
              <b>Weights stay with you</b>
              <span>
                Open-weight models are stored and served on your hardware. No
                call leaves to an outside model provider.
              </span>
            </div>
            <div>
              <b>Signed delivery</b>
              <span>
                Each release arrives as a signed bundle with a bill of materials
                you can verify before anything is loaded.
              </span>
            </div>
            <div>
              <b>Known provenance</b>
              <span>
                Every component and model is listed with its publisher, country
                of origin and licence. You decide what is admissible.
              </span>
            </div>
            <div>
              <b>Yours to operate</b>
              <span>
                Telemetry is off. Your team can restart, upgrade and roll back
                the platform after handover.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 09 Connectors */}
      <section className="pillar" id="connectors">
        <div className="wrap">
          <div className="grid rv" style={{ alignItems: "end" }}>
            <div>
              <span className="mono eyebrow">09 · Connectors</span>
              <h2>Your systems. One intelligent workspace.</h2>
            </div>
            <p className="lede">
              Bring your enterprise systems together through governed AI agents.
              Connect the ERP, data warehouse and document platforms your teams
              already rely on.
            </p>
          </div>
          <div className="rv" style={{ marginTop: 28 }}>
            <IntegrationEcosystem compact />
          </div>
          <Dia
            links="a>b,b>c"
            label="How an agent reaches your data"
            style={{ marginTop: 20 }}
          >
            <div className="fl">
              <Nd
                n="a"
                icon={I.lock}
                title="Read-only access"
                sub="To a selected database, from a fixed, whitelisted address."
              />
              <Nd
                n="b"
                icon={I.funnel}
                title="Governed fetch"
                sub="Code writes the query. Aggregation runs in your database, so raw rows stay there."
                variant="k"
              />
              <Nd
                n="c"
                icon={I.page}
                title="A record of what was read"
                sub="Every fetch is logged. No runaway queries on a live system."
                variant="b"
              />
            </div>
          </Dia>
        </div>
      </section>

      {/* 10 Evaluation */}
      <section className="pillar tint" id="evaluation">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">10 · Agent evaluation</span>
            <h2>No agent ships on a demo.</h2>
            <p className="lede">
              One good answer proves little. Before an agent, a prompt or a model
              change reaches you, it runs a suite built from real work, and it is
              graded on how it got there as well as on what it produced.
            </p>
          </div>
          <MockWindow title="Release check · invoice agent v12">
            <div className="lbl">Against v11 · 180 scenarios · 5 runs each</div>
            <div className="row">
              <span className="grow">Task success</span>
              <span className="pill">96% · was 94%</span>
              <span className="pill ok">Up</span>
            </div>
            <div className="row">
              <span className="grow">Same result on repeat runs</span>
              <span className="pill">5 of 5</span>
              <span className="pill ok">Held</span>
            </div>
            <div className="row">
              <span className="grow">
                Cross-user leak probes
                <small>release blocker if above zero</small>
              </span>
              <span className="pill">0 leaks</span>
              <span className="pill ok">Pass</span>
            </div>
            <div className="row">
              <span className="grow">Planted instructions followed</span>
              <span className="pill">0 of 24</span>
              <span className="pill ok">Pass</span>
            </div>
            <div className="row">
              <span className="grow">Cost per run</span>
              <span className="pill">−12%</span>
              <span className="pill ok">Down</span>
            </div>
            <div className="row">
              <span className="grow">Expert review · exceptions</span>
              <span className="pill">3 flagged</span>
              <span className="pill warn">Reviewed</span>
            </div>
            <div className="foot">
              <span>Every step of every run is kept for inspection</span>
              <span className="mini">Cleared to ship ✓</span>
            </div>
          </MockWindow>
        </div>
        <div className="wrap">
          <Dia
            links="a>b,b>c,c>g1,c>g2,c>g3,g1>d,g2>d,g3>d"
            label="From scenario to release gate"
          >
            <div className="fl">
              <Nd n="a" icon={I.doc} title="Scenario suite" sub="Real cases, messy data, attacks" />
              <Nd n="b" icon={I.refresh} title="Agent runs" sub="Repeated, not once" />
              <Nd n="c" icon={I.harness} title="Full trajectory" sub="Every step, tool call and cost" variant="k" />
              <div className="stk">
                <Nd n="g1" title="Code checks" variant="sm" />
                <Nd n="g2" title="Model grader" variant="sm" />
                <Nd n="g3" title="Expert review" variant="sm" />
              </div>
              <Nd n="d" icon={I.shield} title="Release gate" sub="Hold or beat the last version" variant="b" />
            </div>
          </Dia>
          <Keys
            k3
            items={[
              { title: "Graded on the path", body: "Not only on the final answer." },
              { title: "Beyond accuracy", body: "Cost, speed and consistency all count." },
              { title: "Attacks included", body: "Planted instructions and cross-user probes." },
              { title: "Regression gate", body: "A change ships only if the scores hold." },
              { title: "Graders are checked", body: "Code where it can be, experts where it matters." },
              { title: "On your work", body: "Measured in your domain, not on a public leaderboard." },
            ]}
          />
        </div>
      </section>

      {/* 11 Rules */}
      <section className="pillar" id="rules">
        <div className="wrap grid">
          <div className="rv">
            <span className="mono eyebrow">11 · Rule builder</span>
            <h2>Rules written by an agent. Proved before they run.</h2>
            <p className="lede">
              Reconciliation lives in its rules: does this invoice match that
              order, within what tolerance, and what happens when it does not. An
              analyst describes the check in plain language. An agent drafts the
              rule, tests it and shows its working. Nothing changes until the
              analyst applies it.
            </p>
          </div>
          <div>
            <ProductVideo assetId="tech-rule-builder" tone="light" />
            <p className="mt-3 text-[13px] leading-[1.5] text-[var(--g-600)]">
              A sentence becomes a drafted rule, sample tests run, and nothing
              ships until an analyst applies it.
            </p>
          </div>
        </div>
        <div className="wrap">
          <Dia links="a>b,b>c,c>d,d>e" label="From a sentence to a rule in production">
            <div className="fl">
              <Nd n="a" icon={I.chat} title="Describe the check" sub="In plain language" />
              <Nd n="b" icon={I.spark} title="Agent asks, then drafts" sub="One question at a time" />
              <Nd n="c" icon={I.shield} title="Checked by the engine" sub="Never graded by the model itself" variant="k" />
              <Nd n="d" icon={I.layers} title="Run on samples" sub="Pass, fail, missing and edge cases" />
              <Nd n="e" icon={I.check} title="You apply" sub="Versioned, with its tests attached" variant="b" />
            </div>
          </Dia>
          <Keys
            k3
            items={[
              { title: "Asks before it drafts", body: "Ambiguity gets a question, not a guess." },
              { title: "No invented fields", body: "Only data that exists in your documents and ERP." },
              { title: "Tested on every draft", body: "Including a case that should fail." },
              { title: "Works before data exists", body: "It builds a labelled sample set to test on." },
              { title: "Small, visible changes", body: "“Ignore case” changes one line, and shows it." },
              { title: "You apply", body: "The agent never writes to a live rule." },
            ]}
          />
        </div>
      </section>
    </>
  );
}
