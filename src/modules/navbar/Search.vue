<template>
  <div class="form-inline dropdown mr-4">
    <typeahead v-model="query" :data="results" :serializer="result => result.name" :placeholder="$t('navbar.search')" @hit="hit" inputClass="bg-dark text-light" text-variant="light" backgroundVariant="dark" />
  </div>
</template>

<script>
import debounce from 'debounce'
import Typeahead from 'vue-bootstrap-typeahead'

export default {
  name: 'search',
  data: () => ({
    query: ''
  }),
  watch: {
    query (query) {
      this.search(query)
    }
  },
  methods: {
    search: debounce(function (query) {
      if (query !== '') {
        this.$store.dispatch('media/search', query)
      }
    }, 300),
    hit (result) {
      this.$router.push(`/series/${result.series_id}`)
    }
  },
  computed: {
    results () {
      return this.$store.state.media.searchResults
    }
  },
  components: {
    Typeahead
  }
}
</script>
