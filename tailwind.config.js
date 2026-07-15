/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Breakpoints exacte conform standardului
    screens: {
      'xs':  '576px',   // Telefoane mari / landscape
      'sm':  '768px',   // Tablete portret
      'md':  '992px',   // Tablete mari / Laptopuri mici
      'lg':  '1200px',  // Desktop standard
      'xl':  '1400px',  // Monitoare mari / UltraWide
    },
    extend: {
      colors: {
        bg:                '#070D1A',
        'bg-2':            '#0C1528',
        mint:              '#0DD9C5',
        'mint-dim':        '#0AA896',
        violet:            '#38BDF8',
        ink:               '#EEF4FF',
        'ink-dim':         '#7B8EB5',
        'ink-faint':       '#3D5070',
        'glass-border':    'rgba(13,217,197,0.12)',
        'glass-border-hi': 'rgba(13,217,197,0.35)',
        line:              'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        inter:     ['Inter', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
