// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { fetch, http } from './assets/js/http.js'

Vue.prototype.$fetch = fetch
Vue.prototype.$http = http
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局过滤器
Vue.filter('timeFilter', function (time) {
  const isTen = num => num < 10 ? `0${num}` : num
  const data = new Date(time)
  const [ year, month, date, hour, minute ] = [
    data.getFullYear(),
    isTen(data.getMonth() + 1),
    isTen(data.getDate()),
    isTen(data.getHours()),
    isTen(data.getMinutes())
  ]
  return `${year}-${month}-${date} ${hour}:${minute}`
})

// 拦截器设置
// router.beforeEach((to, from, next) => {
//   const { accsesId } = 1
//   if (!accsesId) {
//     ElementUI.Message('请先登录！')
//     next({
//       path: '/login'
//     })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
