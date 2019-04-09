<template>
  <div class="list-group position-absolute text-nowrap" :style="{left: position.x + 'px', top: position.y + 'px'}" v-if="value" v-click-outside="close">
    <a class="list-group-item list-group-item-action bg-dark text-light" href="#" @click.prevent.stop="toggleWatched" v-if="inQueue">{{$t('media.queueRemove')}}</a>
    <a class="list-group-item list-group-item-action bg-dark text-light" href="#" @click.prevent.stop="toggleWatched" v-else>{{$t('media.queueAdd')}}</a>
  </div>
</template>

<script>
import Vue from 'vue'
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)

export default {
  name: 'series-card-context',
  props: {
    value: Boolean,
    position: {
      x: Number,
      y: Number
    },
    seriesId: String,
    inQueue: Boolean
  },
  methods: {
    close () {
      this.$emit('input', false)
    },
    async toggleWatched () {
      this.close()
      this.$emit('beginUpdate')
      await this.$store.dispatch('media/toggleQueue', { seriesId: this.seriesId, inQueue: this.inQueue })
      await this.$store.dispatch('media/updateSeries', this.seriesId)
      this.$emit('updated')
    }
  }
}
</script>
