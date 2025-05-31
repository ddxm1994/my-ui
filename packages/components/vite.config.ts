export default {
  build: {
    lib: { entry: 'index.ts' },
    rollupOptions: {
      external: ['vue', '@ceel-ui/utils'],
      output: { globals: { '@ceel-ui/utils': 'Utils' } }
    }
  }
};