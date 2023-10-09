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
      // "color-text": "#2a2a2a",
      // "color-primary-dark": "#0195e4",
      // "color-primary-light": "#3DD3D6",
      // "color-secondary": "#4be35a",
      // "color-tertiary": "#f7f7f7",
      // "color-orange": "#ef5350",
      // "color-outline": "#e9eaeb",
      // "border-radius": "5px",
      // "cell-height": "40px",
      // padding: "1rem",

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
