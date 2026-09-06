import type { Config } from "tailwindcss";

// Design tokens — see README.md "Design system" for the reasoning behind
// the register (brand/experiential), the color strategy (drenched,
// per-universe), and the type pairing (Fraunces + Space Grotesk).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "oklch(14% 0.02 260)",
          deep: "oklch(9% 0.015 260)",
          raised: "oklch(19% 0.02 260)",
        },
        mist: "oklch(82% 0.01 260)",
        u1: {
          core: "oklch(45% 0.19 275)",
          accent: "oklch(72% 0.15 290)",
          fade: "oklch(55% 0.015 275)",
        },
        u2: {
          core: "oklch(75% 0.14 85)",
          accent: "oklch(87% 0.05 95)",
          fade: "oklch(58% 0.01 85)",
        },
        u3: {
          core: "oklch(93% 0.015 250)",
          accent: "oklch(86% 0.07 320)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        hud: "0.14em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
