"use client";

import type { ReactNode } from "react";
import {
  BarChart3,
  Bot,
  FileSearch,
  FolderOpen,
  GitBranch,
  MessageSquare,
} from "lucide-react";

import { Feature108 } from "@/components/blocks/shadcnblocks-com-feature108";
import type { PlatformScreenId } from "@/components/blocks/platform-screens";

const PLATFORM_TABS: {
  value: string;
  icon: ReactNode;
  label: string;
  content: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    screenId: PlatformScreenId;
  };
}[] = [
  {
    value: "ask-ai",
    icon: <MessageSquare className="h-auto w-4 shrink-0" />,
    label: "Ask AI",
    content: {
      badge: "Cited answers",
      title: "Answers from your documents, with sources you can trust.",
      description:
        "A persona-aware copilot that retrieves from AI Drive, cites every source, and respects role-based access — so finance, legal, and operations get the right answer every time.",
      buttonText: "Book a demo",
      screenId: "ask-ai",
    },
  },
  {
    value: "ai-drive",
    icon: <FolderOpen className="h-auto w-4 shrink-0" />,
    label: "AI Drive",
    content: {
      badge: "Governed documents",
      title: "Versions, lineage, and permissions on every file.",
      description:
        "Keep policies, contracts, and operational packs indexed and access-controlled. Teams work from the same governed library instead of scattered shares.",
      buttonText: "See the platform",
      screenId: "ai-drive",
    },
  },
  {
    value: "workflows",
    icon: <GitBranch className="h-auto w-4 shrink-0" />,
    label: "Workflows",
    content: {
      badge: "People on the exceptions",
      title: "Agents and people, with a full audit trail.",
      description:
        "Steps, approvals, and routing from inbox to ERP. Agents handle the routine work; humans review the exceptions that matter.",
      buttonText: "Book a demo",
      screenId: "workflows",
    },
  },
  {
    value: "dashboards",
    icon: <BarChart3 className="h-auto w-4 shrink-0" />,
    label: "AI Dashboards",
    content: {
      badge: "Operational overview",
      title: "Analytics built from the sources your teams already trust.",
      description:
        "Turn Excel and database feeds into live operational views — throughput, completion, pending reviews — with clarity for leadership.",
      buttonText: "Book a demo",
      screenId: "dashboards",
    },
  },
  {
    value: "contracts",
    icon: <FileSearch className="h-auto w-4 shrink-0" />,
    label: "Contracts",
    content: {
      badge: "Clause extraction",
      title: "Read clauses, extract terms, flag risk for review.",
      description:
        "Document-centric review with highlighted clauses, extracted commercial terms, and a clear path to legal verification.",
      buttonText: "Book a demo",
      screenId: "contracts",
    },
  },
  {
    value: "agent-hub",
    icon: <Bot className="h-auto w-4 shrink-0" />,
    label: "Agent Hub",
    content: {
      badge: "50+ agents",
      title: "Agents grouped by function, ready to run.",
      description:
        "Invoice matching, KYC, reconciliation, and more — each agent runs a workflow of sub-agents with human review where it counts.",
      buttonText: "Browse Agent Hub",
      screenId: "agent-hub",
    },
  },
];

export function FeatureBentos() {
  return (
    <section id="platform" className="scroll-mt-24 bg-white">
      <Feature108
        heading="How ZeonAI is shaping decisions across the enterprise"
        description="One platform, every business process, and one place to enhance them — with access control and an audit log built in."
        tabs={PLATFORM_TABS}
        autoplay
      />
    </section>
  );
}
