/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf9f7',
        onBackground: '#1a1c1b',
        primary: {
          DEFAULT: '#143026',
          foreground: '#ffffff',
          container: '#2b463c',
          onContainer: '#96b3a6',
        },
        secondary: {
          DEFAULT: '#43682c',
          foreground: '#ffffff',
          container: '#c1eca1',
          onContainer: '#476c30',
        },
        tertiary: {
          DEFAULT: '#1d3000',
          foreground: '#ffffff',
          container: '#2f4807',
          onContainer: '#98b76b',
        },
        surface: {
          DEFAULT: '#faf9f7',
          dim: '#dadad8',
          bright: '#faf9f7',
          lowest: '#ffffff',
          low: '#f4f3f1',
          container: '#eeeeec',
          high: '#e9e8e6',
          highest: '#e3e2e0',
          variant: '#e3e2e0',
        },
        onSurface: {
          DEFAULT: '#1a1c1b',
          variant: '#424845',
        },
        outline: {
          DEFAULT: '#727975',
          variant: '#c1c8c3',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta, Arial)', 'Arial', 'Helvetica', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        full: '9999px',
      },
      boxShadow: {
        'diffused-sm': '0 4px 24px rgba(20, 48, 38, 0.05)',
        'diffused-md': '0 8px 32px rgba(20, 48, 38, 0.08)',
        'diffused-lg': '0 16px 48px rgba(20, 48, 38, 0.12)',
      },
      spacing: {
        'section-gap': '80px',
      },
    },
  },
  plugins: [],
}
