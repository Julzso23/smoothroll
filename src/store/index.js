import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
import media from './media';
import queue from './queue';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authentication,
    media,
    queue
  }
});
