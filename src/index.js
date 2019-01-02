import Vue from 'vue';
import App from './App.vue';
import Api from 'plugins/Api';
import router from 'router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Api);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
