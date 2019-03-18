import Vue from 'vue'

export default {
  state: {
    mediaList: [],
    currentMedia: null,
    currentSeries: null,
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
    }
  },

  actions: {
    async listMedia ({ commit, rootState, dispatch }, { seriesId, count }) {
      await dispatch('verifySession')

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
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listMedia'))
          }
        })
    },

    async getMedia ({ commit, rootState, dispatch }, id) {
      await dispatch('verifySession')

      return Vue.api.get('info', {
        media_id: id,
        fields: [
          'media.media_id', 'media.name', 'media.description', 'media.episode_number', 'media.collection_name',
          'media.screenshot_image', 'media.stream_data', 'media.duration', 'media.playhead', 'media.collection_id',
          'media.series_id'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCurrentMedia', data)
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getMedia', id))
          }
        })
    },

    async getSeries ({ commit, rootState, dispatch }, id) {
      await dispatch('verifySession')

      return Vue.api.get('info', {
        series_id: id,
        fields: [
          'series.series_id', 'series.name', 'series.description', 'series.portrait_image', 'series.landscape_image',
          'series.in_queue', 'series.rating', 'series.media_count'
        ].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCurrentSeries', data)
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getSeries', id))
          }
        })
    },

    async search ({ commit, rootState, dispatch }, query) {
      await dispatch('verifySession')

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
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('search', query))
          }
        })
    },

    async toggleQueue ({ rootState, dispatch }, { seriesId, inQueue }) {
      await dispatch('verifySession')

      const request = inQueue ? 'remove_from_queue' : 'add_to_queue'
      return Vue.api.post(request, {
        series_id: seriesId,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('toggleQueue', { seriesId, inQueue }))
          }
        })
    },

    async logTime ({ rootState, dispatch }, { mediaId, time }) {
      await dispatch('verifySession')

      return Vue.api.post('log', {
        media_id: mediaId,
        playhead: time,
        event: 'playback_status',
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('logTime', { mediaId, time }))
          }
        })
    },

    async getHistory ({ rootState, dispatch, commit }, { mediaTypes, limit, offset, append }) {
      await dispatch('verifySession')

      return Vue.api.get('recently_watched', {
        media_types: mediaTypes,
        offset: offset,
        limit: limit,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.available_time', 'media.screenshot_image',
          'media.collection_name', 'media.name', 'media.episode_number'
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
            commit('appendMediaList', mediaList)
          } else {
            commit('setMediaList', mediaList)
          }

          return data
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getHistory', { mediaTypes, limit, offset, append }))
          }
        })
    },

    async getRecentMedia ({ rootState, dispatch, commit }, mediaType) {
      commit('setRecentMediaLoading', true)
      await dispatch('verifySession')

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
          let recentMedia = []
          for (let series of data) {
            recentMedia.push(series.most_recent_media)
          }

          commit('setRecentMedia', recentMedia)
          commit('setRecentMediaLoading', false)
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getRecentMedia', mediaType))
          }
        })
    },

    async getCollection ({ rootState, dispatch, commit }, collectionId) {
      await dispatch('verifySession')

      return Vue.api.get('list_media', {
        collection_id: collectionId,
        fields: [
          'media.media_id', 'media.playhead', 'media.duration', 'media.screenshot_image', 'media.name', 'media.episode_number'
        ].join(','),
        limit: 999,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCollection', data)
        })
        .catch(({ code }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getCollection', collectionId))
          }
        })
    }
  }
}
