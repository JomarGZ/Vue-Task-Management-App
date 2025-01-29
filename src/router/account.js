export default [
    {
        path: '/account',
        name: 'account.index',
        component: () => import('@/views/Account/IndexView.vue'),
    },
    {
        path: '/account/edit',
        name: 'account.edit',
        component: () => import('@/views/Account/EditView.vue'),
    },
];