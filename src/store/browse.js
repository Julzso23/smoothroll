import Vue from 'vue';

export default {
  state: {
    categories: {
      genre: [],
      season: []
    },
    seriesList: []
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSeriesList(state, seriesList) {
      state.seriesList = seriesList;
    },
    appendSeriesList(state, seriesList) {
      state.seriesList = state.seriesList.concat(seriesList);
    }
  },

  actions: {
    async getCategories({commit, dispatch, rootState}, mediaType) {
      await dispatch('verifySession');

      await Vue.api.get('categories', {
        media_type: mediaType,
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setCategories', data);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getCategories', mediaType));
          }
        })
    },

    async listSeries({commit, rootState, dispatch}, {filter, mediaType, limit, offset, append}) {
      await dispatch('verifySession');

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
            commit('appendSeriesList', data);
          } else {
            commit('setSeriesList', data);
          }

          return data
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listSeries', {filter, mediaType, limit, offset, append}));
          }
        });
    }
  }
};
