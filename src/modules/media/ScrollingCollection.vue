<template>
  <div class="collection row mb-2" @mousewheel.prevent="onScroll" ref="container">
    <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2" v-for="mediaItem in collection" :key="mediaItem.media_id">
      <media-card :media="mediaItem" :active="mediaItem.media_id == active" ref="media" />
    </div>
  </div>
</template>

<script>
import MediaCard from 'modules/cards/MediaCard'

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
    collection () {
      this.$nextTick(function () {
        for (const card of this.$refs.media) {
          if (card.$props.active) {
            this.$el.scrollLeft = card.$el.getBoundingClientRect().left - this.$el.getBoundingClientRect().left
            break
          }
        }
      })
    }
  },
  methods: {
    onScroll (e) {
      this.$refs.container.scrollLeft -= e.wheelDelta
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .collection {
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding: 1rem;
    position: relative;
  }

  div::-webkit-scrollbar {
    height: 12px;
  }
  div::-webkit-scrollbar-thumb {
    background-color: $dark - 10%;
    border-radius: 4px;
  }
  div::-webkit-scrollbar-thumb:hover {
    background-color: $secondary;
  }
</style>
