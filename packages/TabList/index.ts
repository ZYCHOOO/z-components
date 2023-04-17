import { App } from 'vue'
import tabList from './src/index.vue'

export default {
  install(app: App) {
    app.component('z-tab-list', tabList)
  }
}