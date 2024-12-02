import { createRouter, createWebHistory } from 'vue-router'
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: import('@/views/Auth/RgisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks.index',
      component: import('@/views/Tasks/IndexView.vue'),
    },
    {
      path: '/tasks/create',
      name: 'tasks.create',
      component: import('@/views/Tasks/CreateView.vue'),
    },
  ],
})
 
export default router