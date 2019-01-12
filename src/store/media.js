import Vue from 'vue';

export default {
  state: {
    seriesList: [],
    queue: []
  },

  mutations: {
    setSeriesList(state, seriesList) {
      state.seriesList = seriesList;
    },
    setQueue(state, queue) {
      state.queue = queue;
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

      Vue.api.get('queue', {
        media_types: 'anime|drama',
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setQueue', data);
        });
    }
  }
}
