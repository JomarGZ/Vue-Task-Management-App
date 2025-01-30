export default [
    {
        path: '/teams',
        name: 'teams.index',
        component: () => import('@/views/Teams/IndexView.vue'),
    },
    {
        path: '/teams/:teamId',
        name: 'teams.show',
        component: () => import('@/views/Teams/ShowView.vue'),
    },
    {
        path: '/teams/:teamId/member/add',
        name: 'teams.members.add',
        component: () => import('@/views/Teams/AddMemberView.vue'),
    },
  ];