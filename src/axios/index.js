import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import {
  Toast
} from "vant";


const isPro = Object.is(process.env.NODE_ENV, 'production');
let Ajax = axios.create({
  //生产环境API
  baseURL: isPro ? 'https://levy.chidict.com/' : 'api/',
  timeout: 10000,
 /*  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }, */
  transformRequest: [data => {
    // 对 data 进行任意转换处理
    return qs.stringify(data);
  }],
});
Ajax.interceptors.request.use(
  config => {
    Toast.loading();
    if (store.state.estateToken || localStorage.estateToken) {
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
        case 302:
          Toast({
            message: `Need login
            error:302`,
          });
          store.commit('setToken','');
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break;
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });
export default Ajax;
