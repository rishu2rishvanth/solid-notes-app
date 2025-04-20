// import { defineConfig } from 'vite'
// import solid from 'vite-plugin-solid'

// export default defineConfig({
//  plugins: [solid()],
// })

// vite.config.js
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  base: '/solid-notes-app/',  // Set this to your GitHub repository name
});