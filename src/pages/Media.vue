<template>
  <div v-if="media && media.media_id == mediaId">
    <player :mediaId="media.media_id" :streamData="media.stream_data" :poster="$https(media.screenshot_image.full_url)" :duration="media.duration" :playhead="media.playhead" />

    <div class="content-box">
      <h1 class="text-light title">{{media.name}}</h1>
      <h2 class="text-light sub-title"><router-link :to="'/series/' + media.series_id" class="text-primary">{{media.collection_name}}</router-link> - {{$t('media.episode', {number: media.episode_number})}}</h2>
      <p class="text-light">{{media.description}}</p>

      <toggle-watched-button :mediaId="media.media_id" :playhead="media.playhead" :duration="media.duration" @toggle="onToggleWatched" />
      <toggle-queue-button @toggle="onQueueToggle" :seriesId="media.series_id" :inQueue="media.in_queue" />
    </div>

    <scrolling-collection :collection="collection" :active="media.media_id" />
  </div>
  <loading v-else />
</template>

<script>
import Player from 'modules/media/Player'
import Loading from 'modules/shared/Loading'
import ScrollingCollection from 'modules/media/ScrollingCollection'
import ToggleWatchedButton from 'modules/media/ToggleWatchedButton'
import ToggleQueueButton from 'modules/media/ToggleQueueButton'

export default {
  name: 'media',
  mounted () {
    this.$store.dispatch('media/getMedia', this.mediaId)
  },
  computed: {
    media () {
      return this.$store.state.media.currentMedia
    },
    mediaId () {
      return this.$route.params.id
    },
    collection () {
      return this.$store.state.media.collection
    },
    locale () {
      return this.$store.state.locale.locale
    }
  },
  components: {
    Player,
    Loading,
    ScrollingCollection,
    ToggleWatchedButton,
    ToggleQueueButton
  },
  watch: {
    mediaId () {
      this.$store.dispatch('media/getMedia', this.mediaId)
    },
    media () {
      document.title = `${this.$t('media.episode', { number: this.media.episode_number })}: ${this.media.name} - ${this.media.collection_name} ― Smoothroll`

      this.$store.dispatch('media/getCollection', this.media.collection_id)
    },
    locale () {
      this.$store.dispatch('media/getMedia', this.mediaId)
    }
  },
  methods: {
    onToggleWatched (endLoading) {
      this.$store.dispatch('media/getMedia', this.mediaId)
        .then(() => {
          endLoading()
        })
    },
    onQueueToggle (endLoading) {
      this.$store.dispatch('media/getMedia', this.mediaId)
        .then(() => {
          endLoading()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .content-box {
    background: $dark;
    padding: 1rem;
    box-shadow: 0px 1px 2px black;
  }

  .title {
    font-size: 1.5rem;
  }

  .sub-title {
    font-size: 1.25rem;
  }
</style>
