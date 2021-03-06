import Vue from 'vue'
import errorHandler from './errorHandler'

export default {
  namespaced: true,
  state: {
    mediaList: [],
    currentMedia: null,
    currentSeries: null,
    currentSeriesKitsuPage: null,
    searchResults: [],
    recentMedia: [],
    recentMediaLoading: true,
    collection: [],
    displayCompact: window.localStorage.getItem('displayCompact') === 'true'
  },

  mutations: {
    setMediaList (state, mediaList) {
      state.mediaList = mediaList
    },
    appendMediaList (state, mediaList) {
      state.mediaList = state.mediaList.concat(mediaList)
    },
    setCurrentMedia (state, media) {
      state.currentMedia = media
    },
    setCurrentSeries (state, series) {
      state.currentSeries = series
    },
    setCurrentSeriesKitsuPage (state, url) {
      state.currentSeriesKitsuPage = url
    },
    setSearchResults (state, results) {
      state.searchResults = results
    },
    setRecentMedia (state, recentMedia) {
      state.recentMedia = recentMedia
    },
    setRecentMediaLoading (state, loading) {
      state.recentMediaLoading = loading
    },
    setCollection (state, collection) {
      state.collection = collection
    },
    setCompactDisplay (state, compact) {
      state.displayCompact = compact
      window.localStorage.setItem('displayCompact', compact)
    },
    updateMedia (state, media) {
      for (const item of state.mediaList) {
        if (item.media_id === media.media_id) {
          Object.assign(item, media)
          break
        }
      }

      for (const item of state.recentMedia) {
        if (item.media_id === media.media_id) {
          Object.assign(item, media)
          break
        }
      }

      for (const item of state.collection) {
        if (item.media_id === media.media_id) {
          Object.assign(item, media)
          break
        }
      }

      if (state.currentMedia && state.currentMedia.media_id === media.media_id) {
        Object.assign(state.currentMedia, media)
      }
    },
    updateSeries (state, series) {
      if (state.currentSeries && state.currentSeries.series_id === series.series_id) {
        Object.assign(state.currentSeries, series)
      }
    }
  },

  actions: {
    async listMedia ({ commit, rootState, dispatch }, { seriesId, count }) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('list_media', {
        series_id: seriesId,
        limit: count,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.available_time', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number', 'media.collection_id', 'media.collection_name',
          'media.series_id'
        ].join(','),
        sort: 'desc',
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setMediaList', data)
        })
        .catch(({ code }) => errorHandler(code, 'media/listMedia'))
    },

    async getMedia ({ commit, rootState, dispatch }, id) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('info', {
        media_id: id,
        fields: [
          'media.media_id', 'media.name', 'media.description', 'media.episode_number', 'media.collection_name',
          'media.screenshot_image', 'media.stream_data', 'media.duration', 'media.playhead', 'media.collection_id',
          'media.series_id', 'series'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          return Vue.api.get('info', {
            series_id: data.series_id,
            fields: [
              'series.in_queue'
            ].join(','),
            locale: rootState.locale.locale,
            session_id: rootState.authentication.sessionId,
            auth: rootState.authentication.authTicket
          })
            .then(seriesData => {
              data.in_queue = seriesData.in_queue
              commit('setCurrentMedia', data)
            })
        })
        .catch(({ code }) => errorHandler(code, 'media/getMedia', id))
    },

    async getSeries ({ commit, rootState, dispatch }, id) {
      await dispatch('authentication/verifySession', null, { root: true })

      commit('setCurrentSeriesKitsuPage', null)

      return Vue.api.get('info', {
        series_id: id,
        fields: [
          'series.series_id', 'series.name', 'series.description', 'series.portrait_image', 'series.landscape_image',
          'series.in_queue', 'series.rating', 'series.media_count', 'series.genres', 'series.media_type'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCurrentSeries', data)

          return window.fetch('https://kitsu.io/api/edge/anime?filter[text]=' + data.name)
            .then(response => response.json())
            .then(response => {
              for (const series of response.data) {
                for (const title of Object.values(series.attributes.titles)) {
                  if (title.toUpperCase() === data.name.toUpperCase()) {
                    commit('setCurrentSeriesKitsuPage', 'https://kitsu.io/anime/' + series.attributes.slug)
                    return
                  }
                }
              }
            })
        })
        .catch(({ code }) => errorHandler(code, 'media/getSeries', id))
    },

    async search ({ commit, rootState, dispatch }, query) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('autocomplete', {
        media_types: 'anime|drama',
        q: query,
        filter: 'series.name',
        limit: 5,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setSearchResults', data)
        })
        .catch(({ code }) => errorHandler(code, 'media/search', query))
    },

    async toggleQueue ({ rootState, dispatch }, { seriesId, inQueue }) {
      await dispatch('authentication/verifySession', null, { root: true })

      const request = inQueue ? 'remove_from_queue' : 'add_to_queue'
      return Vue.api.post(request, {
        series_id: seriesId,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .catch(({ code }) => errorHandler(code, 'media/toggleQueue', { seriesId, inQueue }))
    },

    async logTime ({ rootState, dispatch }, { mediaId, time }) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.post('log', {
        media_id: mediaId,
        playhead: time,
        event: 'playback_status',
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .catch(({ code }) => errorHandler(code, 'media/logTime', { mediaId, time }))
    },

    async getRecentMedia ({ rootState, dispatch, commit }, mediaType) {
      commit('setRecentMediaLoading', true)
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('list_series', {
        media_type: mediaType,
        filter: 'updated',
        limit: 50,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.available_time', 'series.most_recent_media',
          'media.screenshot_image', 'media.collection_name', 'media.name', 'media.episode_number', 'media.series_id'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          const recentMedia = []
          for (const series of data) {
            recentMedia.push(series.most_recent_media)
          }

          commit('setRecentMedia', recentMedia)
          commit('setRecentMediaLoading', false)
        })
        .catch(({ code }) => errorHandler(code, 'media/getRecentMedia', mediaType))
    },

    async getCollection ({ rootState, dispatch, commit }, collectionId) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('list_media', {
        collection_id: collectionId,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number', 'media.series_id'
        ].join(','),
        limit: 999,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCollection', data)
        })
        .catch(({ code }) => errorHandler(code, 'media/getCollection', collectionId))
    },

    async setWatched ({ rootState, dispatch, commit }, { mediaId, watched, duration }) {
      return dispatch('logTime', {
        mediaId,
        time: watched ? duration : 0
      })
    },

    async updateMedia ({ rootState, dispatch, commit }, id) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('info', {
        media_id: id,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number', 'media.series_id'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(media =>
          Vue.api.get('info', {
            series_id: media.series_id,
            fields: [
              'series.in_queue'
            ].join(','),
            locale: rootState.locale.locale,
            session_id: rootState.authentication.sessionId,
            auth: rootState.authentication.authTicket
          })
            .then(seriesData => {
              media.in_queue = seriesData.in_queue
              commit('updateMedia', media)
              commit('queue/updateMedia', media, { root: true })
              commit('history/updateMedia', media, { root: true })
            })
        )
        .catch(({ code }) => errorHandler(code, 'media/getUpdatedMedia', id))
    },

    async updateSeries ({ commit, rootState, dispatch }, id) {
      await dispatch('authentication/verifySession', null, { root: true })

      return Vue.api.get('info', {
        series_id: id,
        fields: ['series.series_id', 'series.name', 'series.portrait_image', 'series.in_queue', 'series.description'].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(series => {
          commit('updateSeries', series)
          commit('browse/updateSeries', series, { root: true })
        })
        .catch(({ code }) => errorHandler(code, 'media/updateSeries', id))
    }
  }
}
