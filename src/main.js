// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import 'lib-flexible/flexible.js'
import router from './router/index'
import store from './store/index'
Vue.config.productionTip = false
// 首先获取视窗高度，再乘以1%得到vh单位的值


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
