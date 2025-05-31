import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'), // 入口文件
      name: 'CeelUtils', // 全局变量名（UMD 格式需）
      fileName: (format) => `index.${format}.js` // 输出文件名
    },
    rollupOptions: {
      external: [], // 外部化依赖（如无需打包 Vue）
      output: { globals: {} } // UMD 全局变量映射
    }
  }
});