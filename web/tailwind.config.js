/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '../design-system/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Google Sans'", 'sans-serif'],
        'google-sans': ["'Google Sans'", 'sans-serif'],
      },
      colors: {
        emerald: {
          50: '#F5F8EE',
          100: '#E7F1DC',
          200: '#D0E4BA',
          300: '#AFD28E',
          400: '#557F1B', // User's exact Security Engine color for text highlights & accents
          500: '#557F1B', // User's exact button color throughout the web app
          600: '#466B16', // Hover state for buttons
          700: '#557F1B', // Light-background headings (matches Security Engine / Agencies)
          800: '#2A410D',
          900: '#1E2C0A',
          950: '#0E1604',
        },
        brand: {
          primary: '#557F1B',
          hover: '#659620',
          glow: 'rgba(85, 127, 27, 0.35)',
        },
        rose: {
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          950: '#2A0812',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
};
