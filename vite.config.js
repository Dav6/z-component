import {fileURLToPath, URL} from 'node:url'
import path from "path";

import {defineConfig, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from "unplugin-vue-define-options/vite";
import libCss from 'vite-plugin-libcss';
// import viteCompression from 'vite-plugin-compression'
import VitePluginStyleInject from 'vite-plugin-style-inject';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const pathSrc = fileURLToPath(new URL('./src', import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    // 打包的时候 不会引入css ， xxx.es.js自动引入css
    // 使用build.cssCodeSplit: true ， 给xxx.umd.js 生成内链css
    libCss(),
    // VitePluginStyleInject(),
    // AutoImport({
    //   resolvers: [
    //     ElementPlusResolver(),
    //     IconsResolver({
    //       prefix: 'Icon',
    //     }),
    //   ],
    //   // dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    // }),
    //   Components({
    //     resolvers: [
    //       ElementPlusResolver(),
    //       IconsResolver({
    //         enabledCollections: ['ep'],
    //       })
    //     ],
    //     // dts: path.resolve(pathSrc, 'components.d.ts'),
    //
    //   }),

    // ElementPlus(),
    // Icons({
    //   autoInstall: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: "dist", //输出文件名称

    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.js"), //指定组件编译入口文件
      name: "zr-component",
      // fileName: "zr-component",
      fileName: (format) => `zr-component.${format}.js`,
      formats: ['es', 'umd']
    }, //库编译模式配置
    // minify: 'esbuild',
    rollupOptions: {
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "element", "element-plus"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },

    }, // rollup打包配置
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
