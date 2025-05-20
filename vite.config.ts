import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
//@ts-ignore
import path from 'path';

dotenvExpand.expand(dotenv.config())


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "eshu",
      filename: "remoteEntry.js",
      exposes: {
         './RemoteComponent': './src/App'
      },
      shared: ['react','react-dom']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // This makes @ point to /src
    },
  },
  base: process.env.NODE_ENV == 'production' ? process.env.VITE_BASE_URL_PROD : process.env.VITE_BASE_URL,
  build: {
    rollupOptions: {
      external:[],
    },
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
