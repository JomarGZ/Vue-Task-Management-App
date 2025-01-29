import GuestLayout from '@/views/Layouts/GuestLayout.vue';
function guest(to, from, next) {
    if (localStorage.getItem("access_token")) {
      return next({ name: "organization.dashboard" });
    }
   
    next();
  }
export default {
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
      },
    ],
  };