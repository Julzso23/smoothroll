import Vue from 'vue';

const mediaFields = 'media.media_id,media.available,media.available_time,media.collection_id,media.collection_name,media.series_id,media.series_name,media.type,media.episode_number,media.name,media.description,media.screenshot_image,media.created,media.duration,media.playhead,media.bif_url,media.stream_data';
const seriesFields = 'series.series_id,series.name,series.portrait_image,series.landscape_image,series.description,series.in_queue';

export default {
  state: {
    seriesList: [],
    queue: [],
    currentMedia: null,
    currentSeries: null
  },

  mutations: {
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
    }
  },

  actions: {
    async listSeries({commit, rootState, dispatch}, {filter, mediaType, limit, offset}) {
      await dispatch('verifySession');

      Vue.api.get('list_series', {
        filter: filter,
        media_type: mediaType,
        limit: limit,
        offset: offset,
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

      Vue.api.get('queue', {
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

      Vue.api.get('info', {
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

      Vue.api.get('info', {
        series_id: id,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentSeries', data);
        })
        .catch(code => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getSeries'));
          }
        })
    }
  }
}
