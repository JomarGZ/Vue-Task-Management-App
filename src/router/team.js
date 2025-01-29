export default [
    {
        path: '/teams',
        name: 'teams.index',
        component: () => import('@/views/Teams/IndexView.vue'),
    },
    {
        path: '/teams/member/add',
        name: 'teams.members.add',
        component: () => import('@/views/Teams/AddMemberView.vue'),
    },
  ];