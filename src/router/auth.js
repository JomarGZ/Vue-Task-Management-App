import OrganizationLayout from '@/views/Layouts/OrganizationLayout.vue';
import projectRoutes from '@/router/project';
import taskRoutes from '@/router/task';
import memberRoutes from '@/router/member';
import teamRoutes from '@/router/team';
function auth(to, from, next) {
    if (!localStorage.getItem("access_token")) {
      return next({ name: "login" });
    }
   
    next();
  }
export default {
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
    ...projectRoutes,
    ...taskRoutes,
    ...memberRoutes,
    ...teamRoutes
    ]
  };