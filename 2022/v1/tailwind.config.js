/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hiati: '#190e36',
        aqua: '#17f5b9',
      }
    },
    fontFamily: {
      "poppins": ["Poppins", "sans-serif"],
    }
  },
  plugins: [],
}