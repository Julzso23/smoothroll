<template>
  <div class="collection row mb-2">
    <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2" v-for="mediaItem in collection" :key="mediaItem.media_id">
      <media-card :media="mediaItem" :active="mediaItem.media_id == active" ref="media" />
    </div>
  </div>
</template>

<script>
  import MediaCard from 'modules/cards/components/MediaCard';
  import $ from 'jquery';

  export default {
    name: 'scrolling-collection',
    components: {
      MediaCard
    },
    props: {
      collection: Array,
      active: String
    },
    watch: {
      collection() {
        this.$nextTick(function() {
          for (let card of this.$refs.media) {
            if (card.$props.active) {
              this.$el.scrollLeft = card.$el.getBoundingClientRect().left - this.$el.getBoundingClientRect().left;
              break;
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .collection {
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding: 1rem;
    position: relative;
  }
</style>
