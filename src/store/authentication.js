import uuid from 'uuid/v4';
import Vue from 'vue';

const _access_token = 'LNDJgOit5yaRIWN';
const _device_type = 'com.crunchyroll.windows.desktop';

export default {
  state: {
    sessionId: null,
    authTicket: null,
    user: null
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setSession(state, sessionId) {
      state.sessionId = sessionId;
    },
    setAuthTicket(state, authTicket) {
      state.authTicket = authTicket;
    },
    removeAuthTicket(state) {
      state.authTicket = null;
    }
  },

  actions: {
    startSession({commit}) {
      const id = uuid().toUpperCase();

      Vue.api.post('start_session', {
        access_token: _access_token,
        device_type: _device_type,
        device_id: id
      }).then(data => {
        commit('sessionId', data.session_id);
      });
    },

    async login({commit, statedispatch, }, {account, password}) {
      if (!state.sessionId) {
        state.sessionId = await dispatch('startSession');
      }

      this.post('login', {
        account: account,
        password: password,
        session_id: state.sessionId
      })
        .then(data => {
          commit('setAuthTicket', data.auth);
          commit('setUser', data.user);
        });
    },

    async logout({commit}) {
      let auth = localStorage.getItem('auth');
      if (auth) {
        await this.post('logout', {
          auth: auth
        })
          .catch(code => {
          });

        commit('removeAuthTicket');
      }
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.authToken != null;
    }
  }
};
