import GuestLayout from '@/views/Layouts/GuestLayout.vue';
import OrganizationLayout from '@/views/Layouts/OrganizationLayout.vue';
import { createRouter, createWebHistory } from 'vue-router'
 
function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    return next({ name: "login" });
  }
 
  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "organization.dashboard" });
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
      path: '/',
      name: 'organization',
      component: OrganizationLayout,
      beforeEnter: auth,
      children: [
        {
          path: '/organization/dashboard',
          name: 'organization.dashboard',
          component: () => import('@/views/Dashboards/OrganizationDashboard.vue'),
        },
        {
          path: '/profile',
          name: 'profile.index',
          component: () => import('@/views/Auth/ProfileView.vue'),
        },
        {
          path: '/tasks/create',
          name: 'tasks.create',
          component: () => import('@/views/Tasks/CreateView.vue'),
        },
        {
          path: '/tasks',
          name: 'tasks.index',
          component: () => import('@/views/Tasks/IndexView.vue'),
        },
        {
          path: '/tasks/:id/edit',
          name: 'tasks.edit',
          component: () => import('@/views/Tasks/EditView.vue'),
        },
        {
          path: '/tasks/:id',
          name: 'tasks.show',
          component: () => import('@/views/Tasks/ShowView.vue'),
        },
        {
          path: '/members',
          name: 'members.index',
          component: () => import('@/views/Members/IndexView.vue'),
        },
        {
          path: '/members/create',
          name: 'members.create',
          component: () => import('@/views/Members/CreateView.vue'),
        },
        {
          path: '/members/:id',
          name: 'members.show',
          component: () => import('@/views/Members/ShowView.vue'),
        },
        {
          path: '/projects',
          name: 'projects.index',
          component: () => import('@/views/Projects/IndexView.vue'),
        },
        {
          path: '/projects/create',
          name: 'projects.create',
          component: () => import('@/views/Projects/CreateView.vue'),
        },
        {
          path: '/projects/:id',
          name: 'projects.show',
          component: () => import('@/views/Projects/ShowView.vue'),
        },
        {
          path: '/projects/:id/edit',
          name: 'projects.edit',
          component: () => import('@/views/Projects/EditView.vue'),
        },
      ]
    },
  ],
})
 
export default router