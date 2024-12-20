import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from "@/layouts/BasicLayout.vue";
import DevView from "@/views/DevView.vue";
import FinalsView from "@/views/FinalsView.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";
import QualifiersView from "@/views/QualifiersView.vue";

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dev',
      name: 'dev',
      meta: {layout: BlankLayout},
      component: DevView
    },
    {
      path: '/finals',
      name: 'finals',
      meta: {layout: BlankLayout},
      component: FinalsView
    },
    {
      path: '/qualifiers',
      name: 'qualifiers',
      meta: {layout: BlankLayout},
      component: QualifiersView
    },
  ]
})

export default router
