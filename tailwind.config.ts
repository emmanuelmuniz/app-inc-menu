import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(modal|tabs).js"
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.2rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'gunmetal': '#022b3a',
        'teal': '#1f7a8c',
        'teal-hover': '#3392A5',
        'columbia-blue': '#bfdbf7',
        'lavender': '#D1DBFC',
        'silver': '#ebebeb',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'ghost-white': '#F7F7F7'
      }
    },
    fontFamily: {
      gratelos: ['var(--font-awesome-serif)']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gunmetal': '#022b3a',
      'black': '#000000',
      'teal': '#1f7a8c',
      'teal-hover': '#3392A5',
      'columbia-blue': '#bfdbf7',
      'lavender': '#D1DBFC',
      'silver': '#a39191',
      'gray': "#DADADA",
      'gray-2': "#d8e9e9",
      'gray-3': "#585858",
      'inc-green': '#D7E078',
      'inc-green-hover': '#B0B56D',
      'inc-light-blue': '#70B7C7',
      'inc-light-blue-hover': '#74A7B6',
      'ghost-white': '#FEFEFE',
      'primary': '#1f7a8c',
    },
  },
  plugins: [nextui()],
};
export default config;
