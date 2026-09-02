import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'temple-ivory': '#FAF7F2',
        'temple-alt': '#F3ECDD',
        'text-primary': '#1F2937',
        'text-secondary': '#4B5563',
        'accent-gold': '#F48D08', // Sacred Saffron Orange from official logo
        'accent-copper': '#D97706',
        'river-blue': '#0284C7', // Sacred Falgu River Blue from logo
        'success': '#2E7D32',
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
