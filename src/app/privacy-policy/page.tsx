import type { Metadata } from "next";
import { LegalPage } from "@/components/sites/v7labs/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy | ZeonAI",
  description:
    "How ZeonAI Labs handles personal information on this website, in line with the Australian Privacy Principles.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="How ZeonAI Labs (“ZeonAI”, “we”) handles personal information on this website, in line with the Australian Privacy Principles."
      meta={[
        { label: "Last updated", value: "30 October 2026" },
        { label: "Applies to", value: "zeonai.com" },
        { label: "Questions", value: "contact@zeonai.com" },
      ]}
    >
      <section>
        <h2>What we collect</h2>
        <p>
          If you contact us through the website, the details you choose to send
          us: your name, work email, phone number, organisation, role and the
          message you write. The contact form sends your enquiry to us, and we
          store the name, email address, organisation and message you enter.
          When you submit the contact form, we may also store a scrambled
          (hashed) code derived from your internet address, never the address
          itself, to limit repeat or automated submissions.
        </p>
        <p>
          We may also collect standard technical information that any website
          receives, such as the pages visited and the browser used, to
          understand how the site is performing. This information is not used to
          identify you.
        </p>
      </section>

      <section>
        <h2>Analytics cookies</h2>
        <p>
          We may use analytics to understand how visitors use this site.
          Analytics cookies stay off unless you accept them. We do not use
          advertising storage or ad personalisation.
        </p>
        <p>
          You can change your choice at any time by clearing cookies in your
          browser. For privacy questions, write to{" "}
          <a href="mailto:contact@zeonai.com">contact@zeonai.com</a>.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          To reply to you, to arrange the conversation or demo you asked about,
          and to keep a record of that correspondence. We do not sell personal
          information, and we do not add you to a mailing list without asking
          first.
        </p>
      </section>

      <section>
        <h2>Sharing</h2>
        <p>
          We share personal information only with service providers that help us
          run the business (for example, email and hosting providers), and only
          as needed for that purpose. We may also disclose information where the
          law requires it.
        </p>
      </section>

      <section>
        <h2>Storage and security</h2>
        <p>
          Personal information is stored in Australia or with providers that
          hold it securely on our behalf. We keep it only as long as it is
          needed for the purpose it was collected, then delete it.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us what personal information we hold about you, ask us to
          correct it, or ask us to delete it. Write to{" "}
          <a href="mailto:contact@zeonai.com">contact@zeonai.com</a> and a
          person will respond within a reasonable time. If you are not satisfied
          with our response, you can contact the Office of the Australian
          Information Commissioner.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          This site uses only essential storage, such as remembering your cookie
          choice, plus analytics cookies that stay off unless you accept them.
          It does not use advertising cookies.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. The date at the top shows
          when it was last changed.
        </p>
      </section>
    </LegalPage>
  );
}
