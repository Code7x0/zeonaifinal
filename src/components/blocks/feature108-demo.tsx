import {
  BarChart3,
  Bot,
  FileSearch,
  FolderOpen,
  GitBranch,
  MessageSquare,
} from "lucide-react";

import { Feature108 } from "@/components/blocks/shadcnblocks-com-feature108";

const demoData = {
  badge: "AI Workspace",
  heading: "How ZeonAI is shaping decisions across the enterprise",
  description:
    "One platform, every business process, and one place to enhance them — with access control and an audit log built in.",
  tabs: [
    {
      value: "ask-ai",
      icon: <MessageSquare className="h-auto w-4 shrink-0" />,
      label: "Ask AI",
      content: {
        badge: "Cited answers",
        title: "Answers from your documents, with sources you can trust.",
        description:
          "A persona-aware copilot that retrieves from AI Drive, cites every source, and respects role-based access.",
        buttonText: "Book a demo",
        screenId: "ask-ai" as const,
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
          "Keep policies, contracts, and operational packs indexed and access-controlled.",
        buttonText: "See the platform",
        screenId: "ai-drive" as const,
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
          "Steps, approvals, and routing from inbox to ERP with humans on exceptions.",
        buttonText: "Book a demo",
        screenId: "workflows" as const,
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
          "Live operational views for throughput, completion, and pending reviews.",
        buttonText: "Book a demo",
        screenId: "dashboards" as const,
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
          "Document-centric review with highlighted clauses and extracted terms.",
        buttonText: "Book a demo",
        screenId: "contracts" as const,
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
          "Invoice matching, KYC, reconciliation — with human review where it counts.",
        buttonText: "Browse Agent Hub",
        screenId: "agent-hub" as const,
      },
    },
  ],
};

function Feature108Demo() {
  return <Feature108 {...demoData} autoplay />;
}

export { Feature108Demo, demoData };
