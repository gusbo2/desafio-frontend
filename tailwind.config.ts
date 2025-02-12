import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: {
          light: '#0066cc',
          dark: '#3399ff',
        },
        secondary: {
          light: '#00cc66',
          dark: '#33cc99',
        },
        background: {
          light: '#f5f5f5',
          dark: '#121212',
        },
        surface: {
          light: '#ffffff',
          dark: '#1e1e1e',
        },
        textPrimary: {
          light: '#000000',
          dark: '#ffffff',
        },
        textSecondary: {
          light: '#666666',
          dark: '#b3b3b3',
        },
        accent: {
          light: '#ffcc00',
          dark: '#ffcc00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
