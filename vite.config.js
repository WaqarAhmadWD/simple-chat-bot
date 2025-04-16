import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/simple-chat-bot/',
  plugins: [
    tailwindcss(),
  ],
})