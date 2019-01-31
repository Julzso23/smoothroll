<template>
  <div>
    <div class="embed-responsive embed-responsive-16by9 mb-3">
      <div id="player" class="embed-responsive-item"></div>
    </div>

    <h3 class="text-light"><router-link :to="'/series/' + media.series_id" class="text-reset">{{media.series_name}}</router-link></h3>
    <h4 class="text-light">{{'Episode ' + media.episode_number + ' - ' + media.name}}</h4>
  </div>
</template>

<script>
  import Clappr from 'clappr';
  import LevelSelector from 'level-selector';

  export default {
    name: 'media',
    created() {
      this.$store.dispatch('getMedia', this.$route.params.id);
    },
    computed: {
      media() {
        return this.$store.state.media.currentMedia || {};
      }
    },
    watch: {
      media: function(value) {
        let player = new Clappr.Player({
          source: this.media.stream_data.streams[0].url,
          parentId: '#player',
          plugins: [LevelSelector],
          width: '100%',
          height: '100%',
          levelSelectorConfig: {
            title: 'Quality',
            labels: {
              4: '1080p',
              3: '720p',
              2: '480p',
              1: '360p',
              0: '240p'
            }
          }
        });
      }
    }
  }
</script>
