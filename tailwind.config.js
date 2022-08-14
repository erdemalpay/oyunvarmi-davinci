/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        germania: ["Germania One", "cursive"],
        merriweather: ["Merriweather", "serif"],
      },
      colors: {
        "light-brown": "#F7D8B9",
        "dark-brown": "#614222",
      },
    },
  },
  plugins: [],
};
