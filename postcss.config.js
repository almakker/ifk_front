// https://github.com/michael-ciniawsky/postcss-load-config
import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    }
    // If you want to support RTL css, then
    // 1. yarn/pnpm/bun/npm install postcss-rtlcss
    // 2. optionally set quasar.config.js > framework > lang to an RTL language
    // 3. uncomment the following line:
    // 'postcss-rtlcss': {}
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',  
  ],
  theme: {
    extend: {},
  },
}
