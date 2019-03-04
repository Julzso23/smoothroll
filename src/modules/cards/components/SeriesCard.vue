<template>
  <div>
    <card ref="card">
      <router-link :to="'/series/' + series.series_id" class="text-reset">
        <div class="card-img-top image-container">
          <ribbon v-if="series.in_queue" />
          <img class="card-img-top" :src="series.portrait_image.thumb_url" alt="Series Thumbnail" @mouseenter="setPopperVisible(true)" @mouseleave="setPopperVisible(false)" />
        </div>
      </router-link>

      <div class="mx-2 my-1 text-truncate">
        <span><router-link :to="'/series/' + series.series_id" class="text-reset" :title="series.name">{{series.name}}</router-link></span>
      </div>
    </card>

    <card ref="popper" :style="{display: showPopper ? 'block' : 'none', height: popperHeight + 'px'}" class="popper block-truncate">
      {{series.description}}
    </card>
  </div>
</template>

<script>
  import Card from './Card';
  import Ribbon from './Ribbon';
  import Popper from 'popper.js';

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
      this.popper = new Popper(this.$refs.card.$el, this.$refs.popper.$el, {placement: 'right-start'});
    },
    methods: {
      fixMixedContent() {
        if (this.series.portrait_image) {
          this.series.portrait_image.thumb_url = this.series.portrait_image.thumb_url.replace('http://', 'https://');
        }
      },
      setPopperVisible(visible) {
        this.showPopper = visible;
        this.popperHeight = this.$refs.card.$el.offsetHeight;
        this.popper.scheduleUpdate();
      }
    },
    data: () => ({
      popper: null,
      showPopper: false,
      popperHeight: 0
    })
  }
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

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

  .popper {
    z-index: 9999;
    padding: 6px;
    margin-left: 10px;
  }

  .block-truncate:after {
    background: linear-gradient(to right, rgba($dark, 0.5), $dark 50%);
    height: 1.5rem;
    width: 70%;
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
    padding-right: 1rem;
    background-attachment: local local scroll scroll;
  }
</style>
