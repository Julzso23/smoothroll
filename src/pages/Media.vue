<template>
  <div>
    <h3 class="text-light"><router-link :to="'/series/' + media.series_id" class="text-reset">{{media.series_name}}</router-link></h3>
    <h4 class="text-light">{{'Episode ' + media.episode_number + ' - ' + media.name}}</h4>
  </div>
</template>

<script>
  export default {
    name: 'media',
    created() {
      this.$store.dispatch('getMedia', this.$route.params.id);
    },
    computed: {
      media() {
        return this.$store.state.media.currentMedia || {};
      }
    }
  }
</script>
