<template>
  <div class="info">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <el-form ref="loginForm" :rules="rules" :model="form" class="content">
      <div class="userInfo">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='login'>登陆</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {login} from '../API/api.js'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login: function () {
      // 表单验证
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          let params = {
            // this.$router.push({name: 'home'})
            // 调用登陆接口
            username: this.form.username,
            password: this.form.password
          }
          // 调用接口,提交用户信息
          login(params)
            .then(res => {
              if (res.meta.status === 200) {
                // 存储token
                // setItem('k',value -- token通过文档查看)
                localStorage.setItem('mytoken', res.data.token)
                // 登陆成功,跳转主页
                this.$router.push({name: 'home'})
              } else {
                // 登陆失败,提示用户
                // console.log('用户名或者密码错误')
                this.$message({
                  showClose: true,
                  message: '用户名或者密码错误',
                  type: 'error'
                })
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .info {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-sizing: border-box;
    background-color: #2f4050;
  }
  .content {
    box-sizing: border-box;
    margin: 170px auto 0;
    width: 500px;
    height: 400px;
    background-color: #fff;
    position: relative;
    border-radius: 20px;
  }
  .logo {
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left:-50px;
    z-index: 999;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: powderblue;
    overflow: hidden;
  }
  .logo img {
    width: 100%;
  }
  .userInfo {
    position: absolute;
    width: 400px;
    text-align: center;
    margin: 100px 50px;
  }
  el-button {
    width: 200px;
  }
</style>
