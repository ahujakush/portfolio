import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/**
 * Colours are declared as raw RGB channels in app/globals.css, which lets
 * Tailwind's `<alpha-value>` slot work (`bg-accent/10`, `text-fg2/60`, …)
 * while still allowing the whole palette to be swapped for light mode.
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '1.5rem' },
      screens: { '2xl': '1120px' },
    },
    extend: {
      colors: {
        bg: channel('bg'), //        #09090B
        surface: channel('surface'), // #111113
        card: channel('card'), //    #18181B
        divider: channel('divider'), // #27272A

        fg: channel('fg'), //        #FAFAFA  primary text
        fg2: channel('fg2'), //      #A1A1AA  secondary text
        fg3: channel('fg3'), //      #71717A  muted text

        accent: {
          DEFAULT: channel('accent'), //  #4F8CFF
          hover: channel('accent-hover'), // #6EA8FF
        },
        success: channel('success'), // #22C55E
        warning: channel('warning'), // #F59E0B
        danger: channel('danger'), //   #EF4444
        info: channel('info'), //       #38BDF8
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        panel: '20px',
        card: '14px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 24px 70px -30px rgb(0 0 0 / 0.85)',
        lift: '0 26px 70px -28px rgb(0 0 0 / 0.9), 0 0 0 1px rgb(79 140 255 / 0.18)',
        glow: '0 0 44px -6px rgb(79 140 255 / 0.35)',
      },
      keyframes: {
        'orb-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(40px,-30px,0) scale(1.1)' },
        },
        'ring-spin': { to: { transform: 'rotate(360deg)' } },
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'orb-drift': 'orb-drift 24s ease-in-out infinite',
        'ring-spin': 'ring-spin 14s linear infinite',
        'caret-blink': 'caret-blink 1.2s step-end infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0.6,0.36,1) infinite',
        marquee: 'marquee 32s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [animate],
};

export default config;
