import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from '../views/home.vue'
import Layout from '../layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/icons',
        name: 'Icons',
        component: () => import('../views/icons/index.vue')
      },
      {
        path: '/chooseArea',
        name: 'ChooseArea',
        component: () => import('../views/chooseArea/index.vue')
      },
      {
        path: '/chooseCity',
        name: 'ChooseCity',
        component: () => import('../views/chooseCity/index.vue')
      },
      {
        path: '/trend',
        name: 'Trend',
        component: () => import('../views/trend/index.vue')
      },
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('../views/notification/index.vue')
      },
      {
        path: '/navMenu',
        name: 'NavMenu',
        component: () => import('../views/navMenu/index.vue')
      },
      {
        path: '/progress',
        name: 'Progress',
        component: () => import('../views/progress/index.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
