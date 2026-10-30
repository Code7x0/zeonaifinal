import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/v7labs/legal-page";

export const metadata: Metadata = {
  title: "Website terms | ZeonAI",
  description:
    "The terms on which ZeonAI Labs makes this website available.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Website terms"
      intro='The terms on which ZeonAI Labs (“ZeonAI”, “we”) makes this website available. By using the site you agree to them.'
      meta={[
        { label: "Last updated", value: "30 October 2026" },
        { label: "Applies to", value: "zeonai.com" },
        { label: "Governing law", value: "Queensland, Australia" },
      ]}
    >
      <section>
        <h2>About this site</h2>
        <p>
          This website describes ZeonAI&apos;s products and services. It is
          provided for general information. Nothing on it is an offer, a quote
          or professional advice, and the details of any engagement are set out
          in a separate written agreement.
        </p>
      </section>

      <section>
        <h2>Accuracy</h2>
        <p>
          We take care to keep the site accurate and current, but we do not
          guarantee that everything on it is complete or up to date at all
          times. Product capabilities, timelines and figures may change.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The content of this site, including text, design, illustrations and
          the ZeonAI name and mark, belongs to ZeonAI or is used with
          permission. Client and partner logos belong to their owners. You may
          view and print pages for your own reference; please ask before
          reusing anything else.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Please do not misuse the site, for example by attempting to interfere
          with it, scrape it at scale, or use it for anything unlawful. If you
          find a security issue, tell us at{" "}
          <a href="mailto:contact@zeonai.com">contact@zeonai.com</a> and we
          will respond in good faith.
        </p>
      </section>

      <section>
        <h2>Third-party links</h2>
        <p>
          The site may link to other websites. We are not responsible for their
          content or their privacy practices.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          To the extent permitted by law, ZeonAI is not liable for any loss
          arising from your use of, or reliance on, this website. Nothing in
          these terms limits rights you have under the Australian Consumer Law.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          Personal information collected through the site is handled as
          described in our{" "}
          <a href="/privacy-policy">privacy policy</a>.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. The date at the top shows
          when they were last changed. These terms are governed by the laws of
          Queensland, Australia.
        </p>
      </section>
    </LegalPage>
  );
}
