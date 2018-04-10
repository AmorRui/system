import axios from 'axios'
// 设置请求的基准路径
// axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 登陆拦截器
// 拦截器处理token
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
// 实现登录功能
export const login = (params) => {
  return axios.post('login', params).then(res => {
    // 返回具体的数据，用来传递给下一个then
    return res.data
  })
}

// get user
export const getUserData = (params) => {
  return axios.get('users', {params: params}).then(res => {
    return res.data
  })
}

// put user my-state
export const toggleUserState = (params) => {
  return axios.put('users/' + params.uId + '/state/' + params.state)
    .then(res => {
      return res.data
    })
}

// post user addUser
export const addUser = (params) => {
  return axios.post('users', params)
    .then(res => {
      return res.data
    })
}

// get user getUserById
export const getUserById = (params) => {
  return axios.get('users/' + params.id).then(res => {
    return res.data
  })
}
// put user edit
export const editUser = (params) => {
  return axios.put('users/' + params.id, params).then(res => {
    return res.data
  })
}

// delete user deleteUser
export const deleteUser = (params) => {
  return axios.delete('roles/' + params.id).then(res => {
    return res.data
  })
}
