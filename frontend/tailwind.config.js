/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Enable custom transformations if needed
      transform: ['hover', 'focus'],
      // Extend the default theme to support rotateX and rotateY
      rotate: {
        'x': 'rotateX',
        'y': 'rotateY',
      },
      keyframes: {
        parallaxEffect: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-10px)" },
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        footprints: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1, transform: "translateX(5px) translateY(-5px)" },
        },
      },
      animation: {
        footprints: "footprints 1.5s ease-in-out infinite", 
        bounce: "bounce 1.5s infinite", // Existing bounce animation
        parallaxEffect: "parallaxEffect 2s infinite alternate",
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  mode: 'jit',
};
