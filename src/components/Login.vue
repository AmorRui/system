<template>
  <div>
    <h1>登陆</h1>
    <ul>
      <li>
        <label for="uname">用户名</label>
        <input type="text" v-model='username' id="uname">
      </li>
       <li>
        <label for="pw">密码</label>
        <input type="password" v-model='password' id="pw">
      </li>
      <li>
        <input type="button" value="提交" @click="login">
      </li>
    </ul>
  </div>
</template>

<script>
import {login} from '../API/api.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let params = {
        // this.$router.push({name: 'home'})
        // 调用登陆接口
        username: this.username,
        password: this.password
      }
      // 调用接口,提交用户信息
      login(params)
        .then(res => {
          if (res.mata.status === 200) {
            // 登陆成功,跳转主页
            this.$router.push({name: 'home'})
          } else {
            // 登陆失败,提示用户
            console.log('用户名或者密码错误')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
