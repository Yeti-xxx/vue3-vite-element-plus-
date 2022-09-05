<template>
  <div class="login">
    <el-card class="box-card">
      <el-form label-position="right" label-width="100px" style="">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item class="loginButton">
          <el-button type="primary" size="large" class="loginButton" @click="login">登录</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
// import serviceAxios from './axiosChange.js';
import axios from 'axios'
import service from '../axiosChange/axiosconfig.js'

export default {
  name: 'MyApp',
  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    login() {
      service({
        method: 'post',
        url: '/api/login',
        data: this.form
      }).then(res => {
        const data = res.data
        // console.log(data);
        if (data.status !== 0) {
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功！')
        localStorage.setItem('token', data.token)
        this.$router.push('/home')
      }).catch(err => {
        console.log(err);
      })

    }
  }
}

</script>

<style lang='less' scoped>
.box-card {
  position: absolute;
  width: 480px;
  padding-left: 0;
  padding-right: 20px;
  box-shadow: 7px 8px 12px 0px rgba(97, 97, 97, 0.86);
  margin-top: 12%;
  margin-left: 33%;
}

.login {
  width: 100%;
  height: 100%;
  position: absolute;

  background-image: -moz-linear-gradient(45deg, rgb(168, 225, 255), rgb(179, 181, 255));

  background-image: -webkit-linear-gradient(45deg, rgb(168, 225, 255), rgb(179, 181, 255));

  background-image: linear-gradient(45deg, rgb(168, 225, 255), rgb(179, 181, 255));

}

.loginButton {
  text-align: center;
}
</style>
