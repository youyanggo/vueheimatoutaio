<template>
<el-container class="layout-container">
  <el-aside  class="aside" width="auto">
    <AppAside class="Appaside" :is-collapse="isCollapse"></AppAside>
  </el-aside>
  <el-container>
    <el-header class="header">
      <div class="header-left">
        <div>
      <i
      :class="{
      'el-icon-s-fold': isCollapse,
      'el-icon-s-unfold': !isCollapse }" @click="isCollapse = !isCollapse"></i>
    <span>江苏省xxx教育传播有限公司</span>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="tupianright">
          <img :src="user.photo"   class="tupian">
          <div>{{user.name}}</div>
        <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
    </el-header>
    <el-main class="mainer"><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>
<script>
import AppAside from './componment/aside.vue'
import { getUserProfile } from '@/api/user.js'
import golbalBus from '@/untils/global-bus.js'
export default {
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },
  components: {
    AppAside
  },
  created () {
    this.loadUserProfile()
    golbalBus.$on('update-user', (data) => {
      this.user.name = data.name
    })
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style >
  .aside {
    background-color: #D3DCE6;
}
.header {
  background-color: ghostwhite;
}
.mainer {
  background-color: white;
}
.layout-container{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.Appaside {
height: 100%;
}
.header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
}
.tupian {
  border-radius: 50%;
  height: 35px;
}
.tupianright {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
