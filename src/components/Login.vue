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
        username: this.username,
        password: this.password
      }
      login(params)
        .then(res => {
          console.log(res)
          if (res.mata.status === 200) {
            this.$router.push({name: 'home'})
          } else {
            console.log('用户名或者密码错误')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
