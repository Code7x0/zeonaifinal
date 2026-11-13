import { Inter } from "next/font/google";
import localFont from "next/font/local";

/** Self-hosted Inter — Apple HIG fallback for under-the-hood section */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Primary typeface from scale.com (Aeonik Pro) — used site-wide */
export const aeonik = localFont({
  src: [
    {
      path: "../../../../public/sites/v7labs/fonts/aeonik-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/sites/v7labs/fonts/aeonik-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/sites/v7labs/fonts/aeonik-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
});
