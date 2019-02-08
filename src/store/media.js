import Vue from 'vue';

const mediaFields = 'media.media_id,media.available,media.available_time,media.collection_id,media.collection_name,media.series_id,media.series_name,media.type,media.episode_number,media.name,media.description,media.screenshot_image,media.created,media.duration,media.playhead,media.bif_url,media.stream_data';
const seriesFields = 'series.series_id,series.name,series.portrait_image,series.landscape_image,series.description,series.in_queue,series.media_count';

export default {
  state: {
    mediaList: [],
    seriesList: [],
    queue: [],
    currentMedia: null,
    currentSeries: null,
    searchResults: []
  },

  mutations: {
    setMediaList(state, mediaList) {
      state.mediaList = mediaList;
    },
    setSeriesList(state, seriesList) {
      state.seriesList = seriesList;
    },
    setQueue(state, queue) {
      state.queue = queue;
    },
    setCurrentMedia(state, media) {
      state.currentMedia = media;
    },
    setCurrentSeries(state, series) {
      state.currentSeries = series;
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    }
  },

  actions: {
    async listMedia({commit, rootState, dispatch}, {seriesId, count}) {
      await dispatch('verifySession');

      return Vue.api.get('list_media', {
        series_id: seriesId,
        limit: count,
        fields: mediaFields,
        sort: 'desc',
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setMediaList', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listMedia'));
          }
        });
    },

    async listSeries({commit, rootState, dispatch}, {filter, mediaType, limit, offset}) {
      await dispatch('verifySession');

      return Vue.api.get('list_series', {
        filter: filter,
        media_type: mediaType,
        limit: limit,
        offset: offset,
        fields: seriesFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setSeriesList', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listSeries'));
          }
        });
    },

    async getQueue({commit, rootState, dispatch}) {
      await dispatch('verifySession');

      return Vue.api.get('queue', {
        media_types: 'anime|drama',
        fields: [mediaFields, seriesFields].join(','),
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setQueue', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getQueue'));
          }
        });
    },

    async getMedia({commit, rootState, dispatch}, id) {
      await dispatch('verifySession');

      return Vue.api.get('info', {
        media_id: id,
        fields: mediaFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentMedia', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getMedia'));
          }
        });
    },

    async getSeries({commit, rootState, dispatch}, id) {
      await dispatch('verifySession');

      return Vue.api.get('info', {
        series_id: id,
        fields: seriesFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentSeries', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getSeries'));
          }
        });
    },

    async search({commit, rootState, dispatch}, query) {
      await dispatch('verifySession');

      return Vue.api.get('autocomplete', {
        media_types: 'anime|drama',
        q: query,
        filter: seriesFields,
        limit: 5,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setSearchResults', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('search'));
          }
        });
    },

    async toggleQueue({rootState, dispatch}, {seriesId, inQueue}) {
      await dispatch('verifySession');

      const request = inQueue ? 'remove_from_queue' : 'add_to_queue';
      return Vue.api.post(request, {
        series_id: seriesId,
        session_id: rootState.authentication.sessionId
      })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('toggleQueue'));
          }
        });
    },

    async logTime({rootState, dispatch}, {mediaId, time}) {
      await dispatch('verifySession');

      return Vue.api.post('log', {
        media_id: mediaId,
        playhead: time,
        event: 'playback_status',
        session_id: rootState.authentication.sessionId
      })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('logTime'));
          }
        });
    },

    async sortQueue({commit}, queue) {
      commit('setQueue', queue);
    },

    async getHistory({rootState, dispatch, commit}, {mediaTypes, limit, offset}) {
      await dispatch('verifySession');

      return Vue.api.get('recently_watched', {
        media_types: mediaTypes,
        offset: offset,
        limit: limit,
        fields: mediaFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          let mediaList = [];
          for (let item of data) {
            mediaList.push(item.media);
          }
          commit('setMediaList', mediaList);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getHistory'));
          }
        });
    }
  }
}
