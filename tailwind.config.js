import forms from '@tailwindcss/forms'

export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [forms],
}
