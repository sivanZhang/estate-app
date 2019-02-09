import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
Locale.use('en-US', enUS);
Vue.config.productionTip = false;
//iView

import iView from 'iview';
Vue.use(iView, { locale });
import locale from 'iview/dist/locale/en-US';
import 'iview/dist/styles/iview.css';

import touch from 'vue-directive-touch';
Vue.use(touch);
import 'animate.css'
import '@/theme.less' //全局CSS
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");