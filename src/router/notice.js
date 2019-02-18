/* 
 *
 *meta.keepAlive {Boolean}  是否缓存页面
 *meta.requireAuth {Boolean}  是否拦截登录
 *
 */

const routes = [{
  path: '/notifications',
  name: 'Notifications',
  component: () =>
    import('@/views/notifications/Notifications'),
  meta: {
    requireAuth: true,
  }
}, ];
export default routes