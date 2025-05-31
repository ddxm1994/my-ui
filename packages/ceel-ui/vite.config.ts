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
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
