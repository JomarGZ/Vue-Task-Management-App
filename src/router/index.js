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
      name: 'tasks.index',
      beforeEnter: auth,
      component: import('@/views/Tasks/IndexView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: import('@/views/Auth/RgisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/tasks/create',
      name: 'tasks.create',
      beforeEnter: auth,
      component: import('@/views/Tasks/CreateView.vue'),
    },
    {
      path: '/profile',
      name: 'profile.index',
      beforeEnter: auth,
      component: import('@/views/Auth/ProfileView.vue'),
    },
  ],
})
 
export default router