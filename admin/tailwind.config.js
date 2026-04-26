/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#5f6FFF",
        'secondary': "#A855F7",
        'accent': "#EC4899",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(150px, 1fr))',
        'responsive': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2s infinite',
        float: 'float 3s ease-in-out infinite',
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
      },
      backdropBlur: {
        xl: 'blur(20px)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(95, 111, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.6)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.6)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
