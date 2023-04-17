const path = require("path")
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 打包出口文件夹
const exitDir = path.resolve(__dirname, '../lib')

// vite 基础配置
const baseConfig = defineConfig({
  configFile: false,
  oublicDir: false,
  plugins: [vue()]
})

// rollup 配置
const rollupOptions = {
  external: ['vue'],
  output: {
    vue: 'Vue'
  }
}

// 全量打包构建
const buildAll = async() => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'z-components',
        fileName: 'z-components',
        formats: ['es', 'umd']
      },
      outDir: exitDir
    }
  })
}

// 打包成库
const buildLib = async() => {
  await buildAll()
}

buildLib()
