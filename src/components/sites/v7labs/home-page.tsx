"use client";

import dynamic from "next/dynamic";
import { ArchitectureSection } from "./architecture-section";
import { CustomerStoriesSection } from "./customer-stories";
import { DeploymentOptionsSection } from "./deployment-options-section";
import { FeatureBentos } from "./feature-bentos";
import { PartnersProgramsStrip } from "./partners-programs-strip";
import { WorksWithStrip } from "./works-with-strip";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { Industries } from "./industries";
import { LogoTicker } from "./logo-ticker";
import { QuoteMarquee } from "./quote-marquee";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScroll } from "./smooth-scroll";
import { TrustSection } from "./trust-section";
import { ScrollReveal } from "./motion/scroll-reveal";

/* Heavy below-fold sections — split from the first paint bundle */
const RoleConfigurator = dynamic(
  () =>
    import("./role-configurator").then((m) => ({
      default: m.RoleConfigurator,
    })),
  { ssr: true },
);
const SecurityComplianceSection = dynamic(
  () =>
    import("./security-compliance-section").then((m) => ({
      default: m.SecurityComplianceSection,
    })),
  { ssr: true },
);

export function V7HomePage() {
  return (
    <SmoothScroll>
      <div className="v7-site min-h-screen bg-[var(--color-bg-default,#FFFFFF)] text-[var(--color-text-heading,#181D27)]">
        <SiteHeader />
        <main>
          <Hero />
          <ScrollReveal y={14}>
            <LogoTicker />
          </ScrollReveal>
          <ScrollReveal y={14} delay={0.04}>
            <PartnersProgramsStrip />
          </ScrollReveal>
          <Industries />
          <QuoteMarquee />
          <FeatureBentos />
          <ArchitectureSection />
          <RoleConfigurator />
          <ScrollReveal y={16}>
            <WorksWithStrip />
          </ScrollReveal>
          <CustomerStoriesSection />
          <TrustSection />
          <SecurityComplianceSection />
          <DeploymentOptionsSection />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
