//main是整个项目的入口文件

import Vue from 'vue'
import App from './App.vue'
//引入公共CSS
import './assets/css/common.css'

//全局加载vant组件
import './plugins/vant'

Vue.config.productionTip = false
//引入store
import store from './store'
//引入路由对象
import router from './router'

//引入过滤器
import filters from './filters/'

Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]))

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')