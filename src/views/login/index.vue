<template>
  <div class="login-container">
    <el-form :model="user" :rules="formRules" ref="ruleForm"  class="login-form">
      <div class="login-head"></div>
      <el-form-item  prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号" ></el-input>
      </el-form-item>
     <el-form-item prop="code">
       <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
     </el-form-item>
     <el-form-item prop="agree">
       <el-checkbox v-model="user.agree" > 我已阅读并同意用户协议和隐私条款</el-checkbox>
     </el-form-item>
      <el-form-item>
        <el-button :loading="isLoading"   type="primary" style="width: 100%" @click="onLoad"  >登陆</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
import { login } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      isLoading: false,

      formRules: { // 表单验证规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            rigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onLoad () {
      this.isLoading = true
      login(this.user).then(res => {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.isLoading = false
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push('/')
        console.log(res)
      }).catch(err => {
        console.log('登陆失败', err)
        this.$message.error('登陆失败，手机号或者验证码错误')
        this.isLoading = false
      })
    }
  }
}
</script>

<style>
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: url(login_bg.jpg) no-repeat;
    background-size: cover;
  }
  .login-form {
    background: #fff;
    padding-top: 15px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 10px;
    min-width: 300px;
  }
  .login-head {
     display: flex;
     justify-content: center;
     height: 57px;
     width: 265px;
     background: url(logo_index.png) no-repeat;
     padding-bottom: 30px;
     margin-left:20px;
   }
   .login-first{
     background-color: #fff;
   }
</style>
