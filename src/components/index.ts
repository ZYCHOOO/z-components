import { App } from 'vue'
import ChooseArea from './ChooseArea'

const components = [
  ChooseArea
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}