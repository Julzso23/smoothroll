<template>
  <div class="row">
    <div class="col-md-6 offset-md-0 col-10 offset-1">
      <dropdown-selector v-if="localeList.length != 0" :options="localeList" label="Locale" :initialSelection="locale" @selectionUpdate="key => setLocale(key)" />
    </div>
  </div>
</template>

<script>
  import Loading from 'modules/shared/components/Loading';
  import DropdownSelector from 'modules/shared/components/DropdownSelector';

  export default {
    name: 'settings',
    components: {
      Loading,
      DropdownSelector
    },
    created() {
      this.$store.dispatch('getLocales');
      document.title = `${this.$t('navbar.settings')} ― Smoothroll`;
    },
    computed: {
      locale() {
        return this.$store.state.locale.locale;
      },
      localeList() {
        let locales = [];
        for (let locale of this.$store.state.locale.localeList) {
          locales.push({key: locale.locale_id, value: locale.label});
        }
        return locales;
      }
    },
    methods: {
      setLocale(locale) {
        this.$store.commit('setLocale', locale);
        this.$i18n.locale = locale;
      }
    }
  }
</script>
