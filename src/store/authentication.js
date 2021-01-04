import { v4 as uuid } from 'uuid'
import Vue from 'vue'

const accessToken = 'LNDJgOit5yaRIWN'
const deviceType = 'com.crunchyroll.windows.desktop'

export default {
  namespaced: true,
  state: {
    sessionId: window.localStorage.getItem('sessionId') || null,
    authTicket: window.localStorage.getItem('authTicket') || null,
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null,
    loading: false,
    error: ''
  },

  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    removeUser (state) {
      state.user = null
      window.localStorage.removeItem('user')
    },
    setSession (state, sessionId) {
      state.sessionId = sessionId
      window.localStorage.setItem('sessionId', sessionId)
    },
    removeSession (state) {
      state.sessionId = null
      window.localStorage.removeItem('sessionId')
    },
    setAuthTicket (state, authTicket) {
      state.authTicket = authTicket
      window.localStorage.setItem('authTicket', authTicket)
    },
    removeAuthTicket (state) {
      state.authTicket = null
      window.localStorage.removeItem('authTicket')
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setError (state, error) {
      state.error = error
    }
  },

  actions: {
    async startSession ({ commit }) {
      const id = uuid().toUpperCase()

      return Vue.api.post('start_session', {
        access_token: accessToken,
        device_type: deviceType,
        device_id: id
      }).then(data => {
        commit('setSession', data.session_id)
      })
    },

    async verifySession ({ dispatch, state }) {
      if (state.sessionId == null) {
        return dispatch('startSession')
      }
    },

    async login ({ commit, dispatch, state }, { account, password }) {
      commit('setLoading', true)
      await dispatch('verifySession')

      return Vue.api.post('login', {
        account: account,
        password: password,
        session_id: state.sessionId
      })
        .then(data => {
          commit('setAuthTicket', data.auth)
          commit('setUser', data.user)
        })
        .catch(({ code, message }) => {
          if (code === 'bad_session') {
            return dispatch('startSession').then(() => dispatch('login', { account, password }))
          } else {
            commit('setError', message)
          }
        })
        .then(() => {
          commit('setLoading', false)
        })
    },

    async logout ({ commit, state }) {
      if (state.authTicket) {
        await Vue.api.post('logout', {
          auth: state.authTicket
        })
          .catch(() => {
          })

        commit('removeAuthTicket')
        commit('removeUser')
        commit('removeSession')
      }
    }
  },

  getters: {
    isLoggedIn (state) {
      return state.authTicket != null
    },
    isPremium (state) {
      return state.user != null && (state.user.access_type === 'premium' || state.user.premium.includes('anime'))
    }
  }
}
