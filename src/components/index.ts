import { App } from 'vue'
import ChooseArea from './ChooseArea'
import ChooseCity from './ChooseCity'
import Form from './Form'
import ModalForm from './ModalForm'
import NavMenu from './NavMenu'
import Notification  from './Notification'
import Progress from './Progress'
import TabList from './TabList'
import Trend from './Trend'

const components = [
  ChooseArea,
  ChooseCity,
  Form,
  ModalForm,
  NavMenu,
  Notification,
  Progress,
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