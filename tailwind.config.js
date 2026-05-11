/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080a",
          900: "#0a0a0c",
          800: "#101014",
          700: "#16161c",
          600: "#1d1d25",
        },
        chalk: {
          50: "#f5f5f7",
          100: "#e6e6ea",
          200: "#c9c9d1",
          300: "#9a9aa6",
          400: "#6d6d78",
          500: "#4a4a54",
        },
        accent: {
          DEFAULT: "#8b7cf6",
          soft: "#a99cf9",
          deep: "#5e4dd1",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        token: "14px",
        tokenLg: "20px",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
        lift:
          "0 30px 80px -30px rgba(139,124,246,0.25), 0 1px 0 0 rgba(255,255,255,0.06) inset",
      },
      backdropBlur: {
        glass: "24px",
      },
      letterSpacing: {
        tightish: "-0.02em",
        tighter2: "-0.035em",
      },
      maxWidth: {
        page: "1200px",
        prose2: "62ch",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
