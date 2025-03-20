/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498DB', // Blue from logo as primary
        'primary-dark': '#2980B9', // Darker blue
        secondary: '#F1C40F', // Yellow from logo
        accent: '#2ECC71', // Green from logo
        danger: '#ED4C67', // Red from logo (now used as danger/accent)
        background: '#F9FAFB', // Light gray
        text: '#1F2937', // Dark gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
} 