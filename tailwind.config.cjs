/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    fontFamily: {
      sans: ["'Poppins'", 'sans-serif']
    },
    extend: {
      colors: {
        'gray-50': '#FAF9FA',
        'gray-100': '#F3F2F4',
        'gray-200': '#E7E5E9',
        'gray-300': '#DCD9DD',
        'gray-400': '#D0CCD2',
        'gray-500': '#C4BFC7',
        'gray-600': '#938F95',
        'gray-700': '#626064',
        'gray-800': '#313032',
        'gray-900': '#141314',

        'primary-50': '#F2ECF5',
        'primary-100': '#E4D8E9',
        'primary-200': '#C9B1D3',
        'primary-300': '#AD8ABE',
        'primary-400': '#9263A8',
        'primary-500': '#773C92',
        'primary-600': '#592D6E',
        'primary-700': '#3C1E49',
        'primary-800': '#1E0F25',
        'primary-900': '#0C060F'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@rvxlab/tailwind-plugin-ios-full-height')
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
