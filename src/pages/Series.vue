<template>
  <div>
    <div class="row">
      <div class="col-9">
        <h3 class="text-light">{{series.name}}</h3>
        <p class="text-light">{{series.description}}</p>
      </div>

      <div class="col-3">
        <img class="img-fluid mx-auto d-block" v-if="series.portrait_image" :src="series.portrait_image.large_url" />
      </div>
    </div>
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
