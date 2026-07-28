/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4F9A',
          50: '#FFF0F7',
          100: '#FFD6EC',
          200: '#FFB3D9',
          300: '#FF9CC6',
          400: '#FF74AF',
          500: '#FF4F9A',
          600: '#E6387F',
          700: '#CC2465',
          800: '#A81852',
          900: '#870F3F',
        },
        secondary: {
          DEFAULT: '#FF7A45',
          50: '#FFF4EF',
          100: '#FFE0D0',
          200: '#FFC4A8',
          300: '#FFA880',
          400: '#FF9163',
          500: '#FF7A45',
          600: '#E65E2A',
          700: '#CC4518',
          800: '#A8320B',
          900: '#872204',
        },
        accent: '#FF9CC6',
        surface: '#FFF7FB',
        border: '#F3D6E4',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #FF4F9A 0%, #FF7A45 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #FF9CC6 0%, #FFB3A0 100%)',
        'surface-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFF7FB 100%)',
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(255, 79, 154, 0.2)',
        'brand-lg': '0 8px 40px rgba(255, 79, 154, 0.3)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-brand': 'pulseBrand 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseBrand: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 79, 154, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 79, 154, 0)' },
        },
      },
    },
  },
  plugins: [],
};
