// Replace the default scales so components cannot silently introduce new tokens.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      moss: '#0C2A24',
      mist: '#F3F7F5',
      white: '#FFFFFF',
      mint: '#3FD3A2',
      deep: '#0F7A5C',
    },
    spacing: Object.fromEntries(
      [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128].map((px) => [
        px / 4,
        `${px}px`,
      ]),
    ),
    fontFamily: { sans: ['Inter', 'Noto Sans Bengali', 'sans-serif'] },
    fontWeight: { normal: '400', medium: '500', bold: '700' },
    fontSize: {
      caption: ['12px', '16px'],
      small: ['14px', '20px'],
      base: ['16px', '24px'],
      lead: ['20px', '28px'],
      section: ['28px', '36px'],
      page: ['40px', '48px'],
      hero: ['56px', '60px'],
    },
    borderRadius: { sm: '6px', md: '12px', lg: '20px', full: '9999px' },
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
  },
};
