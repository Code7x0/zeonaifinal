import { redirect } from "next/navigation";

/** Canonical case-study index lives at /customers (brief §8). */
export default function CaseStudiesRedirect() {
  redirect("/customers");
}
