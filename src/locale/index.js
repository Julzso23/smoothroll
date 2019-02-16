import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from 'store';

import enUS from './enUS';

Vue.use(VueI18n);

export default new VueI18n({
  locale: store.state.locale.locale,
  fallbackLocale: 'enUS',
  messages: {
    enUS
  },
  silentTranslationWarn: true
});
