import Vue from 'vue'
import App from './App.vue'
import Api from 'plugins/Api'
import MixedContent from 'plugins/MixedContent'
import router from 'router'
import store from 'store'
import i18n from 'locale'
import VueAnalytics from 'vue-analytics'
import 'bootstrap'
import 'scss/_theme'
import 'fontAwesome'

Vue.use(Api)
Vue.use(MixedContent)

Vue.create = function (options) {
  return new Vue(options)
}

if (process.env.GA_KEY) {
  Vue.use(VueAnalytics, {
    id: process.env.GA_KEY,
    router,
    set: [
      {
        field: 'anonymizeIp',
        value: true
      }
    ]
  })
}

Vue.create({
  i18n,
  router,
  store,
  el: '#app',
  render: h => h(App)
})
