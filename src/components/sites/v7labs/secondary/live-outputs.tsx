"use client";

/**
 * Premium dark live-output screens for Platform OutputIndex.
 * Inline styles so backgrounds always paint.
 */

import type { CSSProperties, ReactNode } from "react";

const screen: CSSProperties = {
  background: "#070b14",
  color: "#ffffff",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 28px 60px -24px rgba(0,0,0,0.55)",
};

const bar: CSSProperties = {
  display: "flex",
  height: 44,
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  background: "#111318",
  padding: "0 14px",
};

const body: CSSProperties = {
  background: "#070b14",
  color: "#ffffff",
  padding: "14px 16px 16px",
};

const muted: CSSProperties = { color: "rgba(255,255,255,0.45)", margin: 0 };

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
  borderRadius: 4,
  border: "1px solid rgba(36,91,219,0.35)",
  background: "rgba(36,91,219,0.15)",
  padding: "4px 8px",
  fontFamily: "ui-monospace, monospace",
  fontSize: 10,
  color: "#7ba0ff",
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
  color: "#fff",
};

function LiveChrome({
  title,
  module,
  children,
}: {
  title: string;
  module: string;
  children: ReactNode;
}) {
  return (
    <div style={screen}>
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
        <div
          aria-hidden
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          Live
        </div>
      </div>
      <div style={body}>{children}</div>
    </div>
  );
}

/** Cited answer — Ask AI with sources */
export function LiveCitedAnswer() {
  return (
    <LiveChrome title="AI Workspace" module="Ask AI">
      <p
        style={{
          ...muted,
          fontFamily: "ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Query · Credit policy
      </p>
      <div
        style={{
          ...panel,
          marginTop: 8,
          padding: "10px 12px",
          fontSize: 13,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.88)",
        }}
      >
        What does the credit policy say about LVR above 80% for self-employed
        applicants?
      </div>
      <div style={{ ...panelStrong, marginTop: 12, padding: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 10,
              color: "#7ba0ff",
            }}
          >
            Answer
          </span>
          <span style={{ ...muted, fontSize: 10 }}>Confidence · High</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "#fff" }}>
          Policy 4.2 requires a senior credit override when LVR exceeds 80% for
          self-employed applicants, with two years of tax returns on file.
        </p>
        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Lending Policy v3.4 · p.12", "Override matrix · §B"].map((c) => (
            <span key={c} style={chip}>
              {c}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 12,
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>
          Access · Credit · Policy
        </span>
        <span
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 11,
            color: "#7ba0ff",
          }}
        >
          Cited · 2 sources
        </span>
      </div>
    </LiveChrome>
  );
}

