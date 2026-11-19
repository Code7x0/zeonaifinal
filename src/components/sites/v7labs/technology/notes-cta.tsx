const NOTES = [
  {
    href: "https://zeonai.hashnode.dev/late-chunking-jina-v4-context-aware-embeddings-self-hosted-on-gcp",
    tag: "Retrieval",
    status: "Published",
    title: "Late chunking: context-aware embeddings, self-hosted",
    body: "Why we embed the whole document before we cut it up, and what it took to serve that ourselves.",
    cta: "Read the note →",
    soon: false,
  },
  {
    href: "https://zeonai.hashnode.dev/what-it-really-takes-to-build-an-ai-dashboard",
    tag: "Dashboards",
    status: "Published",
    title: "What it really takes to build an AI dashboard",
    body: "Contract drift, wrong averages and vanishing KPIs, and why arithmetic had to leave the model.",
    cta: "Read the note →",
    soon: false,
  },
  {
    href: undefined,
    tag: "Data access",
    status: "Coming soon",
    title: "Why our agents never query your ERP directly",
    body: "Governed, read-only fetch as the only door into a system of record.",
    cta: "In review",
    soon: true,
  },
  {
    href: undefined,
    tag: "Runtime",
    status: "Coming soon",
    title: "Generate once, freeze, execute",
    body: "Getting auditable, repeatable logic out of a language model.",
    cta: "In review",
    soon: true,
  },
  {
    href: undefined,
    tag: "Memory",
    status: "Coming soon",
    title: "Memory is a hint, not the truth",
    body: "Designing recall that cannot leak across users and cannot be planted by a document.",
    cta: "In review",
    soon: true,
  },
  {
    href: undefined,
    tag: "Deployment",
    status: "Coming soon",
    title: "Running agentic AI fully air-gapped",
    body: "Open-weight models, signed delivery and tool calling with no outbound connection.",
    cta: "In review",
    soon: true,
  },
] as const;

export function NotesAndCta() {
  return (
    <>
      <section className="notes" id="notes">
        <div className="wrap">
          <div className="t-nhead rv">
            <div>
              <span className="mono" style={{ color: "var(--blue-600)" }}>
                Engineering notes
              </span>
              <h2 style={{ marginTop: 18 }}>
                How we got here, in our engineers&apos; words.
              </h2>
            </div>
            <a
              className="more"
              style={{ margin: 0 }}
              href="https://zeonai.hashnode.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              All notes <span>→</span>
            </a>
          </div>
          <div className="cards rv">
            {NOTES.map((note) =>
              note.soon || !note.href ? (
                <div
                  key={note.title}
                  className="note-card soon"
                >
                  <span className="mono">
                    <span>{note.tag}</span>
                    <span>{note.status}</span>
                  </span>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <span className="read">{note.cta}</span>
                </div>
              ) : (
                <a
                  key={note.title}
                  className="note-card"
                  href={note.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mono">
                    <span>{note.tag}</span>
                    <span>{note.status}</span>
                  </span>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <span className="read">{note.cta}</span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div>
            <h2>
              Bring your architect.
              <br />
              We will bring ours.
            </h2>
            <p>
              A working session with the engineers who built the platform, on
              your constraints: models, data residency, access and audit.
            </p>
          </div>
          <div className="acts">
            <a className="btn ghost" href="/contact">
              Talk to our engineers
            </a>
            <a className="btn white" href="/demo">
              Book a demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
