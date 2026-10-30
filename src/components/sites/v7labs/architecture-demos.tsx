import type { ReactElement, ReactNode } from "react";
import type { ArchitectureLayerKey } from "@/components/sites/zeonai/content";
import { ArchitectureIllustration } from "./architecture-illustrations";

const ROYAL = "#2F5BFF";

/** Shared chrome for all layer demonstration panels. */
function DemoChrome({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/12 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-[#0a0a0a] px-3">
        <span className="flex gap-1" aria-hidden>
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="size-1.5 rounded-full bg-white/25" />
        </span>
        <p className="truncate text-[10px] text-white/40">{title}</p>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden p-3 md:p-3.5">{children}</div>
    </div>
  );
}

function GraphSlot({ layerKey }: { layerKey: ArchitectureLayerKey }) {
  return (
    <div className="flex items-center justify-center rounded border border-white/10 bg-white/[0.03] px-2 py-3">
      <ArchitectureIllustration
        layerKey={layerKey}
        variant="dark"
        className="h-auto w-full max-w-[220px]"
      />
    </div>
  );
}

function DataSourcesDemo() {
  const files = [
    ["Capital_policy_v4.pdf", "PDF", "Upload"],
    ["Delegation_matrix.xlsx", "XLS", "Upload"],
    ["Invoice_pack_Q3.zip", "ZIP", "Repository"],
    ["Master_services_v2.pdf", "PDF", "Repository"],
  ];
  return (
    <DemoChrome title="ZeonAI · Ingest">
      <div className="grid h-full gap-2 sm:grid-cols-[0.95fr_1.05fr]">
        <GraphSlot layerKey="data-sources" />
        <div className="min-h-0 overflow-hidden">
          <div className="mb-2 flex gap-2">
            <div className="flex-1 rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[10px] text-white/30">
              Connected sources…
            </div>
            <span
              className="rounded border px-2 py-1.5 text-[9px] text-white"
              style={{
                borderColor: `${ROYAL}55`,
                backgroundColor: `${ROYAL}22`,
              }}
            >
              2 connected
            </span>
          </div>
          <div className="overflow-hidden rounded border border-white/10">
            {files.map(([name, type, src], i) => (
              <div
                key={name}
                className="flex items-center gap-2 border-b border-white/5 px-2.5 py-1.5 last:border-0"
                style={
                  i === 0 ? { backgroundColor: `${ROYAL}18` } : undefined
                }
              >
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.04] font-mono text-[8px]"
                  style={{ color: ROYAL }}
                >
                  {type}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] text-white/85">{name}</p>
                  <p className="text-[8px] text-white/35">{src}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function DocumentProcessingDemo() {
  return (
    <DemoChrome title="ZeonAI · Processing">
      <div className="grid h-full gap-2 sm:grid-cols-[1fr_1fr]">
        <GraphSlot layerKey="document-processing" />
        <div className="space-y-1.5">
          <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/35">
            Extracted fields
          </p>
          {[
            ["Category", "MSA"],
            ["Term", "36 months"],
            ["Amount", "—"],
            ["Effective", "2025-01-12"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[10px]"
            >
              <span className="text-white/40">{k}</span>
              <span className="font-medium text-white/85">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </DemoChrome>
  );
}

function RulesEngineDemo() {
  const rules = [
    ["Amount ≤ delegated limit", "Pass"],
    ["Vendor on approved list", "Pass"],
    ["Freight variance ≤ $50", "Review"],
  ];
  return (
    <DemoChrome title="ZeonAI · Rules">
      <div className="grid h-full gap-2 sm:grid-cols-[0.9fr_1.1fr]">
        <GraphSlot layerKey="rules-engine" />
        <div>
          <p className="mb-2 text-[11px] font-medium text-white/80">
            Rule set · Invoice validation
          </p>
          <ul className="space-y-1.5">
            {rules.map(([rule, status]) => (
              <li
                key={rule}
                className="flex items-center justify-between rounded border px-2.5 py-2 text-[10px]"
                style={
                  status === "Review"
                    ? {
                        borderColor: `${ROYAL}55`,
                        backgroundColor: `${ROYAL}18`,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }
                }
              >
                <span className="text-white/75">{rule}</span>
                <span
                  className={
                    status === "Pass" ? "text-white/70" : "text-white"
                  }
                  style={status === "Review" ? { color: ROYAL } : undefined}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoChrome>
  );
}

function WorkflowsDemo() {
  const stages = [
    ["Ingest", "Done"],
    ["Extract", "Done"],
    ["Match", "Done"],
    ["Approve", "Waiting"],
    ["ERP", "Queued"],
  ];
  return (
    <DemoChrome title="ZeonAI · Workflow · INV-4821">
      <div className="grid h-full gap-2 sm:grid-cols-[0.9fr_1.1fr]">
        <GraphSlot layerKey="workflows-approvals" />
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-white">
                Invoice processing
              </p>
              <p className="text-[9px] text-white/40">Holder · A. Chen</p>
            </div>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] text-white"
              style={{ backgroundColor: `${ROYAL}33` }}
            >
              In progress
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {stages.map(([name, status]) => (
              <div
                key={name}
                className="min-w-[4rem] flex-1 rounded border px-1.5 py-2"
                style={
                  status === "Waiting"
                    ? {
                        borderColor: `${ROYAL}66`,
                        backgroundColor: `${ROYAL}22`,
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }
                }
              >
                <p className="text-[9px] font-medium text-white/85">{name}</p>
                <p
                  className="mt-0.5 text-[8px]"
                  style={{
                    color:
                      status === "Waiting"
                        ? ROYAL
                        : status === "Done"
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(255,255,255,0.35)",
                  }}
                >
                  {status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function AccessAuditDemo() {
  return (
    <DemoChrome title="ZeonAI · Access & audit">
      <div className="grid h-full gap-2 sm:grid-cols-[0.9fr_1.1fr]">
        <GraphSlot layerKey="access-audit" />
        <div>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div className="rounded border border-white/10 bg-white/[0.03] p-2">
              <p className="font-mono text-[8px] uppercase text-white/35">
                Role
              </p>
              <p className="mt-1 text-[11px] text-white/85">Finance manager</p>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.03] p-2">
              <p className="font-mono text-[8px] uppercase text-white/35">
                Visibility
              </p>
              <p className="mt-1 text-[11px] text-white/85">Protected</p>
              <p className="mt-1 text-[9px]" style={{ color: ROYAL }}>
                Case scoped
              </p>
            </div>
          </div>
          <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/35">
            Activity log
          </p>
          <ul className="space-y-1.5">
            {[
              ["14:11", "export", "A. Chen"],
              ["14:05", "edit", "A. Chen"],
              ["14:02", "view", "J. Rao"],
            ].map(([t, action, actor]) => (
              <li
                key={t + action}
                className="flex gap-2 border-b border-white/5 pb-1.5 text-[10px] last:border-0"
              >
                <span className="w-8 shrink-0 tabular-nums text-white/30">
                  {t}
                </span>
                <span className="text-white/75">{action}</span>
                <span className="ml-auto text-white/40">{actor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DemoChrome>
  );
}

function OutputsDemo() {
  return (
    <DemoChrome title="ZeonAI · Output">
      <div className="grid h-full gap-2 sm:grid-cols-[0.9fr_1.1fr]">
        <GraphSlot layerKey="outputs-integrations" />
        <div>
          <div className="rounded border border-white/10 bg-white/[0.03] p-2.5">
            <p className="text-[11px] font-medium text-white">Invoice record</p>
            <dl className="mt-2 space-y-1.5 text-[10px]">
              {[
                ["Vendor", "Sample vendor"],
                ["Amount", "$48,220.00"],
                ["PO", "PO-9811"],
                ["Status", "Ready to post"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-white/40">{k}</dt>
                  <dd className="font-medium text-white/85">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            className="mt-2 flex items-center gap-2 rounded border px-2.5 py-2"
            style={{
              borderColor: `${ROYAL}4D`,
              backgroundColor: `${ROYAL}1A`,
            }}
          >
            <span className="font-mono text-[9px]" style={{ color: ROYAL }}>
              ERP
            </span>
            <span className="text-[10px] text-white/70">
              Connector · pending post
            </span>
            <span className="ml-auto text-[9px] text-white/80">Queued</span>
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

const DEMOS: Record<ArchitectureLayerKey, () => ReactElement> = {
  "data-sources": DataSourcesDemo,
  "document-processing": DocumentProcessingDemo,
  "rules-engine": RulesEngineDemo,
  "workflows-approvals": WorkflowsDemo,
  "access-audit": AccessAuditDemo,
  "outputs-integrations": OutputsDemo,
};

export function ArchitectureDemo({
  layerKey,
}: {
  layerKey: ArchitectureLayerKey;
}) {
  const Comp = DEMOS[layerKey];
  return <Comp />;
}
