/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zoya: {
          50: '#FDF8F6',
          100: '#F9EFEB',
          200: '#F4DDD4',
          300: '#ECC4B6',
          400: '#E1A390',
          500: '#D47E68',
          600: '#C05E46',
          700: '#9E442F',
          800: '#7F3626',
          900: '#4E1D13',
          950: '#2A0B06',
        },
        roseGold: {
          light: '#F8E7E1',
          DEFAULT: '#E5A99B',
          dark: '#B76E79',
          metallic: '#C88A83',
        },
        henna: {
          fresh: '#2D3A1F',
          terracotta: '#8C3821',
          mahogany: '#541D12',
          deep: '#361109'
        },
        champagne: {
          light: '#FFFDF9',
          DEFAULT: '#F7E7CE',
          shimmer: '#E8D3B7'
        },
        plum: {
          dark: '#280F1E',
          royal: '#481E38',
          accent: '#7D325E'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Gulzar', 'Jameel Noori Nastaleeq', 'serif']
      }
    },
  },
  plugins: [],
}
