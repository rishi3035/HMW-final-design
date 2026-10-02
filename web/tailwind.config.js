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
          50: '#F7FDEE',
          100: '#EEFBD8',
          200: '#DCF7B0',
          300: '#C6F17E',
          400: '#94DC22', // User's vibrant lime green for text highlights & accents
          500: '#94DC22', // User's exact button lime green
          600: '#81C31C', // Hover state for buttons
          700: '#6AA314', // Deeper lime for light backgrounds
          800: '#517F0D',
          900: '#395B07',
          950: '#1F3302',
        },
        brand: {
          primary: '#94DC22',
          hover: '#81C31C',
          glow: 'rgba(148, 220, 34, 0.40)',
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
