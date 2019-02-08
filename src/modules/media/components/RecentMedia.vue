<template>
  <div v-if="recentMedia.length != 0">
    <h4 class="text-light" v-for="date in recentMedia" :key="date.date">{{date.date}}</h4>
  </div>

  <loading v-else />
</template>

<script>
  import Loading from 'modules/shared/components/Loading';
  import MediaCard from 'modules/cards/components/MediaCard';

  export default {
    name: 'recent-media',
    components: {
      Loading
    },
    data: () => ({
      mediaType: 'anime'
    }),
    computed: {
      recentMedia() {
        let dates = [];

        for (let media of this.$store.state.media.recentMedia) {
          if (!dates.find(time => time.time == this.timeToDate(media.available_time))) {
            let date = {};
            date.date = this.timeToDate(media.available_time);
            date.media = [];
            dates.push(date);
          }

          dates.find(date => date.date == this.timeToDate(media.available_time)).media.push(media);
        }

        return dates;
      }
    },
    created() {
      this.$store.dispatch('getRecentMedia', this.mediaType);
    },
    methods: {
      timeToDate(time) {
        const date = new Date(time);
        const options = {
          day: '2-digit',
          month: 'long'
        }
        return date.toLocaleDateString(navigator.language, options);
      }
    }
  }
</script>
