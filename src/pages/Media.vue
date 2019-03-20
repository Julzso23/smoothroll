<template>
  <div v-if="media && media.media_id == mediaId">
    <player :mediaId="media.media_id" :streamData="media.stream_data" :poster="media.screenshot_image.full_url" :duration="media.duration" :playhead="media.playhead" />

    <h3 class="text-light"><router-link :to="'/series/' + media.series_id" class="text-reset">{{media.collection_name}}</router-link></h3>
    <h4 class="text-light">{{$t('media.episode', {number: media.episode_number}) + ' - ' + media.name}}</h4>
    <p class="text-light">{{media.description}}</p>

    <scrolling-collection :collection="collection" :active="media.media_id" />
  </div>
  <loading v-else />
</template>

<script>
import Player from 'modules/media/Player'
import Loading from 'modules/shared/Loading'
import ScrollingCollection from 'modules/media/ScrollingCollection'

export default {
  name: 'media',
  mounted () {
    this.$store.dispatch('getMedia', this.mediaId)
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
    ScrollingCollection
  },
  watch: {
    mediaId () {
      this.$store.dispatch('getMedia', this.mediaId)
    },
    media () {
      document.title = `${this.$t('media.episode', { number: this.media.episode_number })}: ${this.media.name} - ${this.media.collection_name} ― Smoothroll`

      this.$store.dispatch('getCollection', this.media.collection_id)

      this.fixMixedContent()
    },
    locale () {
      this.$store.dispatch('getMedia', this.mediaId)
    },
    'media.screenshot_image' () {
      this.fixMixedContent()
    }
  },
  methods: {
    fixMixedContent () {
      if (this.media && this.media.screenshot_image) {
        this.media.screenshot_image.full_url = this.media.screenshot_image.full_url.replace('http://', 'https://')
      }
    }
  }
}
</script>
