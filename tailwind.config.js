const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))"
      }
    },
    textShadow: {}
  },
  plugins: [
    // Text shadow utility
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": val => ({
            "text-shadow": `${val} 0 0 15px, ${val} 0 0 15px`
          }),
          "text-shadow-thick": val => ({
            "text-shadow": `${val} 0 0 2px, ${val} 0 0 5px, ${val} 0 0 5px`
          }),
        },
        { values: theme("textShadow") }
      );
    })
  ],
};
