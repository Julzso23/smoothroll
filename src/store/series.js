import Vue from 'vue';

export default {
  state: {
    seriesList: []
  },

  mutations: {
    setSeriesList(state, seriesList) {
      state.seriesList = seriesList;
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
    }
  }
}
