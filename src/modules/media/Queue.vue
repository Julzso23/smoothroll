<template>
  <div v-if="!loading || queue.length != 0">
    <draggable v-model="queue" draggable=".draggable-card" handle=".handle-small" class="row" v-if="compact">
      <div class="col-12 mb-2 draggable-card" v-for="queueItem in queue" :key="queueItem.queue_entry_id">
        <compact-media-card :media="queueItem.most_likely_media">
          <div class="handle-small p-2"><grab-handle :dotsX="2" :dotsY="4" /></div>
        </compact-media-card>
      </div>
    </draggable>

    <draggable v-model="queue" draggable=".draggable-card" handle=".handle" class="row" v-else>
      <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4 draggable-card" v-for="queueItem in queue" :key="queueItem.queue_entry_id">
        <media-card :media="queueItem.most_likely_media">
          <div class="handle"><grab-handle :dotsX="10" :dotsY="2" class="m-auto" /></div>
        </media-card>
      </div>
    </draggable>
  </div>

  <loading v-else />
</template>

<script>
import MediaCard from 'modules/cards/MediaCard'
import CompactMediaCard from 'modules/cards/CompactMediaCard'
import GrabHandle from 'modules/shared/GrabHandle'
import Loading from 'modules/shared/Loading'
import Draggable from 'vuedraggable'

export default {
  name: 'queue',
  components: {
    MediaCard,
    CompactMediaCard,
    GrabHandle,
    Draggable,
    Loading
  },
  mounted () {
    this.$store.dispatch('getQueue', this.mediaType)
  },
  watch: {
    mediaType () {
      this.$store.dispatch('getQueue', this.mediaType)
    },
    locale () {
      this.$store.dispatch('getQueue', this.mediaType)
    }
  },
  computed: {
    queue: {
      get () {
        return this.$store.state.queue.queue
      },
      set (value) {
        this.$store.dispatch('sortQueue', value)
      }
    },
    loading () {
      return this.$store.state.queue.loading
    },
    locale () {
      return this.$store.state.locale.locale
    }
  },
  props: {
    mediaType: String,
    compact: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .handle {
    width: 100%;
    cursor: grab;
    padding: 4px 0;
  }

  .handle-small {
    cursor: grab;
    // padding: 0 4px;
  }
</style>
