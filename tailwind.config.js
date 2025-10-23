
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0C0C0C", gold: "#C6A746", copper: "#B87333",
        walnut: "#3E2723", steel: "#C0C0C0", indigoResin: "#1A237E"
      },
      fontFamily: { display: ['"Cinzel"', "serif"], body: ["Montserrat","ui-sans-serif","system-ui"]},
      boxShadow: { glow: "0 0 40px rgba(198,167,70,0.25)" }
    }
  },
  plugins: [require("@tailwindcss/forms")]
}
