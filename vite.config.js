import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      'panda-ui-mithril': path.resolve(__dirname, 'src/index.js'),
      'panda-ui': path.resolve(__dirname, 'styled-system'),
    },
  },
  ...(mode === 'library' ? {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'PandaUI',
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['mithril'],
        output: {
          globals: { mithril: 'm' },
        },
      },
      outDir: 'dist',
      cssCodeSplit: false,
    },
  } : {
    root: 'playground',
    build: {
      outDir: '../dist-playground',
    },
    server: {
      port: 5173,
      open: true,
    },
  }),
}))
