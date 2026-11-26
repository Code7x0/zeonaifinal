import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CONNECTOR_GROUPS,
  type ConnectorItem,
} from "./integrations/connector-data";

const byName = (name: string): ConnectorItem | undefined => {
  for (const group of CONNECTOR_GROUPS) {
    const hit = group.items.find((item) => item.name === name);
    if (hit) return hit;
  }
  return undefined;
};

/** Homepage strip — matches visible inventory with cleared connector marks. */
const WORKS_WITH: ConnectorItem[] = [
  byName("SAP"),
  byName("Oracle"),
  byName("Dynamics 365"),
  byName("Xero"),
  byName("TechnologyOne"),
  byName("Snowflake"),
  byName("Databricks"),
  byName("PostgreSQL"),
  byName("SharePoint"),
  byName("OneDrive"),
].filter((item): item is ConnectorItem => Boolean(item));

/**
 * Mobile concentric orbital distribution — uses the exact WORKS_WITH logo set:
 * - Inner ring (32%): frames the central ZeonAI mark
 * - Medium ring (54%): 2 connectors spaced 180° apart (counter-clockwise)
 * - Outer ring (86%): 8 connectors spaced 45° apart (clockwise)
 */
const MEDIUM_RING_ITEMS: ConnectorItem[] = [
  byName("Xero"),
  byName("TechnologyOne"),
].filter((item): item is ConnectorItem => Boolean(item));

const OUTER_RING_ITEMS: ConnectorItem[] = [
  byName("SAP"),
  byName("Oracle"),
  byName("Snowflake"),
  byName("OneDrive"),
  byName("SharePoint"),
  byName("PostgreSQL"),
  byName("Databricks"),
  byName("Dynamics 365"),
].filter((item): item is ConnectorItem => Boolean(item));

function polarPct(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${(50 + radiusPct * Math.sin(rad)).toFixed(3)}%`,
    top: `${(50 - radiusPct * Math.cos(rad)).toFixed(3)}%`,
  };
}

function OrbitalBadge({
  item,
  counterClass,
  duration,
}: {
  item: ConnectorItem;
  counterClass: "zeon-orbit-cw" | "zeon-orbit-ccw";
  duration: string;
}) {
  const isWordmark = item.name === "TechnologyOne";
  return (
    <div
      className={`${counterClass} flex h-full w-full items-center justify-center rounded-full border border-[#E6ECF8] bg-white p-2 shadow-[0_6px_18px_rgba(24,29,39,0.08),0_1px_2px_rgba(24,29,39,0.05)]`}
      style={{ "--orbit-dur": duration } as CSSProperties}
      title={item.name}
    >
      {item.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- static brand SVGs from /public
        <img
          src={item.logoSrc}
          alt={item.name}
          width={36}
          height={36}
          className={
            isWordmark
              ? "max-h-[42%] w-auto max-w-[84%] object-contain"
              : "max-h-[68%] w-auto max-w-[74%] object-contain"
          }
          draggable={false}
        />
      ) : (
        <span className="text-center text-[10px] font-medium text-[#535862]">
          {item.shortName ?? item.name}
        </span>
      )}
    </div>
  );
}

