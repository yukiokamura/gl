import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import string from 'vite-plugin-string'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'dist',
  plugins: [
    vue(),
    string({
      include: ['**/*.frag', '**/*.vert'], // .frag, .vert を対象に
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@/components/BackGround/GL/scripts/*.ts'],
  },
  assetsInclude: ['**/*.glsl', '**/*.vert', '**/*.frag'],
})
