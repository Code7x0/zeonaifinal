import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({
  children,
  title,
  intro,
}: {
  children: React.ReactNode;
  title: string;
  intro?: string;
}) {
  return (
    <div className="zeon-site min-h-screen bg-[var(--zeon-paper)] text-[var(--zeon-ink)]">
      <SiteHeader />
      <main id="main">
        <header className="border-b border-[var(--zeon-line)] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="zeon-gradient-bar mb-8 h-[2px] w-16" aria-hidden />
            <h1 className="max-w-[16ch] text-[40px] leading-[1.05] tracking-[-0.04em] md:text-[60px]">
              {title}
            </h1>
            {intro ? (
              <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.55] text-[var(--zeon-ink70)] md:text-[19px]">
                {intro}
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
