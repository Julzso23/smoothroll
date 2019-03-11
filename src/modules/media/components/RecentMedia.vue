<template>
  <div v-if="recentMedia.length != 0">
    <div v-for="date in recentMedia" :key="date.date">
      <h4 class="text-light">{{date.date}}</h4>

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
import Loading from 'modules/shared/components/Loading'
import MediaCard from 'modules/cards/components/MediaCard'

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
      let dates = []

      for (let media of this.$store.state.media.recentMedia) {
        if (!dates.find(date => date.date === this.timeToDate(media.available_time))) {
          let date = {}
          date.date = this.timeToDate(media.available_time)
          date.media = []
          dates.push(date)
        }

        dates.find(date => date.date === this.timeToDate(media.available_time)).media.push(media)
      }

      return dates
    }
  },
  created () {
    this.$store.dispatch('getRecentMedia', this.mediaType)
  },
  methods: {
    timeToDate (time) {
      const date = new Date(time)
      const options = {
        day: '2-digit',
        month: 'long'
      }
      return date.toLocaleDateString(navigator.language, options)
    }
  }
}
</script>
