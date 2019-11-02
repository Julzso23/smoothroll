<template>
  <div class="list-group position-absolute text-nowrap" :style="{left: position.x + 'px', top: position.y + 'px'}" v-if="value" v-click-outside="close">
    <a class="list-group-item list-group-item-action bg-dark text-light" href="#" @click.prevent.stop="toggleWatched">
      {{watched ? $t('media.markUnwatched') : $t('media.markWatched')}}
    </a>
    <a class="list-group-item list-group-item-action bg-dark text-light" href="#" @click.prevent.stop="toggleQueue">
      {{inQueue ? $t('media.queueRemove') : $t('media.queueAdd')}}
    </a>
  </div>
</template>

<script>
import Vue from 'vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

export default {
  name: 'media-card-context',
  props: {
    value: Boolean,
    position: {
      x: Number,
      y: Number
    },
    mediaId: String,
    seriesId: String,
    watched: Boolean,
    duration: Number
  },
  computed: {
    inQueue () {
      return this.$store.state.queue.queue.find(element => element.series_id === this.series_id)
    }
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    async toggleWatched () {
      this.close()
      this.$emit('beginUpdate')
      await this.$store.dispatch('media/setWatched', { mediaId: this.mediaId, watched: !this.watched, duration: this.duration })
      await this.$store.dispatch('media/updateMedia', this.mediaId)
      this.$emit('updated')
    },
    async toggleQueue () {
      this.close()
      this.$emit('beginUpdate')
      await this.$store.dispatch('media/toggleQueue', { seriesId: this.seriesId, inQueue: this.inQueue })
      await this.$store.dispatch('media/updateSeries', this.seriesId)
      await this.$store.dispatch('queue/getQueue')
      this.$emit('updated')
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-group-item {
    z-index: 1;
  }
</style>
