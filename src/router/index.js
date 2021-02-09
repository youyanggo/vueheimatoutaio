import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import publishArticle from '@/views/publish/index.vue'
import image from '@/views/image/index.vue'
import Comment from '@/views/comments/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publishIndex',
        component: publishArticle
      },
      {
        path: '/image',
        name: 'imageIndexa',
        component: image
      },
      {
        path: '/comment',
        name: 'commentIndex',
        component: Comment
      },
      {
        path: '/settings',
        name: 'settingIdex',
        component: Setting
      },
      {
        path: '/fans',
        name: 'fanIndex',
        component: Fans
      }
    ]

  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
