/**
 * DeepProbe / ZeonAI brand palette.
 * Source: https://deepprobe-colours.netlify.app/
 * Prefer CSS variables (var(--dp-*) / var(--zeon-*)) in components;
 * use this module only where JS needs raw hex (canvas, charts, motion).
 */

export const DP = {
  blue: {
    50: "#EEF4FF",
    100: "#D9E6FF",
    200: "#BCD3FF",
    300: "#8EB8FF",
    400: "#5991FF",
    500: "#2962FF",
    600: "#1B46F5",
    700: "#1433E1",
    800: "#172AB6",
    900: "#192A8F",
  },
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E9EAEB",
    300: "#D5D7DA",
    400: "#A4A7AE",
    500: "#717680",
    600: "#535862",
    700: "#414651",
    800: "#252B37",
    900: "#181D27",
  },
  green: {
    50: "#ECFDF3",
    500: "#17B26A",
    600: "#079455",
  },
  amber: {
    50: "#FFFAEB",
    300: "#FEC84B",
    500: "#F79009",
    600: "#DC6803",
  },
  red: {
    50: "#FEF3F2",
    500: "#F04438",
  },
  teal: {
    50: "#F0FDF9",
    500: "#15B79E",
    600: "#0E9384",
  },
  indigo: {
    50: "#EEF4FF",
    200: "#C7D7FE",
    500: "#6172F3",
    600: "#444CE7",
  },
  white: "#FFFFFF",
  logoStart: "#0025FF",
  logoEnd: "#05A1FD",
} as const;

/** Semantic aliases for product UI / diagrams */
export const brand = {
  cta: DP.blue[600],
  brand: DP.blue[500],
  hover: DP.blue[700],
  tint: DP.blue[50],
  heading: DP.gray[900],
  body: DP.gray[600],
  muted: DP.gray[500],
  border: DP.gray[200],
  surface: DP.gray[50],
  bg: DP.white,
  inverse: DP.gray[900],
  inverseBorder: DP.gray[800],
  teal: DP.teal[500],
  indigo: DP.indigo[500],
  success: DP.green[500],
  warning: DP.amber[500],
  error: DP.red[500],
  logoGradient: `linear-gradient(90deg, ${DP.logoStart}, ${DP.logoEnd})`,
} as const;
