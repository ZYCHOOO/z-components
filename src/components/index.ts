import { App } from 'vue'
import ChooseArea from './ChooseArea'
import Notification  from './Notification'
import TabList from './TabList'
import Trend from './Trend'

const components = [
  ChooseArea,
  Notification,
  TabList,
  Trend
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}