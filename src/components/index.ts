import { App } from 'vue'
import ChooseArea from './ChooseArea'
import Notification  from './Notification'
import Trend from './Trend'

const components = [
  ChooseArea,
  Notification,
  Trend
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}