import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#000000",
        accent: "#00E5FF",
        "accent-dim": "#00B8CC",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B3B3B3",
        "border-subtle": "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)",
        "card-glow":
          "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 60%)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 30px rgba(0,229,255,0.25)",
        "glow-accent-lg": "0 0 60px rgba(0,229,255,0.2)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.5)",
      },
      screens: {
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
