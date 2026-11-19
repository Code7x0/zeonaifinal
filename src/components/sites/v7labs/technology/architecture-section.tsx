const LAYERS = [
  {
    n: "05",
    title: "Apps and outputs",
    href: "#determinism",
    tags: ["ask ai", "dashboards", "agent hub", "erp post"],
  },
  {
    n: "04",
    title: "Agent runtime",
    href: "#runtime",
    tags: ["graph execution", "frozen logic", "rule builder", "human tasks", "rerun"],
  },
  {
    n: "03",
    title: "Model layer",
    href: "#router",
    tags: ["router", "frontier or open-weight", "token meter"],
  },
  {
    n: "02",
    title: "Knowledge layer",
    href: "#retrieval",
    tags: ["context-aware index", "hybrid retrieval", "personal + organization memory"],
  },
  {
    n: "01",
    title: "Governed data access",
    href: "#connectors",
    tags: ["connectors", "read-only fetch", "document processing"],
  },
] as const;

const RAIL = [
  "Verified identity",
  "Access check before retrieval",
  "Sandboxed execution",
  "Human approval on writes",
  "Cost limits",
  "Release evaluation",
  "Read-only audit log",
] as const;

export function ArchitectureSection() {
  return (
    <section className="arch" id="architecture">
      <div className="wrap">
        <div className="head rv">
          <h2>
            Five layers.
            <br />
            One governance rail.
          </h2>
          <p>
            Data moves up through the layers. Identity, access and audit run
            alongside every one of them, so no layer can be reached around the
            controls.
          </p>
        </div>
        <div className="stack rv">
          <div className="layers">
            {LAYERS.map((layer) => (
              <a key={layer.n} className="layer" href={layer.href}>
                <span className="n">{layer.n}</span>
                <span className="t">{layer.title}</span>
                <span className="d">
                  {layer.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="go" aria-hidden>
                  →
                </span>
              </a>
            ))}
          </div>
          <a className="rail" href="#security">
            <span className="mono">Governance rail</span>
            <p>Applied to every request, at every layer.</p>
            <ul>
              {RAIL.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </a>
        </div>
        <p className="mono note">Select a layer to jump to it</p>
      </div>
    </section>
  );
}
