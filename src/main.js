import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // import common css file
import axios from 'axios'
import '_nprogress@0.2.0@nprogress/nprogress.css' // node_modules

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
