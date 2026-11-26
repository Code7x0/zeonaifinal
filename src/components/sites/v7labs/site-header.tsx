"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  durationNav,
  durationUi,
  easeOut,
  springNav,
  staggerFast,
} from "./motion";
import { V7Logo } from "./logo";
import {
  clearHeaderChromeOffset,
  setHeaderChromeOffset,
} from "./nav-chrome";
import { NAV_GROUPS, type NavGroup } from "./nav-data";
import { ZeonLinkButton } from "./zeon-ui";

function groupIsActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => {
    const path = item.href.split("#")[0] ?? item.href;
    return path === pathname || (path !== "/" && pathname.startsWith(`${path}/`));
  });
}

type HeaderBarProps = {
  open: string | null;
  setOpen: (v: string | null) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  mobileExpanded: string | null;
  setMobileExpanded: (v: string | null) => void;
  /** Only the visible header instance should render the mega-menu panel. */
  showMega: boolean;
};

function HeaderBar({
  open,
  setOpen,
  mobileOpen,
  setMobileOpen,
  mobileExpanded,
  setMobileExpanded,
  showMega,
}: HeaderBarProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const pathname = usePathname() ?? "/";
  const navId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openGroup = (group: NavGroup) => {
    clearCloseTimer();
    setOpen(group.label);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(null);
    }, 120);
  };

  useEffect(() => () => clearCloseTimer(), []);

  const onTriggerKeyDown = (
    e: ReactKeyboardEvent<HTMLButtonElement>,
    group: NavGroup,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open === group.label) {
        setOpen(null);
      } else {
        openGroup(group);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openGroup(group);
      requestAnimationFrame(() => {
        document
          .getElementById(`${navId}-${group.id}-0`)
          ?.focus();
      });
    }
    if (e.key === "Escape") {
      setOpen(null);
    }
  };

  const activeGroup = NAV_GROUPS.find((g) => g.label === open) ?? null;

  return (
    <header className="zeon-glass-nav relative z-50" data-zeon-nav-bar>
      <div className="mx-auto flex h-[56px] max-w-[var(--zeon-container-wide,1280px)] items-center justify-between gap-2 px-4 sm:h-[60px] sm:gap-4 sm:px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <a
            href="/"
            aria-label="ZeonAI home"
            className="zeon-press min-w-0 shrink rounded-sm text-black"
          >
            <V7Logo className="text-[15px]" />
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
            onMouseLeave={scheduleClose}
          >
            {NAV_GROUPS.map((group) => {
              const isOpen = open === group.label;
              const isActive = groupIsActive(group, pathname);
              const panelId = `${navId}-panel-${group.id}`;
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => openGroup(group)}
                >
                  <button
                    type="button"
                    className="group relative inline-flex h-[34px] items-center gap-1 rounded-[2px] px-3 text-[13px] text-[var(--dp-gray-600,#535862)] transition-[color,background-color,box-shadow] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:bg-[var(--dp-blue-50,#EEF4FF)] hover:text-[var(--dp-blue-700,#1433E1)] focus-visible:outline-none focus-visible:shadow-[var(--zeon-focus-ring)] data-[open=true]:bg-[var(--dp-blue-600,#1B46F5)] data-[open=true]:text-white data-[open=true]:shadow-[inset_0_0_0_1px_rgba(41,98,255,0.45)] data-[active=true]:bg-[var(--dp-blue-50,#EEF4FF)] data-[active=true]:text-[var(--dp-blue-700,#1433E1)] data-[active=true]:data-[open=true]:bg-[var(--dp-blue-600,#1B46F5)] data-[active=true]:data-[open=true]:text-white"
                    data-open={isOpen}
                    data-active={isActive && !isOpen}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={panelId}
                    onKeyDown={(e) => onTriggerKeyDown(e, group)}
                    onFocus={() => openGroup(group)}
                    onClick={() =>
                      isOpen ? setOpen(null) : openGroup(group)
                    }
                  >
                    {group.label}
                    <ChevronDown
                      className={`size-3.5 opacity-60 transition-[transform,opacity,color] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] group-hover:text-[var(--dp-blue-700,#1433E1)] data-[open=true]:text-white ${
                        isOpen ? "rotate-180 opacity-90" : ""
                      }`}
                      aria-hidden
                      data-open={isOpen}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ZeonLinkButton href="/demo" tone="accent" size="sm">
            Book a demo
          </ZeonLinkButton>
          <button
            type="button"
            className="zeon-press zeon-focusable inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/50 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={`${navId}-mobile-panel`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu — full-width panel, hover bridge via padding-top */}
      <AnimatePresence initial={false}>
        {showMega && activeGroup ? (
          <motion.div
            key={activeGroup.id}
            id={`${navId}-panel-${activeGroup.id}`}
            role="region"
            aria-label={`${activeGroup.label} menu`}
            className="zeon-glass-panel absolute inset-x-0 top-full z-[60] hidden lg:block"
            initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.995 }
            }
            style={{ transformOrigin: "top center" }}
            transition={reduceMotion ? { duration: 0 } : springNav}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
          >
            {/* Invisible bridge so cursor can travel from trigger into panel */}
            <div className="h-2 w-full" aria-hidden />
            <div className="mx-auto max-w-[1400px] px-5 pb-7 md:px-8">
              <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                {activeGroup.items.map((item, i) => (
                  <li key={item.href}>
                    <a
                      id={`${navId}-${activeGroup.id}-${i}`}
                      href={item.href}
                      className="group/item block px-3 py-3 text-[#181D27] no-underline transition-[background-color,transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#181D27]/[0.04] focus-visible:bg-[#181D27]/[0.06] focus-visible:outline-none active:scale-[0.995]"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setOpen(null);
                      }}
                    >
                      <span className="block text-[14px] font-medium tracking-[-0.01em] transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:text-black">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[12px] leading-[1.45] text-[#535862] transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/item:text-[#3d4544]">
                        {item.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile accordion */}
      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-nav"
            id={`${navId}-mobile-panel`}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="max-h-[min(calc(100dvh-56px),720px)] overflow-y-auto overscroll-contain border-t border-black/5 bg-white lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.42, ease: easeOut }
            }
          >
            <div className="px-4 py-4 sm:px-5">
              {NAV_GROUPS.map((group, gi) => {
                const expanded = mobileExpanded === group.label;
                return (
                  <motion.div
                    key={group.id}
                    className="border-b border-black/5 py-1 last:border-b-0"
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: durationUi,
                            delay: 0.04 + gi * staggerFast,
                            ease: easeOut,
                          }
                    }
                  >
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center justify-between py-2.5 text-left text-[15px] font-medium text-[#181D27]"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileExpanded(expanded ? null : group.label)
                      }
                    >
                      {group.label}
                      <ChevronDown
                        className={`size-4 text-black/40 transition-transform duration-300 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.div
                          key={`${group.id}-children`}
                          className="overflow-hidden pb-2"
                          initial={
                            reduceMotion ? false : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            reduceMotion
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { duration: 0.28, ease: easeOut }
                          }
                        >
                          {group.items.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              className="block min-h-11 py-2.5 pl-1 text-[15px] text-black/75 no-underline"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <ZeonLinkButton
                href="/demo"
                tone="accent"
                block
                className="mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Book a demo
              </ZeonLinkButton>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/**
 * Navbar behavior:
 * - At top / scrolling down: in-flow header scrolls away with the page (not sticky).
 * - Scrolling up / top-edge hover: fixed bar slides in.
 * - Desktop: multi-column mega-menu (links only).
 * - Publishes --zeon-header-offset for sticky page rails (Technology chips, etc.).
 */
export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const scrollingUp = useRef(false);
  const nearTopHover = useRef(false);
  const scrollY = useRef(0);
  const mobileOpenRef = useRef(mobileOpen);
  const inflowRef = useRef<HTMLDivElement>(null);
  const headerHeightRef = useRef(60);
  const inflowVisibleRef = useRef(true);
  const floatingVisibleRef = useRef(false);
  const reduceMotion = useReducedMotion();

  mobileOpenRef.current = mobileOpen;

  const publishHeaderOffset = useCallback(() => {
    const height = headerHeightRef.current || 60;
    const occupiesTop =
      inflowVisibleRef.current || floatingVisibleRef.current;
    setHeaderChromeOffset(occupiesTop ? height : 0, height);
  }, []);

  const syncFloating = useCallback(() => {
    const past = scrollY.current > 80;
    const next = past
      ? scrollingUp.current || nearTopHover.current || mobileOpenRef.current
      : false;
    floatingVisibleRef.current = next;
    setFloatingVisible((prev) => (prev === next ? prev : next));
    publishHeaderOffset();
  }, [publishHeaderOffset]);

  useLenis(({ scroll, direction }) => {
    scrollY.current = scroll;
    if (direction === -1) scrollingUp.current = true;
    else if (direction === 1) scrollingUp.current = false;
    syncFloating();
  });

  /* Native scroll fallback when Lenis is off (reduced-motion / coarse pointer). */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      scrollY.current = y;
      if (y < lastY - 1) scrollingUp.current = true;
      else if (y > lastY + 1) scrollingUp.current = false;
      lastY = y;
      syncFloating();
    };
    scrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncFloating]);

  useEffect(() => {
    scrollY.current = window.scrollY;
    const onMove = (e: MouseEvent) => {
      nearTopHover.current = e.clientY <= 72;
      syncFloating();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    syncFloating();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [syncFloating]);

  useEffect(() => {
    syncFloating();
  }, [mobileOpen, syncFloating]);

  /* Lock page scroll while the mobile menu is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /* Measure real navbar height; observe whether the in-flow bar still intersects. */
  useEffect(() => {
    const inflow = inflowRef.current;
    if (!inflow) return;

    const measureHeight = () => {
      const bar =
        inflow.querySelector<HTMLElement>("[data-zeon-nav-bar]") ??
        document.querySelector<HTMLElement>("[data-zeon-nav-bar]");
      const h = bar?.getBoundingClientRect().height;
      if (h && h > 0) headerHeightRef.current = h;
      publishHeaderOffset();
    };

    measureHeight();

    const io = new IntersectionObserver(
      ([entry]) => {
        inflowVisibleRef.current = Boolean(entry?.isIntersecting);
        publishHeaderOffset();
      },
      { threshold: 0, rootMargin: "0px" },
    );
    io.observe(inflow);

    const ro = new ResizeObserver(() => measureHeight());
    ro.observe(inflow);
    const bar = inflow.querySelector("[data-zeon-nav-bar]");
    if (bar) ro.observe(bar);

    return () => {
      io.disconnect();
      ro.disconnect();
      clearHeaderChromeOffset();
    };
  }, [publishHeaderOffset]);

  const barProps = {
    open,
    setOpen,
    mobileOpen,
    setMobileOpen,
    mobileExpanded,
    setMobileExpanded,
  };

  return (
    <>
      <div className="relative z-50" ref={inflowRef} data-zeon-nav-inflow>
        <HeaderBar {...barProps} showMega={!floatingVisible} />
      </div>

      <AnimatePresence>
        {floatingVisible ? (
          <motion.div
            key="floating-nav"
            className="fixed inset-x-0 top-0 z-[60]"
            data-zeon-nav-floating=""
            initial={reduceMotion ? false : { y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { y: "-100%", opacity: 0 }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durationNav, ease: easeOut }
            }
          >
            <HeaderBar {...barProps} showMega />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
