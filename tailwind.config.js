/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-end infinite',
        typewriter: 'typewriter 2s steps(40) forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typewriter: {
          to: { width: '100%' },
        },
      },
      fontFamily: {
        'sans': ['var(--font-sans)', 'system-ui', 'sans-serif'],
        'source-hans': ['"Source Han Sans SC"', 'Noto Sans SC', 'sans-serif'],
        'lxgw': ['"LXGW WenKai"', 'serif'],
        'alibaba': ['"Alibaba PuHuiTi"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 