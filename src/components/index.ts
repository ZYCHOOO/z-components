import { App } from 'vue'
import ChooseArea from './ChooseArea'
import Trend from './Trend'

const components = [
  ChooseArea,
  Trend
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}