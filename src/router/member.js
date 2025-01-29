export default [
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
  ];