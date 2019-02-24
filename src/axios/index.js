import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import {
    Toast
} from "vant";
const isPro = Object.is(process.env.NODE_ENV, 'production');
let Ajax = axios.create({
    baseURL: isPro ? 'https://levy.chidict.com/' : 'api/',
    timeout: 10000,
    transformRequest: [data => {
        // 对 data 进行任意转换处理
        return qs.stringify(data);
    }],
});
// 设置post请求头
Ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Ajax.interceptors.request.use(
    config => {
        let token = store.state.estateToken || sessionStorage.estateToken;
        token && (config.headers.Authorization = token);
        return config;
    },
    err => {
        return Promise.reject(err);
    });
Ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        Toast.clear();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    Toast({
                        message: `Please login first
            error: 401 `,
                    });
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break;
                case 403:
                    Toast({
                        message: `Please login first
            error: 403`,
                    });
                    store.commit('setToken', null);
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break;
            }
        }
        return Promise.reject(error.response.data)
    });
export default Ajax;