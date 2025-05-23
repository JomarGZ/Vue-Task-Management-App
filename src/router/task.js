export default [
    {
        path: '/projects/:projectId/tasks/create',
        name: 'tasks.create',
        component: () => import('@/views/Tasks/CreateView.vue'),
    },
    {
        path: '/projects/:projectId/tasks/:taskId',
        name: 'tasks.show',
        component: () => import('@/views/Tasks/ShowView.vue'),
    },
    {
        path: '/projects/:projectId/tasks/:taskId/edit',
        name: 'tasks.edit',
        component: () => import('@/views/Tasks/EditView.vue'),
    },
  ];