<template>
  <span>
    <button class="btn btn-primary btn-sm" @click="toggle">{{watched ? $t('media.markUnwatched') : $t('media.markWatched')}}</button>
    <loading-modal id="loadingModal" :completion="completion" :currentEpisode="currentEpisode" />
  </span>
</template>

<script>
import LoadingModal from 'modules/media/SeriesWatchedLoadingModal'
import $ from 'jquery'

export default {
  name: 'toggle-series-watched-button',
  props: {
    mediaList: Array
  },
  computed: {
    watched () {
      for (let media of this.mediaList) {
        if (!this.hasWatched(media)) {
          return false
        }
      }
      return true
    },
    completion () {
      return ((this.index + 1) / this.mediaList.length) * 100
    },
    currentEpisode () {
      if (this.index === -1 || this.index >= this.mediaList.length) return ''

      const media = this.mediaList[this.index]
      return `${this.$t('media.episode', { number: media.episode_number })}: ${media.name} - ${media.collection_name}`
    }
  },
  components: {
    LoadingModal
  },
  methods: {
    toggle () {
      $('#loadingModal').modal({
        keyboard: false,
        backdrop: true
      })

      this.index = -1
      this.mark(!this.watched)
    },
    hasWatched (media) {
      return media.playhead >= media.duration
    },
    mark (watched) {
      this.index++

      if (this.index >= this.mediaList.length) {
        $('#loadingModal').modal('hide')
        this.$emit('complete')
        this.index = -1
        return
      }

      if (this.hasWatched(this.mediaList[this.index]) === watched) {
        this.mark(watched)
        return
      }

      this.$store.dispatch('media/setWatched', {
        mediaId: this.mediaList[this.index].media_id,
        watched,
        duration: this.mediaList[this.index].duration
      })
        .then(() => {
          this.mark(watched)
        })
    }
  },
  data: () => ({
    index: -1
  })
}
</script>
