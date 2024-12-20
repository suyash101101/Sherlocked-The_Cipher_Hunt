/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        vintageBrown: '#4B3A2F', // Sherlock Holmes theme color
        parchment: '#D4B483',
        accent: '#9E8C6E',
      },
      fontFamily: {
        sherlock: ['"Times New Roman"', 'serif'], // Classic detective font
      },
    },
  },
  plugins: [],
};
