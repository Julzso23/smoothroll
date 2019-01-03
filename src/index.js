import Vue from 'vue';
import App from './App.vue';
import Api from 'plugins/Api';
import router from 'router';
import 'bootstrap';
import 'scss/_theme';

Vue.use(Api);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
