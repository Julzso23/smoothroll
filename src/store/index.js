import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
import series from './series';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    series
  }
});
