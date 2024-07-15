import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
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
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'ghost-white': '#E8EBFF'
      },
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
      'silver': '#C6C6C6',
      'inc-green': '#D7E078',
      'inc-green-hover': 'B0B56D',
      'inc-light-blue': '#7BD0E4',
      'inc-light-blue-hover': '#74A7B6',
      'ghost-white': '#FEFEFE',
      'primary': '#1f7a8c',
    },
  },
  plugins: [nextui()],
};
export default config;
