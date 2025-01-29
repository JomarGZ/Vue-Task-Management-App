export default [
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
    path: '/projects/:projectId',
    name: 'projects.show',
    component: () => import('@/views/Projects/ShowView.vue'),
  },
  {
    path: '/projects/:projectId/edit',
    name: 'projects.edit',
    component: () => import('@/views/Projects/EditView.vue'),
  },
];