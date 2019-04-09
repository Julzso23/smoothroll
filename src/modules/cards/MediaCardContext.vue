<template>
  <div class="list-group position-absolute text-nowrap" :style="{left: position.x + 'px', top: position.y + 'px'}" v-if="value" v-click-outside="close">
    <a class="list-group-item list-group-item-action" href="#" @click.prevent.stop="toggleWatched" v-if="watched">{{$t('media.markUnwatched')}}</a>
    <a class="list-group-item list-group-item-action" href="#" @click.prevent.stop="toggleWatched" v-else>{{$t('media.markWatched')}}</a>
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
    watched: Boolean,
    duration: Number
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    async toggleWatched () {
      this.close()
      this.$emit('beginUpdate')
      await this.$store.dispatch('setWatched', { mediaId: this.mediaId, watched: !this.watched, duration: this.duration })
      let media = await this.$store.dispatch('getUpdatedMedia', this.mediaId)
      this.$emit('updated', media)
    }
  }
}
</script>
