import Vue from 'vue'
import errorHandler from './errorHandler'

export default {
  namespaced: true,

  state: {
    history: [],
    loading: false,
    loadingMore: false,
    canLoadMore: true,
    limit: 50,
    offset: 0
  },

  mutations: {
    setHistory (state, history) {
      state.history = history
    },
    appendHistory (state, history) {
      state.history = state.history.concat(history)
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setLoadingMore (state, loading) {
      state.loadingMore = loading
    },
    setCanLoadMore (state, canLoadMore) {
      state.canLoadMore = canLoadMore
    },
    incrementOffset (state) {
      state.offset += state.limit
    },
    resetOffset (state) {
      state.offset = 0
    },
    updateMedia (state, media) {
      for (let item of state.history) {
        if (item.media_id === media.media_id) {
          Object.assign(item, media)
          break
        }
      }
    }
  },

  actions: {
    async loadHistory ({ rootState, state, dispatch, commit }, { mediaTypes, append }) {
      if (append) {
        commit('setLoadingMore', true)
        commit('incrementOffset')
      } else {
        commit('setLoading', true)
        commit('resetOffset')
      }

      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('recently_watched', {
        media_types: mediaTypes,
        offset: state.offset,
        limit: state.limit,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.available_time', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number', 'media.series_id'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          let mediaList = []
          for (let item of data) {
            mediaList.push(item.media)
          }

          if (append) {
            commit('appendHistory', mediaList)
            commit('setLoadingMore', false)
          } else {
            commit('setHistory', mediaList)
            commit('setLoading', false)
          }

          if (state.history.length % state.limit !== 0 || mediaList.length === 0) {
            commit('setCanLoadMore', false)
          }

          return data
        })
        .catch(({ code }) => errorHandler(code, 'history/loadHistory', { mediaTypes, append }))
    },

    async getHistory ({ dispatch }, mediaTypes) {
      return dispatch('loadHistory', { mediaTypes, append: false })
    },

    async loadMoreHistory ({ dispatch }, mediaTypes) {
      return dispatch('loadHistory', { mediaTypes, append: true })
    }
  }
}
