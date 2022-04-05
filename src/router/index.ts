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
        wrappers: ['@/wrappers/login-wrapper'],
        component: '@/pages/edit-topic',
      },
      {
        path: '/edit-topic/:id',
        wrappers: ['@/wrappers/login-wrapper'],
        component: '@/pages/edit-topic',
      },
      {
        path: '/message',
        wrappers: ['@/wrappers/login-wrapper'],
        component: '@/pages/message',
      },
      {
        path: '/collect',
        wrappers: ['@/wrappers/login-wrapper'],
        component: '@/pages/collect',
      },
      {
        path: '/user/:userName',
        component: '@/pages/user-detail',
      },
    ],
  },
];
