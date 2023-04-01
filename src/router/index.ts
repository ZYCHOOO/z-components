import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from '../views/home.vue';
import Layout from '../layout/index.vue';

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
      }
    ]
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
