import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/**
 * Colours are raw RGB channels in app/globals.css so Tailwind's opacity
 * modifiers still work (`bg-accent/10`, `text-fg/60`, …).
 *
 * Palette taken from ruchitdesigns.framer.website: a warm near-black ground,
 * soft white type, two greys, and one crimson that means "look here".
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: channel('bg'), //             #141316
        surface: channel('surface'), //   #1C1B1F
        raised: channel('raised'), //     #242328
        line: channel('line'), //         #2B2A2F

        fg: channel('fg'), //             #F7F7F7
        fg2: channel('fg2'), //           #B8B8B8
        fg3: channel('fg3'), //           #828282

        accent: {
          DEFAULT: channel('accent'), //  #EA0044  fills, large type
          text: channel('accent-text'), // #FF3D6E  small text on dark (5.4:1)
          deep: channel('accent-deep'), // #B80036  pressed / shadows
        },
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-geist)', 'sans-serif'],
        garamond: ['var(--font-garamond)', 'Georgia', 'serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Fluid display sizes: clamp(min, preferred, max)
        // Capped by height too, so the hero buttons stay above the fold on short laptop screens
        mega: ['clamp(4.5rem, min(17vw, 25svh), 15.5rem)', { lineHeight: '0.84', letterSpacing: '-0.05em' }],
        huge: ['clamp(2.75rem, 7.2vw, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        big: ['clamp(2.3rem, 5vw, 4.1rem)', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
      },
      fontWeight: {
        // Bricolage Grotesque is variable: 750 is the agents-hub h1 weight
        bold: '750',
        extrabold: '800',
      },
      borderRadius: {
        card: '20px',
        tile: '14px',
      },
      transitionTimingFunction: {
        // Named per design-engineering/easing-curves
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.25, 1, 0.5, 1) infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
