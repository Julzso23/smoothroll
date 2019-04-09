import Vue from 'vue'
import errorHandler from './errorHandler'

export default {
  namespaced: true,
  state: {
    categories: {
      genre: [],
      season: []
    },
    seriesList: []
  },

  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    },
    setSeriesList (state, seriesList) {
      state.seriesList = seriesList
    },
    appendSeriesList (state, seriesList) {
      state.seriesList = state.seriesList.concat(seriesList)
    }
  },

  actions: {
    async getCategories ({ commit, dispatch, rootState }, mediaType) {
      await dispatch('authentication/verifySession', null, {root: true})

      await Vue.api.get('categories', {
        media_type: mediaType,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCategories', data)
        })
        .catch(({ code }) => errorHandler(code, 'getCategories', mediaType))
    },

    async listSeries ({ commit, rootState, dispatch }, { filter, mediaType, limit, offset, append }) {
      await dispatch('authentication/verifySession', null, {root: true})

      return Vue.api.get('list_series', {
        filter: filter,
        media_type: mediaType,
        limit: limit,
        offset: offset,
        fields: ['series.series_id', 'series.name', 'series.portrait_image', 'series.in_queue', 'series.description'].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          if (append) {
            commit('appendSeriesList', data)
          } else {
            commit('setSeriesList', data)
          }

          return data
        })
        .catch(({ code }) => errorHandler(code, 'listSeries', { filter, mediaType, limit, offset, append }))
    }
  }
}
