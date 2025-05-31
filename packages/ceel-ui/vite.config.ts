import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
        '@ceel-ui/components', // 外部化 components
        '@ceel-ui/utils'], // 外部化 utils（避免间接依赖）],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
