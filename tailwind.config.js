/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        "dv-black": "#1F2937",
        "dv-black-deep": "#111827",
        "dv-red": "#A80000",
        "dv-red-light": "#C94040",
        "dv-red-dark": "#540000",
        "dv-red-muted": "rgba(168, 0, 0, 0.08)",
        "dv-yellow": "#FFD166",
        "dv-gray-100": "#F4F6F8",
        "dv-gray-200": "#EDF0F4",
        "dv-gray-300": "#DDE3EB",
        "dv-gray-400": "#C4CDD8",
        "dv-gray-500": "#9AA5B4",
        "dv-gray-600": "#6B7A8D",
        "dv-gray-700": "#4A5568",
        "dv-yellow-dark": "#F59E0B",
      },
      backgroundImage: {
        "dv-section-2": "linear-gradient(180deg, #F4F6F8 0%, #EDF0F4 100%)",
        "dv-section-3": "linear-gradient(180deg, #EDF0F4 0%, #DDE3EB 100%)",
        "dv-bg-2": "linear-gradient(135deg, #F4F6F8 0%, #EDF0F4 45%, #DDE3EB 100%)",
      },
      boxShadow: {
        "dv-sm": "0 1px 4px rgba(31, 41, 55, 0.06), 0 2px 8px rgba(31, 41, 55, 0.04)",
        "dv-md": "0 4px 16px rgba(31, 41, 55, 0.09), 0 2px 6px rgba(31, 41, 55, 0.05)",
        "dv-red": "0 6px 24px rgba(168, 0, 0, 0.22)",
      },
    },
  },
  plugins: [],
};
