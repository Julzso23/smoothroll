import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from 'store';

import enUS from './enUS';
import esLA from './esLA';
import esES from './esES';
import frFR from './frFR';
import deDE from './deDE';
import ruRU from './ruRU';

Vue.use(VueI18n);

export default new VueI18n({
  locale: store.state.locale.locale,
  fallbackLocale: 'enUS',
  messages: {
    enUS,
    esLA,
    esES,
    frFR,
    deDE,
    ruRU
  },
  silentTranslationWarn: true
});
