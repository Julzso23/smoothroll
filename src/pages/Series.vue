<template>
  <div>
    <h3 class="text-light">{{series.name}}</h3>
    <p class="text-light">{{series.description}}</p>
  </div>
</template>

<script>
  export default {
    name: 'series',
    created() {
      this.$store.dispatch('getSeries', this.$route.params.id);
    },
    computed: {
      series() {
        return this.$store.state.media.currentSeries || {};
      }
    }
  }
</script>
