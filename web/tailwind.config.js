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
          400: '#1A220F', // User's exact green color for words and highlights
          500: '#1A220F', // Primary button color (#1A220F)
          600: '#253317', // Hover state for buttons
          700: '#151C0C',
          800: '#11170A',
          900: '#0D1208',
          950: '#070A04',
        },
        brand: {
          primary: '#1A220F',
          hover: '#253317',
          glow: 'rgba(26, 34, 15, 0.45)',
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
