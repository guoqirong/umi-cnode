export const routes = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
      {
        path: '/login',
        component: '@/pages/login',
      },
      {
        path: '/detail',
        component: '@/pages/detail',
      },
      {
        path: '/add-topic',
        component: '@/pages/edit-topic',
      },
      {
        path: '/edit-topic/:id',
        component: '@/pages/edit-topic',
      },
      {
        path: '/message',
        component: '@/pages/message',
      },
      {
        path: '/collect',
        component: '@/pages/collect',
      },
      {
        path: '/user/:userName',
        component: '@/pages/user-detail',
      },
    ],
  },
];
