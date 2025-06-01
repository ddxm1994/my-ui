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
      // 确保外部化依赖模块
      external: [
        "vue",  
        '@dxm94/components', // 外部化 components
        '@dxm94/utils'], // 外部化 utils（避免间接依赖）],
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
