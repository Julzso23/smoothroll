import Vue from 'vue'
import errorHandler from './errorHandler'

export default {
  namespaced: true,
  state: {
    categories: {
      genre: [],
      season: []
    },
    seriesList: [],
    loading: false
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
    },
    updateSeries (state, series) {
      for (const item of state.seriesList) {
        if (item.series_id === series.series_id) {
          Object.assign(item, series)
          break
        }
      }
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },

  actions: {
    async getCategories ({ commit, dispatch, rootState }, mediaType) {
      await dispatch('authentication/verifySession', null, { root: true })

      await Vue.api.get('categories', {
        media_type: mediaType,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCategories', data)
        })
        .catch(({ code }) => errorHandler(code, 'browse/getCategories', mediaType))
    },

    async listSeries ({ commit, rootState, dispatch }, { filter, mediaType, limit, offset, append }) {
      if (!append) {
        commit('setLoading', true)
      }

      await dispatch('authentication/verifySession', null, { root: true })

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
            commit('setLoading', false)
          }

          return data
        })
        .catch(({ code }) => errorHandler(code, 'browse/listSeries', { filter, mediaType, limit, offset, append }))
    }
  }
}
