import Vue from 'vue'
import App from './App.vue'
import Api from 'plugins/Api'
import router from 'router'
import store from 'store'
import i18n from 'locale'
import 'bootstrap'
import('scss/_theme')

Vue.use(Api)

Vue.create = function (options) {
  return new Vue(options)
}

Vue.create({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(App)
})
