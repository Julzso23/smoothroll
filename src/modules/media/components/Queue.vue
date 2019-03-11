<template>
  <draggable v-model="queue" draggable=".draggable-card" handle=".handle" class="row" v-if="!loading || queue.length != 0">
    <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4 draggable-card" v-for="queueItem in queue" :key="queueItem.queue_entry_id">
      <media-card :media="queueItem.most_likely_media">
        <div class="handle"><grab-handle :dotsX="10" :dotsY="2" /></div>
      </media-card>
    </div>
  </draggable>

  <loading v-else />
</template>

<script>
import MediaCard from 'modules/cards/components/MediaCard'
import GrabHandle from 'modules/shared/components/GrabHandle'
import Loading from 'modules/shared/components/Loading'
import Draggable from 'vuedraggable'

export default {
  name: 'queue',
  components: {
    MediaCard,
    GrabHandle,
    Draggable,
    Loading
  },
  created () {
    this.$store.dispatch('getQueue')
      .then(() => {
        this.loading = false
      })
  },
  computed: {
    queue: {
      get () {
        return this.$store.state.queue.queue
      },
      set (value) {
        this.$store.dispatch('sortQueue', value)
      }
    }
  },
  data: () => ({
    loading: true
  })
}
</script>

<style lang="scss" scoped>
  .handle {
    width: 100%;
    cursor: grab;
    padding: 4px 0;
  }
</style>
