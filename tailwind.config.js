/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

// *::tailwind.config.js::*
/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: "",
  content: [
    "./src//*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#101820",
        yellowAccent: "#FEE715",
      }
    }

  },
  plugins: [],
}