import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { Toast } from "vant";


const isPro = Object.is(process.env.NODE_ENV, 'production');
let Ajax = axios.create({
    //生产环境API
    baseURL: isPro ? 'https://levy.chidict.com/' : 'api/',
    timeout: 10000,
    transformRequest: [data => {
        // 对 data 进行任意转换处理
        return qs.stringify(data);
    }],
});
Ajax.interceptors.request.use(
    config => {
        Toast.loading();
        if (store.state.estateToken || localStorage.getItem('estateToken')) {
            config.headers.Authorization = store.state.estateToken || localStorage.getItem('estateToken');
        }
        return config;
    },
    err => {
        Toast.clear();
        return Promise.reject(err);
    });


Ajax.interceptors.response.use(
    response => {
        Toast.clear();
        return response;
    },
    error => {
        Toast.clear();
        if (error.response) {
            switch (error.response.status) {
                case 403:
                    // 返回 403 清除token信息并跳转到登录页面
                    Toast({
                        message: "Please login first",
                    });
                    store.commit('setToken');
                    console.log(store.state.token, '删除TOKEN');
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });
export default Ajax;