import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import otherRoutes from "./routers";
import notice from "./notice";
import login from "./login";
import { Toast } from "vant";
Vue.use(Router);
const routes = [...login,...notice, ...otherRoutes],
    ROUTER = new Router({
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.keepAlive) {
                    from.meta.savedPosition = document.body.scrollTop;
                }
                return { x: 0, y: to.meta.savedPosition || 0 }
            }
        }
    });
//进入页面时候的登陆拦截
ROUTER.beforeEach((to, from, next) => {
        window.document.title = to.name || 'Estate';
        if (to.matched.some(r => r.meta.requireAuth)) {
            let token = store.state.estateToken || sessionStorage.getItem('estateToken');
            if (token) {
                next();
            } else {
                Toast({
                    message: "Not logged in",
                });
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            }
        } else {
            next();
        }
    })
    /* ROUTER.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
    }) */


export default ROUTER;