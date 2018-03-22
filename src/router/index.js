import Vue from 'vue'
import Router from 'vue-router'
// login
import Login from '@/components/Login'
// home
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
