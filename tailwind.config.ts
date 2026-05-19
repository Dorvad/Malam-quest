import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#05091a',
          800: '#080d22',
          700: '#0d1330',
          600: '#111827',
          500: '#1a2240',
        },
        neon: {
          magenta: '#e879f9',
          pink: '#ec4899',
          blue: '#38bdf8',
          violet: '#818cf8',
          cyan: '#22d3ee',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
