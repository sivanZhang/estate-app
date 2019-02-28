/* 
 *
 *meta.keepAlive {Boolean}  是否缓存页面
 *meta.requireAuth {Boolean}  是否拦截登录
 *
 */

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/views/login/Login'),
  },
  {
    path: '*',
    redirect: '/home', //匹配不到 默认跳转
  },
  {
    path: '/login/forgot',
    name: 'Forgot',
    component: () =>
      import('@/views/login/Forgot'),
  }
];
export default routes