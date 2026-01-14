/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nocturne: {
          50: "#e8faff",
          100: "#c9f4ff",
          200: "#9ee6ff",
          300: "#69d0ff",
          400: "#2eb3ff",
          500: "#1490e0",
          600: "#0e72b3",
          700: "#0d5b8d",
          800: "#10496e",
          900: "#132f46",
          950: "#0a1723",
        },
      },
      backgroundImage: {
        "royal-nocturne":
          "linear-gradient(to bottom right, #0f172a, #1e1b4b, #000000)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(34,211,238,0.25)",
      },
    },
  },
  plugins: [],
};
