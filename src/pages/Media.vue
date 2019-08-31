<template>
  <div v-if="media">
    <player v-if="media.media_id === mediaId" :mediaId="media.media_id" :streamData="media.stream_data" :poster="$https(media.screenshot_image.full_url)" :duration="media.duration" :playhead="media.playhead" />
    <div v-else class="player embed-responsive embed-responsive-16by9">
      <div class="embed-responsive-item d-flex"><loading class="align-self-center" /></div>
    </div>

    <div class="content-box" v-if="media.media_id === mediaId">
      <div class="clearfix">
        <router-link v-if="lastMedia" :to="'/media/' + lastMedia.media_id" class="btn btn-primary mb-2"><fa-icon icon="chevron-left" /> {{$t('media.episode', {number: lastMedia.episode_number})}}</router-link>
        <span v-else class="btn btn-disabled mb-2"><fa-icon icon="chevron-left" /></span>
        <router-link v-if="nextMedia" :to="'/media/' + nextMedia.media_id" class="btn btn-primary float-right mb-2">{{$t('media.episode', {number: nextMedia.episode_number})}} <fa-icon icon="chevron-right" /></router-link>
        <span v-else class="btn btn-disabled float-right mb-2"><fa-icon icon="chevron-right" /></span>
      </div>

      <h1 class="text-light title">{{media.name}}</h1>
      <h2 class="text-light sub-title"><router-link :to="'/series/' + media.series_id" class="text-primary">{{media.collection_name}}</router-link> - {{$t('media.episode', {number: media.episode_number})}}</h2>
      <p class="text-light">{{media.description}}</p>

      <toggle-watched-button :mediaId="media.media_id" :playhead="media.playhead" :duration="media.duration" @toggle="onToggleWatched" />
      <toggle-queue-button @toggle="onQueueToggle" :seriesId="media.series_id" :inQueue="media.in_queue" />
    </div>
    <div class="content-box" v-else>
      <div class="clearfix">
        <span class="btn btn-disabled mb-2"><fa-icon icon="chevron-left" /></span>
        <span class="btn btn-disabled float-right mb-2"><fa-icon icon="chevron-right" /></span>
      </div>

      <loading />
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
    },
    lastMedia () {
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i].media_id === this.mediaId && i - 1 >= 0) {
          return this.collection[i - 1]
        }
      }
      return null
    },
    nextMedia () {
      for (let i = 0; i < this.collection.length; i++) {
        if (this.collection[i].media_id === this.mediaId && i + 1 < this.collection.length) {
          return this.collection[i + 1]
        }
      }
      return null
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
    border-radius: 0 0 0.2rem 0.2rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .sub-title {
    font-size: 1.25rem;
  }
</style>
