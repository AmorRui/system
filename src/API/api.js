import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// login
export const login = (params) => {
  // 根据文档选择接口方式
  return axios.post('http://localhost:8888/api/private/v1/login', params).then(res => {
    return res.data
  })
}
