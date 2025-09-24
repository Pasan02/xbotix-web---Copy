/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Xbotix Brand Colors - Strict Adherence Required
      colors: {
        // Primary Brand Colors - NO OTHER COLORS PERMITTED
        xbotix: {
          red: '#e21a10',      // Primary Red - Accent color for CTAs, highlights, icons
          black: '#000000',    // Primary Black - Foundation color, premium backgrounds  
          white: '#ffffff',    // Primary White - Text on dark backgrounds, clean backgrounds
        }
      },
      // Xbotix Typography System
      fontFamily: {
        // Primary Headline Font
        'monument': ['PP Monument Extended', 'system-ui', 'sans-serif'],
        // Alternative Headline Fonts
        'menda': ['Menda', 'system-ui', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
        // Body Text Fonts
        'raleway': ['Raleway', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      // Typography Scale - Brand Hierarchy
      fontSize: {
        // Headlines - Use Monument Extended
        'h1': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '400' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '400' }],
        // Body Text - Use Raleway/Montserrat
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      // Brand Spacing Scale
      spacing: {
        'brand-xs': '8px',
        'brand-sm': '16px',
        'brand-md': '24px',
        'brand-lg': '32px',
        'brand-xl': '48px',
      }
    },
  },
  plugins: [],
};
