/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs':'330px',
        'xs': '430px',  // Define a custom breakpoint for extra small screens
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'progress-bar': 'scroll 4s ' ,
        
      },
      keyframes: {
        'scroll': {
          '100%': { transform: 'translateY(-100%)' },
          '0%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}