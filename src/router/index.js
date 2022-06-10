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
    component: () => import('../pages/HomePage.vue'),
    children: [{
      path: '/:photoId',
      name: 'SinglePhotoPage',
      component: () => import('../pages/SinglePhotoPage.vue')
    }]
  },
  {
    path: '/add-photo',
    name: 'AddPhotoPage',
    component: () => import('../pages/AddPhotoPage.vue')
  },
  {
    path: '/photos/:category/:photoId',
    name: 'SinglePhotoCategoryPage',
    component: () => import('../pages/SinglePhotoPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
