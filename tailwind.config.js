/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090909",
        bg2: "#111111",
        bg3: "#181818",
        surface: "#0f0f0f",
        border: "#1f1f1f",
        border2: "#2a2a2a",
        fg: "#e8e6df",
        fg2: "#8a8a80",
        fg3: "#444444",
        muted: "#6b7280",
        accent: "#a8ff78",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
