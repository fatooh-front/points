/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
import rtl from "tailwindcss-rtl";

const slider_width = "269px"
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          150: "hsl(var(--primary-150))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          850: "hsl(var(--primary-850))",
          900: "hsl(var(--primary-900))",
          950: "hsl(var(--primary-950))",
          1000: "hsl(var(--primary-1000))",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          second: {
            DEFAULT: "hsl(var(--primary-second))",
            50: "hsl(var(--primary-50))",
            100: "hsl(var(--primary-second-100))",
            150: "hsl(var(--primary-second-150))",
            200: "hsl(var(--primary-second-200))",
            300: "hsl(var(--primary-second-300))",
            400: "hsl(var(--primary-second-400))",
            500: "hsl(var(--primary-second-500))",
            600: "hsl(var(--primary-second-600))",
            700: "hsl(var(--primary-second-700))",
            800: "hsl(var(--primary-second-800))",
            850: "hsl(var(--primary-second-850))",
            900: "hsl(var(--primary-second-900))",
            950: "hsl(var(--primary-second-950))",
            1000: "hsl(var(--primary-second-1000))",
          }
        },
        secondary: {
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          150: "hsl(var(--secondary-150))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          500: "hsl(var(--secondary-500))",
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          850: "hsl(var(--secondary-850))",
          900: "hsl(var(--secondary-900))",
          950: "hsl(var(--secondary-950))",
          1000: "hsl(var(--secondary-1000))",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      margin: {
        sidebar: slider_width,
      },
      width: {
        "100vw-20px": "calc(100vw - 20px)",
        "full-20px": "calc(100% - 20px)",
        "1/2-0.625rem": "calc(50% - 0.625rem)",
        sidebar: slider_width,
        // maxsidebar: "245px",
        maxsidebar: slider_width,
        appbar: `calc(100% - ${slider_width})`
      },
      minWidth: {
        "50%-2.5rem": "calc(50% - 2.5rem)",
        "1/2-0.625rem": "calc(50% - 0.625rem)",
      },
      maxWidth: {
        "100vw-20px": "calc(100vw - 20px)",
        "full-20px": "calc(100% - 20px)",
        "1/2-0.625rem": "calc(50% - 0.625rem)",
        "50%-0.6rem": "calc(50% - .6rem)",
      },
      height: {
        "100-31px": "calc(100% - 31px)",
        "100dvh-64px": "calc(100dvh - 64px - 30px)",
        "100dvh-106px": "calc(100dvh - 64px - 30px - 14px)",
        appbar: "80px",
      },
      minHeight: {
        "dvh-64px": "calc(100vh - 64px)",
      },
      maxHeight: {
        "full-20px": "calc(100% - 20px)",
        "100vh-20px": "calc(100vh - 20px)",
      },
      gridTemplateColumns: {
        "auto-fill-3": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fit-3": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fill-4": "repeat(auto-fill, minmax(270px, 1fr))",
        "auto-fit-4": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      backgroundImage: {
        "half-half": "linear-gradient(to bottom, transparent 58%, #F5F5F5 58%)",
        "gradient-tabs": "linear-gradient(to top, transparent, #8B1038)",
        "gradient-linear": "linear-gradient(var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        one: "0 4px 4px #00000040",
        scrollbar: "0 0 2px 1px #ccc inset",
        addgroup: "0px 0px 7px 3px rgba(21, 128, 61, 0.63) inset",
        panel:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      },
      keyframes: {
        animloader: {
          "0%": {
            "box-shadow":
              "14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px",
          },
          "25%": {
            "box-shadow":
              "14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px",
          },
          "50%": {
            "box-shadow":
              "14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px",
          },
          "75%": {
            "box-shadow":
              "14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px",
          },
          "100%": {
            "box-shadow":
              "14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px, -38px 0 0 -2px",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        load: {
          "100%": { backgroundSize: "100%" },
        },
        loader: "l7 1.5s infinite cubic-bezier(0.3,1,0,1)",
      },
      animation: {
        animloader: "animloader 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        load: "load 2s infinite linear",
        l7: {
          "33%": { inset: "-10px", transform: "rotate(0deg)" },
          "66%": { inset: "-10px", transform: "rotate(90deg)" },
          "100%": { inset: "0", transform: "rotate(90deg)" },
        },
      },
    },
  },
  plugins: [animate, rtl],


};
