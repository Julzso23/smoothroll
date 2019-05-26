import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import media from './media'
import queue from './queue'
import locale from './locale'
import browse from './browse'
import history from './history'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    media,
    queue,
    locale,
    browse,
    history
  }
})
