/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",       // page background
        ink2: "#111114",      // panels
        ink3: "#17171c",      // cards
        pop: "#FFE500",       // signature yellow (the circles)
        popline: "#FF2D2D",   // red circle border
        gold: "#C9A24B",      // active nav / accents
        mute: "#8b8b93",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        spinSlow: "spinSlow 40s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
