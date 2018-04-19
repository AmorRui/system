import axios from 'axios'
import { Promise } from 'core-js'

axios.defaults.baseURL = 'http://http://dengrui.net:3333/api/private/v1/'

// login拦截器处理token
axios.interceptors.request.use(function (config) {
  // 获取当前是否存在token
  let token = localStorage.getItem('mytoken')
  if (token) {
    // Authorization 请求头的键是前后台约定
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// login
export const login = (params) => {
  // 根据文档选择接口方式
  return axios.post('login', params).then(res => {
    return res.data
  })
}

// 测试请求头
export const testData = (params) => {
  // 根据文档选择接口方式
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}
