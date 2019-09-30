<template>
  <button class="btn btn-primary btn-sm" @click="toggleWatched" v-if="!loading">{{watched ? $t('media.markUnwatched') : $t('media.markWatched')}}</button>
  <button class="btn btn-disabled btn-sm" v-else><loading /></button>
</template>

<script>
import Loading from 'modules/shared/Loading'
export default {
  name: 'toogle-watched-button',
  components: {
    Loading
  },
  props: {
    mediaId: String,
    playhead: Number,
    duration: Number
  },
  computed: {
    watched () {
      return this.playhead >= this.duration * 0.9
    }
  },
  methods: {
    toggleWatched () {
      this.loading = true
      this.$store.dispatch('media/setWatched', { mediaId: this.mediaId, watched: !this.watched, duration: this.duration })
        .then(() => {
          this.$emit('toggle', this.endLoading)
        })
    },
    endLoading () {
      this.loading = false
    }
  },
  data: () => ({
    loading: false
  })
}
</script>
