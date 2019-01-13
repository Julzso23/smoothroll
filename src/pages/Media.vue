<template>
  <div>
    <h3 class="text-light">{{media.series_name}}</h3>
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
