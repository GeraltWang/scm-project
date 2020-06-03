import axios from 'axios'
import store from '../store'
const qs = require('querystring')
import Cookies from 'js-cookie'


// 拦截器 - 拦截所有的axios发送的请求，添加了请求的头信息 token
axios.interceptors.request.use(function (config) {
    if(store.state.token)
        config.headers.token = store.state.token
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })


export function requestGet(url, data) {
  return axios.get(url, qs.stringify(data),{
    // headers: {
    //   'Content-type': 'application/x-www-form-urlencoded'
    // }
  })
}



export function requestPost(url, data) {
  return axios.post(url, qs.stringify(data), {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function requestPostspec(url, data) {
  return axios.post(url, data, {
    headers: {'Content-Type': 'application/json'}
  })
}