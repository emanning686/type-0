/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeOut: {
          "0%": { opacity: 0.65 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-in-out",
      },
    },
  },
  plugins: [],
};
