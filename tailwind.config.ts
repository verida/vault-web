import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: 'Sora, sans-serif'
    },
    extend: {
      colors: {
        background: '#fff',
        foreground: '#111',
        border: "#E2E8F0",
        secondary: {
          background: '#F9FAFB',
          foreground: '#6b7280',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E2E8F0',
          300: '#D1D5DB',
          500: '#6B7280',
          800: '#1F2937'
        },
        purple: {
          50: '#F5F4FF',
          100: '#ECEBFA',
          200: '#D9D8F5',
          400: '#7986F7',
          500: '#5354D1',
          700: '#0D0782'
        },
        green:{
          100: '#DCFCE7',
          800: '#166534'
        },
        cyan: {
          100: '#CFFAFE',
          800: '#155E75'
        },
        yellow: {
          100: '#FEF9C3',
          800: '#854D0E'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glow': '0px 0px 4px 0px rgba(83, 84, 209, 0.60)'
      },
      fontSize: {
        'heading-1': [
          "2rem",
          {
            lineHeight: "130%",
            fontWeight: "700"
          }
        ],
        'heading-2': [
          "1.5rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'heading-3': [
          "1.25rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'heading-4': [
          "1.125rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'heading-5': [
          "1rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'base-l': [
          "1rem",
          {
            lineHeight: "140%",
            fontWeight: "400"
          }
        ],
        'base-s-regular': [
          "0.75rem",
          {
            lineHeight: "140%",
            fontWeight: "400"
          }
        ],
        'base-s-semibold': [
          "0.75rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'base-regular': [
          "0.875rem",
          {
            lineHeight: "140%",
            fontWeight: "400"
          }
        ],
        'base-semibold': [
          "0.875rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'desktop-heading-1': [
          "2.5rem",
          {
            lineHeight: "130%",
            fontWeight: "700"
          }
        ],
        'desktop-heading-2': [
          "2rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'desktop-heading-3': [
          "1.5rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'desktop-heading-4': [
          "1.25rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        'desktop-heading-5': [
          "1rem",
          {
            lineHeight: "140%",
            fontWeight: "600"
          }
        ],
        
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config