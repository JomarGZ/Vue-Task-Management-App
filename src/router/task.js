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
        path: '/tasks',
        name: 'tasks.index',
        component: () => import('@/views/Tasks/IndexView.vue'),
    },
  ];