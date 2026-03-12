import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Force ESM (.mjs) builds in SSR so named exports work
      {
        find: 'react-router-dom',
        replacement: path.resolve('node_modules/react-router-dom/dist/index.mjs'),
      },
      {
        find: /^react-router$/,
        replacement: path.resolve('node_modules/react-router/dist/production/index.mjs'),
      },
    ],
  },
  ssr: {
    // GSAP uses ESM imports internally but Node.js loads it as CJS,
    // causing "Cannot use import statement outside a module".
    // noExternal tells Vite to bundle these into the SSR output
    // so they go through Vite's ESM transform pipeline.
    noExternal: ['gsap', '@gsap/react'],
  },
})
