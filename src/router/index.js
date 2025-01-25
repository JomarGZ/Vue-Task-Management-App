import GuestLayout from '@/views/Layouts/GuestLayout.vue';
import { createRouter, createWebHistory } from 'vue-router'
 
function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    return next({ name: "login" });
  }
 
  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "tasks.index" });
  }
 
  next();
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'guest',
      component: GuestLayout,
      beforeEnter: guest,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/Auth/RgisterView.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Auth/LoginView.vue'),
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile.index',
      beforeEnter: auth,
      component: import('@/views/Auth/ProfileView.vue'),
    },
    {
      path: '/tasks/create',
      name: 'tasks.create',
      beforeEnter: auth,
      component: () => import('@/views/Tasks/CreateView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks.index',
      beforeEnter: auth,
      component: () => import('@/views/Tasks/IndexView.vue'),
    },
    {
      path: '/tasks/:id/edit',
      name: 'tasks.edit',
      beforeEnter: auth,
      component: () => import('@/views/Tasks/EditView.vue'),
    },
    {
      path: '/tasks/:id',
      name: 'tasks.show',
      beforeEnter: auth,
      component: () => import('@/views/Tasks/ShowView.vue'),
    },
    {
      path: '/members',
      name: 'members.index',
      beforeEnter: auth,
      component: () => import('@/views/Members/IndexView.vue'),
    },
    {
      path: '/members/create',
      name: 'members.create',
      beforeEnter: auth,
      component: () => import('@/views/Members/CreateView.vue'),
    },
    {
      path: '/members/:id',
      name: 'members.show',
      beforeEnter: auth,
      component: () => import('@/views/Members/ShowView.vue'),
    },
    {
      path: '/projects',
      name: 'projects.index',
      beforeEnter: auth,
      component: () => import('@/views/Projects/IndexView.vue'),
    },
    {
      path: '/projects/create',
      name: 'projects.create',
      beforeEnter: auth,
      component: () => import('@/views/Projects/CreateView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'projects.show',
      beforeEnter: auth,
      component: () => import('@/views/Projects/ShowView.vue'),
    },
  ],
})
 
export default router