function MobileOrbitalIntegrations() {
  const outerDur = "56s";
  const mediumDur = "40s";
  const innerDur = "30s";

  return (
    <div
      className="mx-auto mt-8 w-full max-w-[360px] py-3 md:hidden"
      aria-label="Common systems of record connected to AI Workspace"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div aria-hidden className="pt-[100%]" />
        {/* Soft radial atmosphere behind the central hub */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(41,98,255,0.09) 0%, rgba(41,98,255,0.025) 48%, transparent 72%)",
          }}
        />

        {/* Ring 1 — Small (32% diameter, frames the central hub) */}
        <div
          aria-hidden
          className="zeon-orbit-cw pointer-events-none absolute inset-0"
          style={{ "--orbit-dur": innerDur } as CSSProperties}
        >
          <div className="absolute left-1/2 top-1/2 size-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#B9CCFA]/85" />
        </div>

        {/* Ring 2 — Medium (54% diameter, counter-clockwise, 2 logos + 2 accent dots) */}
        <div
          className="zeon-orbit-ccw absolute inset-0"
          style={{ "--orbit-dur": mediumDur } as CSSProperties}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#B9CCFA]/80"
          />
          {[115, 295].map((deg) => (
            <span
              key={`m-dot-${deg}`}
              aria-hidden
              className="pointer-events-none absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2962FF] ring-[3px] ring-[#FAFAFA]"
              style={polarPct(deg, 27)}
            />
          ))}
          <ul className="m-0 list-none p-0">
            {MEDIUM_RING_ITEMS.map((item, idx) => {
              const deg = (idx / MEDIUM_RING_ITEMS.length) * 360;
              return (
                <li
                  key={item.name}
                  className="absolute size-[13%] -translate-x-1/2 -translate-y-1/2 list-none"
                  style={polarPct(deg, 27)}
                >
                  <OrbitalBadge
                    item={item}
                    counterClass="zeon-orbit-cw"
                    duration={mediumDur}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Ring 3 — Large (86% diameter, clockwise, 8 logos + 2 accent dots) */}
        <div
          className="zeon-orbit-cw absolute inset-0"
          style={{ "--orbit-dur": outerDur } as CSSProperties}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#B9CCFA]/75"
          />
          {[157.5, 337.5].map((deg) => (
            <span
              key={`o-dot-${deg}`}
              aria-hidden
              className="pointer-events-none absolute size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2962FF] ring-[3px] ring-[#FAFAFA]"
              style={polarPct(deg, 43)}
            />
          ))}
          <ul className="m-0 list-none p-0">
            {OUTER_RING_ITEMS.map((item, idx) => {
              const deg = (idx / OUTER_RING_ITEMS.length) * 360;
              return (
                <li
                  key={item.name}
                  className="absolute size-[13%] -translate-x-1/2 -translate-y-1/2 list-none"
                  style={polarPct(deg, 43)}
                >
                  <OrbitalBadge
                    item={item}
                    counterClass="zeon-orbit-ccw"
                    duration={outerDur}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Central ZeonAI hub */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex size-[18.5%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6ECF8] bg-white p-2.5 shadow-[0_10px_28px_rgba(24,29,39,0.1),0_2px_6px_rgba(24,29,39,0.06)]">
          <Image
            src="/sites/zeonai/mark.png"
            alt="ZeonAI"
            width={112}
            height={116}
            className="h-[68%] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function WorksWithStrip() {
  return (
    <section
      aria-labelledby="works-with-heading"
      className="border-t border-[#E9EAEB] bg-[#FAFAFA] px-4 py-12 sm:px-6 md:px-[var(--zeon-gutter,1.25rem)] md:py-16"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="works-with-heading"
              className="font-[family-name:var(--font-aeonik)] text-[22px] leading-[1.25] tracking-[-0.02em] text-[#181D27] md:text-[26px]"
            >
              Integrates with the systems your business already uses
            </h2>
            <p className="mt-2 max-w-[38rem] text-[14px] leading-[1.55] text-[#535862]">
              Connectors are scoped per engagement. These are common systems of
              record we connect to AI Workspace.
            </p>
          </div>
          <Link
            href="/integrations"
            className="zeon-link-arrow shrink-0 text-[13px]"
          >
            Full integration catalogue
          </Link>
        </div>

        {/* Mobile (<768px): rotating concentric orbital rings with upright logos */}
        <MobileOrbitalIntegrations />

        {/* Tablet & Desktop (>=768px): unchanged presentation */}
        <ul className="mt-10 hidden items-center justify-items-center gap-x-8 gap-y-8 md:grid md:grid-cols-5 lg:flex lg:items-center lg:justify-between lg:gap-6">
          {WORKS_WITH.map((item) => {
            const isWordmark = item.name === "TechnologyOne";
            return (
              <li
                key={item.name}
                className="flex h-11 list-none items-center justify-center"
                title={item.name}
              >
                {item.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- static brand SVGs from /public
                  <img
                    src={item.logoSrc}
                    alt={item.name}
                    width={140}
                    height={40}
                    className={`w-auto object-contain ${
                      isWordmark
                        ? "h-6 max-w-[124px] md:h-7 md:max-w-[132px]"
                        : "h-9 max-w-[104px] md:h-10 md:max-w-[116px]"
                    }`}
                    draggable={false}
                  />
                ) : (
                  <span className="text-center text-[15px] font-medium text-[#535862]">
                    {item.shortName ?? item.name}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