/** Exception queue — workflow with human checkpoint */
export function LiveExceptionQueue() {
  const steps = [
    { label: "Inbox intake", detail: "42 docs · today", state: "done" as const },
    {
      label: "Extract + match",
      detail: "PO · GRN · invoice",
      state: "done" as const,
    },
    {
      label: "Exception review",
      detail: "Freight variance +$1,240",
      state: "active" as const,
    },
    { label: "ERP post", detail: "SAP · locked", state: "queued" as const },
  ];

  return (
    <LiveChrome title="AI Workspace" module="Workflows">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            Case · AP-1842
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Vendor invoice exception
          </p>
        </div>
        <span
          style={{
            borderRadius: 999,
            background: "rgba(36,91,219,0.28)",
            padding: "4px 10px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "#7ba0ff",
          }}
        >
          1 open
        </span>
      </div>
      <div style={{ marginTop: 14, display: "grid", gap: 6 }}>
        {steps.map((s, i) => (
          <div
            key={s.label}
            style={{
              ...(s.state === "active" ? accent : panel),
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                flexShrink: 0,
                background:
                  s.state === "done"
                    ? "#245bdb"
                    : s.state === "active"
                      ? "#356dff"
                      : "rgba(255,255,255,0.08)",
                color:
                  s.state === "queued" ? "rgba(255,255,255,0.4)" : "#fff",
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, color: "#fff" }}>{s.label}</p>
              <p style={{ ...muted, margin: "2px 0 0", fontSize: 11 }}>
                {s.detail}
              </p>
            </div>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                textTransform: "uppercase",
                color:
                  s.state === "active"
                    ? "#7ba0ff"
                    : "rgba(255,255,255,0.4)",
              }}
            >
              {s.state}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>
          Human checkpoint · Sarah Chen
        </span>
        <span style={btn}>Approve exception</span>
      </div>
    </LiveChrome>
  );
}

/** Clause extract — contract intelligence */
export function LiveClauseExtract() {
  return (
    <LiveChrome title="AI Workspace" module="Contracts">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            MSA · Alloy Parts Ltd
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Pricing change notice
          </p>
        </div>
        <span
          style={{
            borderRadius: 999,
            border: "1px solid rgba(251,191,36,0.35)",
            background: "rgba(251,191,36,0.12)",
            padding: "4px 10px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "rgba(254,243,199,0.95)",
          }}
        >
          Review
        </span>
      </div>
      <div style={{ ...panelStrong, marginTop: 14, padding: 12 }}>
        <p
          style={{
            ...muted,
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            marginBottom: 8,
          }}
        >
          Clause · §8.3
        </p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "#fff" }}>
          …Supplier shall notify the Buyer of any{" "}
          <span
            style={{
              background: "rgba(53,109,255,0.28)",
              borderRadius: 3,
              padding: "0 3px",
            }}
          >
            material change in pricing
          </span>{" "}
          no less than thirty (30) days prior…
        </p>
      </div>
      <div
        style={{
          marginTop: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
        }}
      >
        {[
          { k: "Notice", v: "30 days" },
          { k: "Risk", v: "Commercial" },
          { k: "Owner", v: "Legal" },
        ].map((r) => (
          <div key={r.k} style={{ ...panel, padding: "8px 10px" }}>
            <p
              style={{
                ...muted,
                fontFamily: "ui-monospace, monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {r.k}
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {r.v}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...muted, fontSize: 11 }}>
          Extracted · ready for counsel
        </span>
        <span style={btn}>Open in Contracts</span>
      </div>
    </LiveChrome>
  );
}

/** Audit trail — read-only activity log */
export function LiveAuditTrail() {
  const rows = [
    {
      t: "14:02",
      a: "Ask AI answer",
      u: "finance.ops",
      d: "Cited 3 sources",
    },
    {
      t: "14:06",
      a: "Exception opened",
      u: "agent.invoice",
      d: "PO mismatch",
    },
    {
      t: "14:11",
      a: "Human approve",
      u: "ap.lead",
      d: "Case #1842",
    },
    {
      t: "14:18",
      a: "ERP post",
      u: "connector.sap",
      d: "Document locked",
    },
  ];

  return (
    <LiveChrome title="Trust Centre" module="Audit log">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            Today · Workspace activity
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Read-only trail
          </p>
        </div>
        <span
          style={{
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.12)",
            padding: "4px 10px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Immutable
        </span>
      </div>
      <div style={{ ...panel, marginTop: 14, overflow: "hidden", padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "52px 1.15fr 0.95fr 1.1fr",
            gap: 8,
            padding: "8px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <span>Time</span>
          <span>Action</span>
          <span>Actor</span>
          <span>Detail</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.t + r.a}
            style={{
              display: "grid",
              gridTemplateColumns: "52px 1.15fr 0.95fr 1.1fr",
              gap: 8,
              padding: "10px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: 12,
              color: "#fff",
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {r.t}
            </span>
            <span>{r.a}</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{r.u}</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{r.d}</span>
          </div>
        ))}
      </div>
      <p style={{ ...muted, margin: "12px 0 0", fontSize: 11 }}>
        Watchers can be notified — nobody can rewrite the log.
      </p>
    </LiveChrome>
  );
}
