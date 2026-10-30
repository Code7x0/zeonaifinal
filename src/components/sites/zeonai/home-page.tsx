import { Architecture } from "./architecture";
import { Capabilities } from "./capabilities";
import { Customers } from "./customers";
import { DemoForm } from "./demo-form";
import { Engineering } from "./engineering";
import { Hero } from "./hero";
import { Industries } from "./industries";
import { Integrations } from "./integrations";
import { Process } from "./process";
import { RoleSelector } from "./role-selector";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Solutions } from "./solutions";
import { Trust } from "./trust";
import { WorkspaceTour } from "./workspace-tour";

export function ZeonHomePage() {
  return (
    <div className="zeon-site min-h-screen bg-[var(--zeon-paper)] text-[var(--zeon-ink)]">
      <SiteHeader dark homeAnchors />
      <main id="main" className="-mt-16">
        <Hero />
        <WorkspaceTour />
        <Solutions />
        <Architecture />
        <Capabilities />
        <Engineering />
        <Industries />
        <Integrations />
        <Process />
        <RoleSelector />
        <Customers />
        <Trust />
        <DemoForm />
      </main>
      <SiteFooter />
    </div>
  );
}
