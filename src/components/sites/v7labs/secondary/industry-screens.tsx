"use client";

/**
 * Dark industry product screens — inline styles only.
 * (Bundled CSS utilities were not painting backgrounds for these components.)
 */

import type { CSSProperties, ReactNode } from "react";

const screen: CSSProperties = {
  background: "#070b14",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 28px 60px -24px rgba(0,0,0,0.65)",
};

const bar: CSSProperties = {
  display: "flex",
  height: 44,
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  background: "#111318",
  padding: "0 14px",
  color: "#ffffff",
};

const body: CSSProperties = {
  background: "#070b14",
  color: "#ffffff",
  padding: "14px 16px 16px",
};

const muted: CSSProperties = {
  color: "rgba(255,255,255,0.45)",
  margin: 0,
};

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 6,
};

const panelStrong: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "#111318",
  borderRadius: 6,
};

const accent: CSSProperties = {
  border: "1px solid rgba(53,109,255,0.4)",
  background: "rgba(36,91,219,0.16)",
  borderRadius: 6,
};

const chip: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 9999,
  background: "rgba(36,91,219,0.28)",
  padding: "4px 10px",
  fontFamily: "ui-monospace, monospace",
  fontSize: 10,
  color: "#7ba0ff",
  whiteSpace: "nowrap",
};

const btn: CSSProperties = {
  display: "inline-flex",
  height: 32,
  alignItems: "center",
  borderRadius: 9999,
  background: "#245bdb",
  padding: "0 12px",
  fontSize: 11,
  fontWeight: 500,
  color: "#ffffff",
};

const btnLight: CSSProperties = {
  display: "inline-flex",
  height: 32,
  alignItems: "center",
  borderRadius: 9999,
  background: "#ffffff",
  padding: "0 12px",
  fontSize: 11,
  fontWeight: 500,
  color: "#070b14",
};

