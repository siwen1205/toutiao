import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
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

export default router
