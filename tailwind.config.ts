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
        // PindDaanWale 2.0 Enterprise Brand Color Tokens
        'brand-heading': '#2B2118',
        'brand-body': '#5A5148',
        'brand-muted': '#7A736A',
        'brand-gold': '#C6922E',
        'brand-gold-hover': '#A97718',
        'brand-ivory': '#FAF7F2',
        'brand-card': '#FFFFFF',
        'brand-border': '#EFE6D9',

        // Legacy compatibility mappings
        'temple-ivory': '#FAF7F2',
        'temple-alt': '#F3ECDD',
        'text-primary': '#2B2118',
        'text-secondary': '#5A5148',
        'accent-gold': '#C6922E',
        'accent-copper': '#A97718',
        'river-blue': '#0284C7',
        'success': '#2E7D32',
      },
      fontFamily: {
        // Semantic Enterprise Font System
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-hindi)', 'Noto Sans Devanagari', 'sans-serif'],
      },
      borderRadius: {
        'btn': '16px',
        'input': '16px',
        'card': '24px',
      },
      maxWidth: {
        'standard': '1280px',
        'wide': '1400px',
        'ultra': '1600px',
        'prose-luxury': '680px',
      },
    },
  },
  plugins: [],
};
export default config;
