import { App } from 'vue'
import chooseCity from './src/index.vue'

export default {
  install(app: App) {
    app.component('z-choose-city', chooseCity)
  }
}