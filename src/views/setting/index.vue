<template>
  <div class="settingCointer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
            <el-row>
            <el-col :span="14">
            <el-form  :model="user" label-width="80px">
              <el-form-item label="编号">
             {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
               {{user.mobile}}
              </el-form-item>
              <el-form-item label="昵称">
                <el-input type="textarea" v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="obkisadad" >保存</el-button>
              </el-form-item>
            </el-form>
            </el-col>
            <el-col  :offset="2" :span="8"> <el-avatar shape="square" :src="user.photo"  :size="150" :fit="fit" >
            </el-avatar></el-col>
            </el-row>
    </el-card>
  </div>
</template>
<script>
import golbalBus from '@/untils/global-bus.js'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'HomeIndex',
  components: {},
  data () {
    return {
      user: {
        email: '',
        id: 2,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    obkisadad () {
      golbalBus.$emit('update-user', this.user)
    }
  }
}
</script>

<style>
</style>
