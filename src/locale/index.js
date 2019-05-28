import Vue from 'vue'
import VueI18n from 'vue-i18n'
import moment from 'moment'

import enUS from './enUS'
import esLA from './esLA'
import esES from './esES'
import ptBR from './ptBR'
import ptPT from './ptPT'
import frFR from './frFR'
import deDE from './deDE'
import itIT from './itIT'
import ruRU from './ruRU'

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameDay: '[Today]',
    sameElse: 'MMMM Do'
  }
})
moment.updateLocale('en-GB', {
  calendar: {
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameDay: '[Today]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('de', {
  calendar: {
    lastDay: '[Gestern]',
    lastWeek: '[Letzten] dddd',
    sameDay: '[Heute]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('es', {
  calendar: {
    lastDay: '[Ayer]',
    lastWeek: '[El] dddd [pasado]',
    sameDay: '[Hoy]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('fr', {
  calendar: {
    lastDay: '[Hier]',
    lastWeek: 'dddd [dernier]',
    sameDay: '[Aujourd\'hui]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('it', {
  calendar: {
    lastDay: '[Ieri]',
    lastWeek: function () {
      switch (this.day()) {
        case 0:
          return '[la scorsa] dddd'
        default:
          return '[lo scorso] dddd'
      }
    },
    sameDay: '[Oggi]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('pt', {
  calendar: {
    lastDay: '[Ontem]',
    lastWeek: function () {
      switch (this.day()) {
        case 0:
        case 6:
          return '[Último]'
        default:
          return '[Última]'
      }
    },
    sameDay: '[Hoje]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('pt-BR', {
  calendar: {
    lastDay: '[Ontem]',
    lastWeek: function () {
      switch (this.day()) {
        case 0:
        case 6:
          return '[Último]'
        default:
          return '[Última]'
      }
    },
    sameDay: '[Hoje]',
    sameElse: 'Do MMMM'
  }
})
moment.updateLocale('ru', {
  calendar: {
    lastDay: '[Вчера]',
    lastWeek: function (now) {
      if (now.week() !== this.week()) {
        switch (this.day()) {
          case 0:
            return '[В прошлое] dddd'
          case 1:
          case 2:
          case 4:
            return '[В прошлый] dddd'
          case 3:
          case 5:
          case 6:
            return '[В прошлую] dddd'
        }
      } else {
        if (this.day() === 2) {
          return '[Во] dddd'
        } else {
          return '[В] dddd'
        }
      }
    },
    sameDay: '[Сегодня]',
    sameElse: 'Do MMMM'
  }
})

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'enUS',
  fallbackLocale: 'enUS',
  messages: {
    enUS,
    esLA,
    esES,
    ptBR,
    ptPT,
    frFR,
    deDE,
    itIT,
    ruRU
  },
  silentTranslationWarn: true
})
