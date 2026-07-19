import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => ({
  esbuild: {
    jsxFactory: 'm',
    jsxFragment: 'm.Fragment',
  },
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
    root: path.resolve(__dirname, 'playground'),
    build: {
      outDir: path.resolve(__dirname, 'dist-playground'),
    },
    server: {
      port: 5173,
      open: true,
    },
  }),
}))
