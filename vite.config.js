import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/dist/vite'
import Components from 'unplugin-vue-components/dist/vite'
import {ElementPlusResolver} from "unplugin-vue-components/dist/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    // https://cn.vitejs.dev/config/#resolve-alias
    alias:{
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins:[
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
