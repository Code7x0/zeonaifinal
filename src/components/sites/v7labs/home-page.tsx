import { ArchitectureSection } from "./architecture-section";
import { CustomerStoriesSection } from "./customer-stories";
import { EngineeringSection } from "./engineering/engineering-section";
import { FeatureBentos } from "./feature-bentos";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { Industries } from "./industries";
import { LogoTicker } from "./logo-ticker";
import { QuoteMarquee } from "./quote-marquee";
import { RoleConfigurator } from "./role-configurator";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SmoothScroll } from "./smooth-scroll";
import { SecurityComplianceSection } from "./security-compliance-section";
import { TrustSection } from "./trust-section";

export function V7HomePage() {
  return (
    <SmoothScroll>
      <div className="v7-site min-h-screen bg-white text-black">
        <SiteHeader />
        <main>
          <Hero />
          <LogoTicker />
          <Industries />
          <QuoteMarquee />
          <FeatureBentos />
          <ArchitectureSection />
          <EngineeringSection />
          <RoleConfigurator />
          <CustomerStoriesSection />
          <TrustSection />
          <SecurityComplianceSection />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
