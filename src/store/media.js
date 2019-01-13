import Vue from 'vue';

export default {
  state: {
    seriesList: [],
    queue: [],
    currentMedia: null
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
        });
    },

    async getQueue({commit, rootState, dispatch}) {
      await dispatch('verifySession');

      const mediaFields = 'media.media_id,media.available,media.available_time,media.collection_id,media.collection_name,media.series_id,media.series_name,media.type,media.episode_number,media.name,media.description,media.screenshot_image,media.created,media.duration,media.playhead,media.bif_url';
      const seriesFields = 'series.series_id,series.name,series.portrait_image,series.landscape_image,series.description,series.in_queue';

      Vue.api.get('queue', {
        media_types: 'anime|drama',
        fields: [mediaFields, seriesFields].join(','),
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setQueue', data);
        });
    },

    async getMedia({commit, rootState, dispatch}, id) {
      await dispatch('verifySession');

      Vue.api.get('info', {
        media_id: id,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentMedia', data);
        });
    }
  }
}
