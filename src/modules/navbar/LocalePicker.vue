<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="localeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span :class="'flag-icon ' + flags[locale]"></span>
      </a>
      <div class="dropdown-menu bg-dark" aria-labelledby="localeDropdown">
        <a class="dropdown-item bg-dark text-light" href="#" v-for="locale in localeList" :key="locale.locale_id" @click="setLocale(locale.locale_id)">
          <span :class="'flag-icon ' + flags[locale.locale_id]"></span>
          {{locale.label}}
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item bg-dark text-light" href="https://github.com/Julzso23/smoothroll/issues/new?assignees=Julzso23&labels=translation+error&template=translation-error.md&title=" target="_blank" rel="noopener noreferrer">
          Translation issue?
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
import 'flag-icon-css/sass/flag-icon.scss'

export default {
  name: 'locale-picker',
  computed: {
    localeList () {
      return this.$store.state.locale.localeList
    },
    locale () {
      return this.$store.state.locale.locale
    }
  },
  mounted () {
    this.$store.dispatch('locale/getLocales')
  },
  methods: {
    setLocale (locale) {
      this.$store.commit('locale/setLocale', locale)
    }
  },
  data: () => ({
    flags: {
      enUS: 'flag-icon-us',
      enGB: 'flag-icon-gb',
      esLA: 'flag-icon-mx',
      esES: 'flag-icon-es',
      ptBR: 'flag-icon-br',
      ptPT: 'flag-icon-pt',
      frFR: 'flag-icon-fr',
      deDE: 'flag-icon-de',
      itIT: 'flag-icon-it',
      ruRU: 'flag-icon-ru'
    }
  })
}
</script>

<style lang="scss" scoped>
  .nav-item > .nav-link {
    padding: 12px;
    border-bottom: solid 2px transparent;
  }
</style>
