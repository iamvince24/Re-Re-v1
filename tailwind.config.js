/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "hero-pattern": "url('/img/hero-pattern.svg')",
      "footer-texture": "url('/img/footer-texture.png')",
    },

    colors: {
      colorText: "#2a2a2a",
      lightgray: "#f1f1f1",
      gray: "#b1b1b1",
      black: "000000",
      colorPrimary: "#3DD3D6",
      "color-accent": "#1bb8bc",
      "color-secondary": "#ffc244",
      white: "#ffffff",
      red: "#f00041",
    },

    border: {
      borderBig: "1rem",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
