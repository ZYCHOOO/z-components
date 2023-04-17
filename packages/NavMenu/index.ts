import { App } from 'vue'
import navMenu from './src/index.vue'
import infiniteNavMenu from './src/navMenu'

export default {
  install(app: App) {
    app.component('z-nav-menu', navMenu)
    app.component('z-infinite-nav-menu', infiniteNavMenu)
  }
}