/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
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
  plugins: [
   
  ],
}