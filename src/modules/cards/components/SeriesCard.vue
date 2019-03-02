<template>
  <card>
    <router-link :to="'/series/' + series.series_id" class="text-reset">
      <div class="card-img-top image-container">
        <ribbon v-if="series.in_queue" />
        <img class="card-img-top" :src="series.portrait_image.thumb_url" alt="Series Thumbnail" />
        <p class="text-light description">{{series.description}}</p>
      </div>
    </router-link>

    <div class="mx-2 my-1 text-truncate">
      <span><router-link :to="'/series/' + series.series_id" class="text-reset" :title="series.name">{{series.name}}</router-link></span>
    </div>
  </card>
</template>

<script>
  import Card from './Card';
  import Ribbon from './Ribbon';

  export default {
    name: 'series-card',
    props: {
      series: Object
    },
    components: {
      Card,
      Ribbon
    },
    mounted() {
      this.fixMixedContent();
    },
    methods: {
      fixMixedContent() {
        if (this.series.portrait_image) {
          this.series.portrait_image.thumb_url = this.series.portrait_image.thumb_url.replace('http://', 'https://');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    overflow: hidden;
  }

  .card .description {
    display: none;
  }

  .card:hover .description {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 4px;
    margin: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
  }

  .image-container {
    position: relative;
  }
</style>
