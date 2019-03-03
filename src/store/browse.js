import Vue from 'vue';

export default {
  state: {
    categories: {
      genre: [],
      season: []
    }
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
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
    }
  }
};
