import { defineComponent, PropType, useAttrs } from 'vue'
import { MenuItem } from './types'
import * as Icons from '@element-plus/icons'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中菜单
    defaultActive: {
      type: String,
      default: ''
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const attrs = useAttrs()
    // 封装渲染无限层级的方法
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        // 处理菜单的图标
        item.i = (Icons as any)[item.icon!]
        // 处理sub-menu的插槽
        const slots = {
          title: () => {
            return <>
              <item.i />
              <span>{ item.name }</span>
            </>
          }
        }
        // 递归渲染children
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }
        // 正常渲染普通菜单
        return (
          <el-menu-item index={item.index}>
            <item.i />
            <span>{ item.name }</span>
          </el-menu-item>
        )
      })
    }
    return () => {
      return (
        <el-menu
          class="infinite-nav-menu"
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})