<template>
  <div v-if="!loading || recentMedia.length != 0">
    <div v-for="date in recentMedia" :key="date.date" class="date-block px-2 pt-2">
      <h4 class="text-light" :title="date.title">{{date.label}}</h4>

      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4 draggable-card" v-for="media in date.media" :key="media.media_id">
          <media-card :media="media" />
        </div>
      </div>
    </div>
  </div>

  <loading v-else />
</template>

<script>
import Loading from 'modules/shared/Loading'
import MediaCard from 'modules/cards/MediaCard'
import moment from 'moment'

export default {
  name: 'recent-media',
  components: {
    Loading,
    MediaCard
  },
  data: () => ({
    mediaType: 'anime'
  }),
  computed: {
    recentMedia () {
      const dates = []

      for (const media of this.$store.state.media.recentMedia) {
        if (!dates.find(date => date.date === moment(media.available_time).dayOfYear())) {
          const date = {}
          date.date = moment(media.available_time).dayOfYear()
          date.label = moment(media.available_time).calendar()
          date.title = moment(media.available_time).format('LL')
          date.media = []
          dates.push(date)
        }

        dates.find(date => date.date === moment(media.available_time).dayOfYear()).media.push(media)
      }

      return dates
    },
    loading () {
      return this.$store.state.media.recentMediaLoading
    },
    locale () {
      return this.$store.state.locale.locale
    }
  },
  mounted () {
    this.$store.dispatch('media/getRecentMedia', this.mediaType)
  },
  watch: {
    locale () {
      this.$store.dispatch('media/getRecentMedia', this.mediaType)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .date-block {
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }

  .date-block:nth-child(even) {
    background: rgba(255, 255, 255, 0.02)
  }

  .date-block:last-child {
    border-bottom: none;
  }
</style>
