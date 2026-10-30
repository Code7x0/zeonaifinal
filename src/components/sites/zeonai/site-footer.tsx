import { offices } from "./content";
import { ZeonLogo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--zeon-line)] bg-[var(--zeon-mist)]/50 px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <ZeonLogo showTagline />
            <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.55] text-[var(--zeon-ink70)]">
              Governed AI for enterprise knowledge and workflows.
            </p>
            <p className="mt-2 text-[14px] text-[var(--zeon-fog)]">
              AI Workspace, the enterprise AI platform.
            </p>
            <a
              href="mailto:contact@zeonai.com"
              className="mt-6 inline-flex text-[15px] text-[var(--zeon-ink)] no-underline"
            >
              Talk to our team →
            </a>
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--zeon-fog)]">
              Product
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {[
                ["Platform", "/platform"],
                ["Solutions", "/#solutions"],
                ["Industries", "/industries"],
                ["Book a demo", "/demo"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[var(--zeon-ink70)] no-underline hover:text-[var(--zeon-ink)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--zeon-fog)]">
              Company
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {[
                ["About", "/about"],
                ["Customers", "/customers"],
                ["Trust", "/trust"],
                ["Contact", "mailto:contact@zeonai.com"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[var(--zeon-ink70)] no-underline hover:text-[var(--zeon-ink)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--zeon-fog)]">
              Offices
            </p>
            <ul className="mt-4 space-y-4">
              {offices.map((office) => (
                <li key={office.region}>
                  <p className="text-[14px] font-medium text-[var(--zeon-ink)]">
                    {office.region}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.45] text-[var(--zeon-ink70)]">
                    {office.address}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--zeon-line)] pt-6 text-[13px] text-[var(--zeon-fog)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ZeonAI Labs Private Ltd. All Rights Reserved</p>
          <div className="flex flex-wrap gap-5">
            <a
              href="mailto:contact@zeonai.com"
              className="text-inherit no-underline"
            >
              contact@zeonai.com
            </a>
            <a href="/privacy" className="text-inherit no-underline">
              Privacy policy
            </a>
            <a href="/terms" className="text-inherit no-underline">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
