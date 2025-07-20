/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Original Color Palette - Indigo, Rose, Violet, Amber, Cyan
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          300: '#a5b4fc',
          400: '#818cf8', 
          500: '#6366f1', // Core brand color (Indigo)
          600: '#4f46e5', // Hover states
          700: '#4338ca', // Active/pressed states
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e', // Rose
          600: '#e11d48',
          700: '#be185d',
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Violet
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // Background System
        bg: {
          primary: '#030303',   // Main application background
          secondary: '#0f0f0f', // Card/section backgrounds  
          tertiary: '#1a1a1a',  // Elevated surfaces
        },
        // Text Hierarchy
        text: {
          primary: '#ffffff',   // Primary headings and content
          secondary: 'rgba(255, 255, 255, 0.80)', // Secondary text
          tertiary: 'rgba(255, 255, 255, 0.60)',  // Captions, metadata
          inverse: '#030303',   // Text on light backgrounds
        },
        // Interactive States
        interactive: {
          primary: '#6366f1',
          hover: '#4f46e5', 
          active: '#4338ca',
          disabled: 'rgba(99, 102, 241, 0.40)',
        },
        // Semantic Colors
        success: '#10b981',
        warning: '#f59e0b', 
        error: '#ef4444',
        info: '#06b6d4',
        // Add shadcn color variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px', 
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      maxWidth: {
        container: "80rem",
      },
      boxShadow: {
        'primary': '0 2px 8px rgba(99, 102, 241, 0.25)',
        'primary-hover': '0 4px 16px rgba(99, 102, 241, 0.35)',
        'card': '0 8px 32px rgba(99, 102, 241, 0.15)',
        glow: "0 -16px 128px 0 hsla(var(--primary) / 0.5) inset, 0 -16px 32px 0 hsla(var(--primary) / 0.3) inset",
      },
      animation: {
        'skeleton': 'skeleton-loading 1.5s infinite',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards"
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
        'skeleton-loading': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'slide-in': {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};