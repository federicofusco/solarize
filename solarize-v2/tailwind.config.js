/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "media",
	theme: {
		extend: {},
		fontFamily: {
			"poppins": ["Poppins", "sans-serif"],
			"source-sans": ["Source Sans Pro", "sans-serif"]
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}