import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
		  'mona-sans': ["var(--font-mona-sans)", ...fontFamily.sans],
      'pp-supply-mono': ["var(--font-pp-supply-mono)", ...fontFamily.mono],
      // 'pp-supply-sans': ["var(--font-pp-supply-sans)", ...fontFamily.sans],
      },
      colors: {
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          muted: 'hsl(var(--muted-foreground))'
        },
        tertiary: 'hsl(var(--tertiary))',
        stroke: 'hsl(var(--stroke))',
        'fore-black': 'hsl(var(--fore-black))',
        'fore-white': 'hsl(var(--fore-white))',
        'web-bg': 'hsl(var(--web-bg))',
        background: 'hsl(var(--background))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          muted: 'hsl(var(--muted-primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          muted: 'hsl(var(--muted-secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          highlight: 'hsl(var(--highlight))',
          'muted-highlight': 'hsl(var(--muted-highlight))',
          'muted-primary': 'hsl(var(--muted-primary))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        'muted-primary': {
          DEFAULT: 'var(--Muted_Primary, #A45700)'
        },
        
      },
      borderRadius: {
        'none': '0',
        '10': '10px',
      },
      boxShadow: {
        focus: '0px 0px 0px 1px #505050',
        normal: '0px 1px 2px 0px #0A0D1408',
      },
      borderWidth: {
        DEFAULT: '1pt',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      screens: {
        'xs': '326px',
        'sm': '350px'
      },
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
