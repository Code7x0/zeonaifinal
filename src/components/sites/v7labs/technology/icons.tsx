import type { ReactNode } from "react";

type IconProps = { children: ReactNode };

function Svg({ children }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const TechIcons = {
  spark: (
    <Svg>
      <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />
    </Svg>
  ),
  eye: (
    <Svg>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  ),
  lock: (
    <Svg>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </Svg>
  ),
  doc: (
    <Svg>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </Svg>
  ),
  lines: (
    <Svg>
      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
    </Svg>
  ),
  layers: (
    <Svg>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Svg>
  ),
  search: (
    <Svg>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </Svg>
  ),
  check: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l3 3 5-6" />
    </Svg>
  ),
  person: (
    <Svg>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </Svg>
  ),
  db: (
    <Svg>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </Svg>
  ),
  harness: (
    <Svg>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M7 12h3c4 0 3-7 7-7M10 12c4 0 3 7 7 7" />
    </Svg>
  ),
  bot: (
    <Svg>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4M9.5 13v2M14.5 13v2" />
    </Svg>
  ),
  grid: (
    <Svg>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
      <path d="M11 7.5h5.5V13" />
    </Svg>
  ),
  page: (
    <Svg>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </Svg>
  ),
  gauge: (
    <Svg>
      <path d="M4 17a8 8 0 1116 0" />
      <path d="M12 17l4-6" />
    </Svg>
  ),
  stop: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z" />
    </Svg>
  ),
  servers: (
    <Svg>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <path d="M8 7h.01M8 17h.01" />
    </Svg>
  ),
  funnel: (
    <Svg>
      <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4" />
    </Svg>
  ),
  refresh: (
    <Svg>
      <path d="M4 11a8 8 0 0114-4l2 2M20 4v5h-5M20 13a8 8 0 01-14 4l-2-2M4 20v-5h5" />
    </Svg>
  ),
  chat: (
    <Svg>
      <path d="M4 5h16v11H10l-6 4z" />
    </Svg>
  ),
} as const;

export const IconSparkle = () => TechIcons.spark;
export const IconEye = () => TechIcons.eye;
export const IconLock = () => TechIcons.lock;
export const IconDocument = () => TechIcons.doc;
export const IconLines = () => TechIcons.lines;
export const IconLayers = () => TechIcons.layers;
export const IconSearch = () => TechIcons.search;
export const IconCheckCircle = () => TechIcons.check;
export const IconPerson = () => TechIcons.person;
export const IconDatabase = () => TechIcons.db;
export const IconHarness = () => TechIcons.harness;
export const IconAgent = () => TechIcons.bot;
export const IconWorkflow = () => TechIcons.grid;
export const IconMeter = () => TechIcons.page;
export const IconGauge = () => TechIcons.gauge;
export const IconStopMeter = () => TechIcons.stop;
export const IconShield = () => TechIcons.shield;
export const IconServers = () => TechIcons.servers;
export const IconGovernedFetch = () => TechIcons.funnel;
export const IconRefresh = () => TechIcons.refresh;
export const IconChat = () => TechIcons.chat;
