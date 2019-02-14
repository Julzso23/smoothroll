import uuid from 'uuid/v4';
import Vue from 'vue';

const _access_token = 'LNDJgOit5yaRIWN';
const _device_type = 'com.crunchyroll.windows.desktop';

export default {
  state: {
    sessionId: localStorage.getItem('sessionId') || null,
    authTicket: localStorage.getItem('authTicket') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: ''
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    setSession(state, sessionId) {
      state.sessionId = sessionId;
      localStorage.setItem('sessionId', sessionId);
    },
    removeSession(state) {
      state.sessionId = null;
      localStorage.removeItem('sessionId');
    },
    setAuthTicket(state, authTicket) {
      state.authTicket = authTicket;
      localStorage.setItem('authTicket', authTicket);
    },
    removeAuthTicket(state) {
      state.authTicket = null;
      localStorage.removeItem('authTicket');
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    }
  },

  actions: {
    async startSession({commit}) {
      const id = uuid().toUpperCase();

      await Vue.api.post('start_session', {
        access_token: _access_token,
        device_type: _device_type,
        device_id: id
      }).then(data => {
        commit('setSession', data.session_id);
      });
    },

    async verifySession({dispatch, state}) {
      if (state.sessionId == null) {
        await dispatch('startSession');
      }
    },

    async login({commit, dispatch, state}, {account, password}) {
      commit('setLoading', true);
      await dispatch('verifySession');

      await Vue.api.post('login', {
        account: account,
        password: password,
        session_id: state.sessionId
      })
        .then(data => {
          commit('setAuthTicket', data.auth);
          commit('setUser', data.user);
        })
        .catch(({code, message}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('login', {account, password}));
          } else {
            commit('setError', message);
          }
        })
        .then(() => {
          commit('setLoading', false)
        });
    },

    async logout({commit, state}) {
      if (state.authTicket) {
        await Vue.api.post('logout', {
          auth: state.authTicket
        })
          .catch(() => {
          });

        commit('removeAuthTicket');
        commit('removeUser');
        commit('removeSession');
      }
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.authTicket != null;
    },
    isPremium(state) {
      return state.user != null && (state.user.access_type == 'premium' || state.user.premium.includes('anime'));
    }
  }
};
