import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'main-background': "url('/GreenWave2.jpg')"
      },
      colors : {
        'primary-green': '#16a34a',
        'secondary-green': '#14532d',
        'primary-white': '#fafafa',
        'primary-black': '#09090b',
      }
    },
  },
  plugins: [],
}
export default config
