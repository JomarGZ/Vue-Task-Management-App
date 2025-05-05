import OrganizationLayout from '@/views/Layouts/OrganizationLayout.vue';
import projectRoutes from '@/router/project';
import taskRoutes from '@/router/task';
import memberRoutes from '@/router/member';
import teamRoutes from '@/router/team';
import accountRoutes from '@/router/account';
function auth(to, from, next) {
    if (!localStorage.getItem("access_token")) {
      return next({ name: "login" });
    }
   
    next();
  }
export default {
    path: '/organization',
    name: 'organization',
    component: OrganizationLayout,
    beforeEnter: auth,
    children: [
    {
        path: 'dashboard',
        name: 'organization.dashboard',
        component: () => import('@/views/Dashboards/OrganizationDashboard.vue'),
    },
    {
        path: '/profile',
        name: 'profile.index',
        component: () => import('@/views/Auth/ProfileView.vue'),
    },
    {
        path: '/positions',
        name: 'positions.index',
        component: () => import('@/views/Position/IndexView.vue'),
    },

    ...projectRoutes,
    ...taskRoutes,
    ...memberRoutes,
    ...teamRoutes,
    ...accountRoutes
    ]
  };