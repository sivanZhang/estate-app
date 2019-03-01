import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//Vant框架
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Locale.use('en-US', enUS);
//iView框架
import iView from 'iview';
Vue.use(iView, { locale });
import locale from 'iview/dist/locale/en-US';
import 'iview/dist/styles/iview.css';
//长按事件
import touch from 'vue-directive-touch';
Vue.use(touch);
//滚动后不触发touchend事件；用touchend代替click解决移动端click时间延迟；
/* (() => {
    var flag = false;
    window.addEventListener('touchmove', function (ev) {
        flag || (flag = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, false);

    function stopTouchendPropagation(ev) {
        ev.stopPropagation();
        setTimeout(function () {
            window.removeEventListener('touchend', stopTouchendPropagation, true);
            flag = false;
        }, 50);
    }
})() */
Vue.config.productionTip = false;
import 'animate.css'
//全局样式
import '@/theme.less'
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");