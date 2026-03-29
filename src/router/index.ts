import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from "@/layouts/BasicLayout.vue";
import DevView from "@/views/DevView.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: BasicLayout},
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: {layout: BasicLayout},
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      meta: {layout: BlankLayout},
      component: DevView
    },
  ]
})

export default router
