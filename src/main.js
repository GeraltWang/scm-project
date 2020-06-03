// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.filter('status', function (status) {
  if (status == 0) {
    status = "未锁定"
    return status
  } else {
    status = "锁定"
    return status

  }
})
Vue.filter('paytype', function (value) {
  if (value == 1) {
    value = "货到付款"
    return value
  } else if (value == 2) {
    value = "款到发货"
    return value
  } else {
    value = "预付款到发货"
    return value
  }
})
// Vue.filter('type', function (value) {
//   if (value == 1) {
//     value = "新增"
//     return value
//   } else if (value == 2) {
//     value = "可入库"
//     return value
//   } else if (value == 3) {
//     value = "可付款"
//     return value
//   } else {
//     value = "可了结"
//     return value
//   }
// })
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
