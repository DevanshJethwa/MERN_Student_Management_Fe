import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      colors: {
        school: {
          primary: "#5B7F46",
          secondary: "#E6E9DD",
          background: "#F4F1EA",
          text: "#1F2D1B",
          muted: "#66736A",
        },
      },
    },
  },
  server:true
})
