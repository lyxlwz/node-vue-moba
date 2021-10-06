import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
  //$http.defaults.baseUrl defaults 表示默认参数
  timeout: 5000
})

http.interceptors.request.use(config => {
  // 请求头的授权信息 Authorization
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, err => {
  return Promise.reject(err)
})

//拦截器 ----> 捕获错误
http.interceptors.response.use(res => {
  return res.data
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message,
    });
  }
  return Promise.reject(err)
})

export default http