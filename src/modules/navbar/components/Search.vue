<template>
  <div>
    <form class="form-inline dropdown mr-4" @submit.prevent>
      <input
        class="form-control bg-dark text-light"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="query"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
        />

      <div class="dropdown-menu" :class="{show: (results.length != 0) && hasFocus}">
        <a class="dropdown-item text-truncate" href="#" v-for="result in results" :key="result.series_id">{{result.name}}</a>
      </div>
    </form>
  </div>
</template>

<script>
  import debounce from 'debounce';

  export default {
    name: 'search',
    data: () => ({
      query: '',
      hasFocus: false
    }),
    watch: {
      query(query) {
        this.search(query);
      }
    },
    methods: {
      search: debounce(function(query) {
        if (query != '') {
          this.$store.dispatch('search', query);
        }
      }, 300)
    },
    computed: {
      results() {
        return this.$store.state.media.searchResults;
      }
    }
  }
</script>
