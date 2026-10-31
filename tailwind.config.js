/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mist: '#F3F7F5',
        mint: {
          100: '#E1F8F0',
          200: '#BDEFDD',
          300: '#8DE5C7',
          500: '#3FD3A2',
          600: '#2FB88A',
        },
        moss: {
          100: '#E6EDEA',
          200: '#D3DEDA',
          300: '#B4C4BD',
          400: '#8CA198',
          500: '#5A7269',
          600: '#476259',
          700: '#2E4D45',
          800: '#1B3A33',
          900: '#0C2A24',
        },
        deep: {
          50: '#EEF8F4',
          100: '#DCF1EA',
          600: '#0F7A5C',
          700: '#0A5C45',
        },
        status: {
          'warning-text': '#7A5200',
          'warning-bg': '#FBF3E0',
          'warning-border': '#F3E2BD',
          'danger-text': '#9A2F2F',
          'danger-bg': '#FBECEA',
          'danger-border': '#F5D2CD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      fontSize: {
        'display-mobile': [
          '44px',
          { lineHeight: '48px', letterSpacing: '-0.03em' },
        ],
        caption: ['12px', { lineHeight: '18px' }],
        small: ['14px', { lineHeight: '22px' }],
        body: ['16px', { lineHeight: '26px' }],
        lead: ['20px', { lineHeight: '30px' }],
        h4: ['22px', { lineHeight: '28px', letterSpacing: '-0.005em' }],
        h3: ['28px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        h2: ['40px', { lineHeight: '48px', letterSpacing: '-0.02em' }],
        h1: ['56px', { lineHeight: '60px', letterSpacing: '-0.025em' }],
        display: ['72px', { lineHeight: '76px', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        xl: '20px',
      },
      boxShadow: {
        e1: '0 1px 2px rgba(12,42,36,0.06), 0 4px 12px rgba(12,42,36,0.05)',
        e2: '0 12px 32px rgba(12,42,36,0.14)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
};
