/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        snake: {
          dark: '#0a1f0a',
          darker: '#050f05',
          head: '#4ade80',
          body: '#22c55e',
          tail: '#16a34a',
          food: '#ef4444',
          foodGlow: '#fca5a5',
        },
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(74, 222, 128, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.6)',
      },
    },
  },
  plugins: [],
};
