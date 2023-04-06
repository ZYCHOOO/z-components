import { App } from 'vue'
import navMenu from './src/index.vue'

export default {
  install(app: App) {
    app.component('z-nav-menu', navMenu)
  }
}