import { createRouter, createWebHistory } from 'vue-router'
import guestRoutes from '@/router/guest';
import authRoutes from '@/router/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [guestRoutes, authRoutes],
})
 
export default router