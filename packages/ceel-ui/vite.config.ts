import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: "./index.ts",
      name: "ceel-ui",
      fileName: (format) => `ceel-ui.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      // 只将 vue 作为外部依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      '@ceel-ui/components': resolve(__dirname, '../components'),
      '@ceel-ui/utils': resolve(__dirname, '../utils')
    }
  }
});
