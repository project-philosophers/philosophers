import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

const isLocal = process.env.IS_LOCAL || false;
let serverConfig;
if (isLocal) {
  console.log('local');
  serverConfig = {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000/'
    }
  };
} else {
  console.log('remote');
  serverConfig = {
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://philosophers-v3-api.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  };
}

export default defineConfig({
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: serverConfig
})