function DarkChrome({
  title,
  module,
  children,
}: {
  title: string;
  module: string;
  children: ReactNode;
}) {
  return (
    <div style={screen} data-ui>
      <div style={bar}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#356DFF",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>
            {title}
          </span>
          <span
            style={{
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              padding: "2px 6px",
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {module}
          </span>
        </div>
        <div aria-hidden style={{ display: "flex", gap: 4 }}>
          <span
            style={{
              width: 32,
              height: 6,
              borderRadius: 999,
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            style={{
              width: 16,
              height: 6,
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>
      <div style={body}>{children}</div>
    </div>
  );
}

export function FinancialScreen() {
  return (
    <DarkChrome title="AI Workspace" module="Underwriting">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              ...muted,
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Case · LN-20481
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            Mortgage application pack
          </p>
        </div>
        <span style={chip}>In review</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginTop: 16,
        }}
      >
        {[
          { k: "LVR", v: "78%" },
          { k: "Docs", v: "14 / 14" },
          { k: "Policy", v: "Pass" },
        ].map((m) => (
          <div key={m.k} style={{ ...panel, padding: "8px 10px" }}>
            <p
              style={{
                ...muted,
                fontFamily: "ui-monospace, monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {m.k}
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 16,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {m.v}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
        {[
          { label: "Identity + KYC verified", ok: true },
          { label: "Payslips · 2 years extracted", ok: true },
          { label: "LVR override · senior credit", ok: false },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              ...(row.ok ? panel : accent),
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              fontSize: 12,
              color: row.ok ? "rgba(255,255,255,0.7)" : "#fff",
            }}
          >
            <span>{row.label}</span>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {row.ok ? "Clear" : "Exception"}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>Underwriter · A. Cole</span>
        <span style={btn}>Open credit memo</span>
      </div>
    </DarkChrome>
  );
}

export function SuperScreen() {
  return (
    <DarkChrome title="AI Workspace" module="Reconciliation">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              ...muted,
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Daily receipting
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Employer deposit match
          </p>
        </div>
        <span
          style={{
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            padding: "4px 10px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          5,214 lines
        </span>
      </div>
      <div style={{ ...panel, marginTop: 16, overflow: "hidden", padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 72px 72px",
            gap: 8,
            padding: "8px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>Employer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {[
          { n: "Northside Payroll", a: "$48,220", s: "Matched", ok: true },
          { n: "Horizon Constructions", a: "$12,905", s: "Matched", ok: true },
          { n: "Pacific Freight Co", a: "$6,140", s: "Exception", ok: false },
          { n: "Cedar Health Trust", a: "$19,880", s: "Matched", ok: true },
        ].map((r) => (
          <div
            key={r.n}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 72px 72px",
              gap: 8,
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: 12,
              background: r.ok ? "transparent" : "rgba(36,91,219,0.12)",
              color: "#fff",
            }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              {r.n}
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {r.a}
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                color: r.ok ? "rgba(255,255,255,0.45)" : "#7BA0FF",
              }}
            >
              {r.s}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>
          3-way match · PO + GRN + invoice
        </span>
        <span style={btnLight}>Review 1 exception</span>
      </div>
    </DarkChrome>
  );
}

export function MediaScreen() {
  return (
    <DarkChrome title="AI Workspace" module="Ask AI">
      <p
        style={{
          ...muted,
          fontFamily: "ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Newsroom briefing
      </p>
      <div
        style={{
          ...panel,
          marginTop: 8,
          padding: "10px 12px",
          fontSize: 13,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        Summarise overnight coverage on the ports dispute — flag claims that
        still need a source before publish.
      </div>
      <div style={{ ...panelStrong, marginTop: 12, padding: 12 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#fff" }}>
          Three carriers remain locked out at Berth 7. Union negotiators cite a
          14-hour overtime dispute; port authority has not confirmed a return
          date.
        </p>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Wire · 06:14", "Port bulletin · 05:40", "Audio desk · 04:55"].map(
            (c) => (
              <span
                key={c}
                style={{
                  borderRadius: 4,
                  border: "1px solid rgba(36,91,219,0.35)",
                  background: "rgba(36,91,219,0.15)",
                  padding: "4px 8px",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 10,
                  color: "#7BA0FF",
                }}
              >
                {c}
              </span>
            ),
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          borderRadius: 6,
          border: "1px solid rgba(251,191,36,0.25)",
          background: "rgba(251,191,36,0.1)",
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "rgba(254,243,199,0.95)",
        }}
      >
        <span>Fact check · 1 claim needs a source</span>
        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10 }}>
          Hold
        </span>
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>Editor · R. Mehta</span>
        <span style={btn}>Send to desk</span>
      </div>
    </DarkChrome>
  );
}

export function GovScreen() {
  return (
    <DarkChrome title="AI Workspace" module="Policy search">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            ...muted,
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Clearance · Protected
        </p>
        <span
          style={{
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "2px 8px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Role · Analyst
        </span>
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 13,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        What does Circular 12/2024 say about grant acquittal deadlines for
        regional councils?
      </p>
      <div style={{ ...panelStrong, marginTop: 12, padding: 12 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#fff" }}>
          Acquittals are due within 60 days of programme close. Extensions
          require Deputy Secretary approval and must be logged before the
          original deadline.
        </p>
        <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
          {[
            { doc: "Circular 12/2024", p: "§4.2" },
            { doc: "Grants Ops Manual v6", p: "p.41" },
          ].map((s) => (
            <div
              key={s.doc}
              style={{
                ...panel,
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 10px",
                fontSize: 11,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.75)" }}>{s.doc}</span>
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 10,
                  color: "#7BA0FF",
                }}
              >
                {s.p}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ ...muted, margin: "12px 0 0", fontSize: 11 }}>
        2 documents withheld — outside this role&apos;s clearance.
      </p>
    </DarkChrome>
  );
}

export function DefenceScreen() {
  return (
    <DarkChrome title="AI Workspace" module="Secure search">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            ...muted,
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Classified · Need-to-know
        </p>
        <span style={chip}>On-prem</span>
      </div>
      <div
        style={{
          ...panel,
          marginTop: 12,
          padding: "10px 12px",
          fontSize: 13,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        Latest SOP for convoy communications blackout
      </div>
      <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
        {[
          {
            title: "SOP-COM-441 · Convoy blackout",
            meta: "Doctrine · v3.2 · Cleared",
            dim: false,
          },
          {
            title: "Annex B · Frequency plan",
            meta: "Restricted · Owner only",
            dim: false,
          },
          {
            title: "Incident note · Corridor 9",
            meta: "Withheld · Outside clearance",
            dim: true,
          },
        ].map((row) => (
          <div
            key={row.title}
            style={{
              ...(row.dim ? panel : panelStrong),
              padding: "10px 12px",
              opacity: row.dim ? 0.45 : 1,
            }}
          >
            <p style={{ margin: 0, fontSize: 13, color: "#fff" }}>{row.title}</p>
            <p
              style={{
                ...muted,
                margin: "4px 0 0",
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
              }}
            >
              {row.meta}
            </p>
          </div>
        ))}
      </div>
      <p
        style={{
          ...muted,
          margin: "16px 0 0",
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: 11,
        }}
      >
        Access checked before retrieval · audit entry written
      </p>
    </DarkChrome>
  );
}

export function MetalsScreen() {
  return (
    <DarkChrome title="AI Workspace" module="InvoiceAI">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <div>
          <p
            style={{
              ...muted,
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Vendor invoice
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            INV-8841 · Alloy Parts Ltd
          </p>
        </div>
        <span style={chip}>2-way match</span>
      </div>
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {[
          { k: "PO", v: "PO-11904", ok: true },
          { k: "Amount", v: "$84,620", ok: true },
          { k: "Line items", v: "12 / 12", ok: true },
          { k: "Variance", v: "+$1,240", ok: false },
        ].map((c) => (
          <div
            key={c.k}
            style={{
              ...(c.ok ? panel : accent),
              padding: "8px 10px",
            }}
          >
            <p
              style={{
                ...muted,
                fontFamily: "ui-monospace, monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {c.k}
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 15,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {c.v}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          ...panel,
          marginTop: 12,
          padding: "10px 12px",
          fontSize: 12,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        Variance on freight line · routed to AP lead before ERP post
      </div>
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>Plant · Hot strip mill</span>
        <span style={btnLight}>Approve with note</span>
      </div>
    </DarkChrome>
  );
}

export function industryScreen(id: string) {
  switch (id) {
    case "financial":
      return <FinancialScreen />;
    case "super":
      return <SuperScreen />;
    case "media":
      return <MediaScreen />;
    case "gov":
      return <GovScreen />;
    case "defence":
      return <DefenceScreen />;
    case "metals":
      return <MetalsScreen />;
    default:
      return <FinancialScreen />;
  }
}
