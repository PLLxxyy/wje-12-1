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
          goldenFood: '#fbbf24',
          goldenFoodGlow: '#fde68a',
        },
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-golden': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(74, 222, 128, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.6)',
        'glow-golden': '0 0 25px rgba(251, 191, 36, 0.8)',
      },
    },
  },
  plugins: [],
};
