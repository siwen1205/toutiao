import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
import Home from '@/views/home' // @ == src dir
import Article from '@/views/article'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

import NProgress from '_nprogress@0.2.0@nprogress'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/', // default router path
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish //  同一个路由组件名字相同 路径不同时 路径切换从路由缓存中获取数据 为了避免数据冲突 需在 router-view 绑定 :key="$route.path"
      },
      {
        path: '/publish/:articleId',
        component: Publish // ======================
      },
      {
        path: '/comment',
        component: Comment
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about', 按需加载路由地址
  //   name: 'About',

  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
// check token ? 参考网址 - 'router.vuejs.org'
router.beforeEach((to, from, next) => {
  NProgress.start()
  // login page do not require token check
  if (to.path === '/login') {
    next()
    return
  }
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    NProgress.done()
    next('/login')
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
export default router
