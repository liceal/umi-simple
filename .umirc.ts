/*
https://v3.umijs.org/zh-CN/config
https://v2.umijs.org/zh/config/
*/

export default {
  npmClient: 'pnpm',
  apiRoute: {
    platform: 'vercel'
  },
  routes: [
    { path: '/', component: 'index' },
    { path: '/posts/create', component: 'posts/create' },
    { path: '/login', component: 'login' },
    { path: '/posts/:postId', component: 'posts/post' },
    {
      path: '/test',
      component: 'test'
    }
  ],
  plugins: [require.resolve('@umijs/plugins/dist/tailwindcss')],
  // tailwindcss: {}
};