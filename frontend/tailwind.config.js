/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        footprints: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1, transform: "translateX(5px) translateY(-5px)" },
        },
      },
      animation: {
        footprints: "footprints 1.5s ease-in-out infinite",
        bounce: "bounce 1.5s infinite", // Existing bounce animation
      },
    },
  },
  plugins: [],
};
