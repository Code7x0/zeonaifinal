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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  durationNav,
  durationUi,
  easeOut,
  springNav,
  staggerFast,
} from "./motion";
import { V7Logo } from "./logo";
import { NAV_GROUPS, type NavGroup } from "./nav-data";
import { ZeonLinkButton } from "./zeon-ui";

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
    <header className="zeon-glass-nav relative z-50">
      <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex items-center gap-8">
          <a
            href="/"
            aria-label="ZeonAI home"
            className="zeon-press rounded-sm text-black"
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
              const panelId = `${navId}-panel-${group.id}`;
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => openGroup(group)}
                >
                  <button
                    type="button"
                    className="group relative inline-flex h-[34px] items-center gap-1 rounded-full px-3 text-[13px] text-black/55 transition-[color,background-color] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:bg-black/[0.04] hover:text-[#111318] data-[open=true]:bg-black/[0.05] data-[open=true]:text-[#111318]"
                    data-open={isOpen}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-haspopup="true"
                    onKeyDown={(e) => onTriggerKeyDown(e, group)}
                    onFocus={() => openGroup(group)}
                    onClick={() =>
                      isOpen ? setOpen(null) : openGroup(group)
                    }
                  >
                    {group.label}
                    <ChevronDown
                      className={`size-3.5 opacity-60 transition-transform duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-3 -bottom-px h-[2px] origin-left rounded-full bg-[#356DFF] transition-transform duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] ${
                        isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/platform"
            className="group relative hidden rounded-sm px-1 py-2 text-[13px] text-black/55 no-underline transition-colors duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:text-[#111318] sm:inline"
          >
            See the platform
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-1 -bottom-px h-[2px] origin-left scale-x-0 rounded-full bg-[#356DFF] transition-transform duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] group-hover:scale-x-100"
            />
          </a>
          <ZeonLinkButton href="/demo" tone="soft" size="sm">
            Book a demo
          </ZeonLinkButton>
          <button
            type="button"
            className="zeon-press zeon-focusable inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/50 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
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
                      className="group/item block rounded-[8px] px-3 py-3 text-[#111318] no-underline transition-[background-color,transform] duration-[var(--zeon-duration-hover)] ease-[var(--zeon-ease-out)] hover:bg-[#F6F4EF]/90 focus-visible:bg-[#F6F4EF] focus-visible:outline-none focus-visible:shadow-[var(--zeon-focus-ring)] active:scale-[0.995]"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setOpen(null);
                      }}
                    >
                      <span className="block text-[14px] font-medium tracking-[-0.01em]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[12px] leading-[1.45] text-[#5B6766]">
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
            className="max-h-[min(80vh,640px)] overflow-y-auto border-t border-black/5 bg-white lg:hidden"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.42, ease: easeOut }
            }
          >
            <div className="px-5 py-4">
              {NAV_GROUPS.map((group, gi) => {
                const expanded = mobileExpanded === group.label;
                return (
                  <motion.div
                    key={group.id}
                    className="border-b border-black/5 py-2 last:border-b-0"
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
                      className="flex w-full items-center justify-between py-2 text-left text-[14px] font-medium text-[#111318]"
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
                              className="block py-2 pl-1 text-[14px] text-black/75 no-underline"
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
                tone="soft"
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
  const reduceMotion = useReducedMotion();

  mobileOpenRef.current = mobileOpen;

  const syncFloating = useCallback(() => {
    const past = scrollY.current > 80;
    if (!past) {
      setFloatingVisible(false);
      return;
    }
    setFloatingVisible(
      scrollingUp.current || nearTopHover.current || mobileOpenRef.current,
    );
  }, []);

  useLenis(({ scroll, direction }) => {
    scrollY.current = scroll;
    if (direction === -1) scrollingUp.current = true;
    else if (direction === 1) scrollingUp.current = false;
    syncFloating();
  });

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
      <div className="relative z-50">
        <HeaderBar {...barProps} showMega={!floatingVisible} />
      </div>

      <AnimatePresence>
        {floatingVisible ? (
          <motion.div
            key="floating-nav"
            className="fixed inset-x-0 top-0 z-[60]"
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
