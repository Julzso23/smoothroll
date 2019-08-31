import Vue from 'vue'
import errorHandler from './errorHandler'

function sortQueue (queue, order) {
  queue.sort((a, b) => {
    let indexA = null
    let indexB = null
    for (const i in order) {
      if (a.series.series_id === order[i]) {
        indexA = i
      }
      if (b.series.series_id === order[i]) {
        indexB = i
      }
    }

    if (indexA != null && indexB != null) {
      if (indexA < indexB) {
        return -1
      } else {
        return 1
      }
    } else {
      if (indexA != null) {
        return -1
      } else {
        return 1
      }
    }
  })

  for (const i in queue) {
    queue.queue_entry_id = i
  }

  return queue
}

export default {
  namespaced: true,
  state: {
    queue: [],
    queueOrder: JSON.parse(window.localStorage.getItem('queueOrder')) || [],
    loading: false
  },

  mutations: {
    setQueue (state, queue) {
      state.queue = queue
    },
    setQueueOrder (state, order) {
      state.queueOrder = order
      window.localStorage.setItem('queueOrder', JSON.stringify(order))
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    updateMedia (state, media) {
      for (const item of state.queue) {
        if (item.most_likely_media.media_id === media.media_id) {
          item.most_likely_media = media
          break
        }
      }
    }
  },

  actions: {
    async getQueue ({ commit, rootState, state, dispatch }, mediaType) {
      commit('setLoading', true)
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('queue', {
        media_types: mediaType || 'anime|drama',
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number', 'media.series_id'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setQueue', sortQueue(data, state.queueOrder))
          commit('setLoading', false)
        })
        .catch(({ code }) => errorHandler(code, 'queue/getQueue'))
    },

    async sortQueue ({ commit }, queue) {
      commit('setQueue', queue)

      const queueOrder = []
      for (const item of queue) {
        queueOrder.push(item.series.series_id)
      }

      commit('setQueueOrder', queueOrder)
    }
  }
}
