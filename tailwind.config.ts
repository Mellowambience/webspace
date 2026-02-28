import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ws-void': '#0A0A0F',
        'ws-ink': '#E8E8F0',
        'ws-signal': '#7C6AF7',
        'ws-glow': '#A89CF8',
        'ws-mist': '#1C1C2E',
        'ws-border': '#2A2A3D',
        'ws-warm': '#F2A65A',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
