import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/photos/:category',
    name: 'CategoryPhotosPage',
    component: () => import('../pages/CategoryPhotosPage.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
