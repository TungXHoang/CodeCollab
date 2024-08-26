/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		color: {
			navBarBackground: "hsl(220,10%,20%)",
		},
	},
	variants: {
		fill: ["hover", "focus"],
		border: ["first", "last"],
	},
	plugins: [require("@tailwindcss/forms")],
};
