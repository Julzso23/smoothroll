import Vue from 'vue'
import errorHandler from './errorHandler'
import moment from 'moment'
import i18n from 'locale'
import { event } from 'vue-analytics'

function crunchyrollToMomentLocale (locale) {
  return locale.slice(0, 2) + '-' + locale.slice(2)
}

export default {
  namespaced: true,
  state: {
    locale: 'enUS',
    localeList: []
  },

  mutations: {
    setLocale (state, locale) {
      state.locale = locale
      moment.locale(crunchyrollToMomentLocale(locale))
      i18n.locale = locale
      window.localStorage.setItem('locale', locale)
      event('locale', 'setLocale', locale)
    },
    setLocaleList (state, localeList) {
      state.localeList = localeList
    }
  },

  actions: {
    async getLocales ({ rootState, dispatch, commit }) {
      await dispatch('authentication/verifySession', null, { root: true })

      Vue.api.get('list_locales', {
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setLocaleList', data)
        })
        .catch(({ code }) => errorHandler(code, 'locale/getLocales'))
    }
  }
}
