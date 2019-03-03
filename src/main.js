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



function vueTouch(el, binding, type) {
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.touchType = type;
    this.vueTouches = { x: 0, y: 0 };
    this.vueMoves = true;
    this.vueLeave = true;
    this.longTouch = true;
    this.vueCallBack = typeof(binding.value) == "object" ? binding.value.fn : binding.value;
    this.obj.addEventListener("touchstart", function(e) {
        _this.start(e);
    }, false);
    this.obj.addEventListener("touchend", function(e) {
        _this.end(e);
    }, false);
    this.obj.addEventListener("touchmove", function(e) {
        _this.move(e);
    }, false);
};
vueTouch.prototype = {
    start: function(e) {
        this.vueMoves = true;
        this.vueLeave = true;
        this.longTouch = true;
        this.vueTouches = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        this.time = setTimeout(function() {
            if (this.vueLeave && this.vueMoves) {
                this.touchType == "longtap" && this.vueCallBack(this.binding.value, e);
                this.longTouch = false;
            };
        }.bind(this), 1000);
    },
    end: function(e) {
        var disX = e.changedTouches[0].pageX - this.vueTouches.x;
        var disY = e.changedTouches[0].pageY - this.vueTouches.y;
        clearTimeout(this.time);
        if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
            this.touchType == "swipe" && this.vueCallBack(this.binding.value, e);
            if (Math.abs(disX) > Math.abs(disY)) {
                if (disX > 10) {
                    this.touchType == "swiperight" && this.vueCallBack(this.binding.value, e);
                };
                if (disX < -10) {
                    this.touchType == "swipeleft" && this.vueCallBack(this.binding.value, e);
                };
            } else {
                if (disY > 10) {
                    this.touchType == "swipedown" && this.vueCallBack(this.binding.value, e);
                };
                if (disY < -10) {
                    this.touchType == "swipeup" && this.vueCallBack(this.binding.value, e);
                };
            };
        } else {
            if (this.longTouch && this.vueMoves) {
                this.touchType == "tap" && this.vueCallBack(this.binding.value, e);
                this.vueLeave = false
            };
        };
    },
    move: function(e) {
        this.vueMoves = false;
    }
};
Vue.directive("tap", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "tap");
    }
});
Vue.directive("swipe", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipe");
    }
});
Vue.directive("swipeleft", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeleft");
    }
});
Vue.directive("swiperight", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swiperight");
    }
});
Vue.directive("swipedown", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipedown");
    }
});
Vue.directive("swipeup", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeup");
    }
});
Vue.directive("longtap", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "longtap");
    }
});
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