import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routesall from "./routers";
import notice from "./notice";
import { Toast } from "vant";
Vue.use(Router);
const routes = [...routesall, ...notice],
ROUTER = new Router({
    routes,
});
//进入页面时候的登陆拦截
ROUTER.beforeEach((to, from, next) => {
    window.document.title = to.name || 'Estate';
    if (to.matched.some(r => r.meta.requireAuth)) {
        let token = store.state.estateToken || localStorage.getItem('estateToken');
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
ROUTER.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
export default ROUTER;