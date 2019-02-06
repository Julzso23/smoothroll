<template>
  <div class="embed-responsive embed-responsive-16by9 mb-3">
    <div id="player" class="embed-responsive-item"></div>
  </div>
</template>

<script>
  import Clappr from 'clappr';
  import LevelSelector from 'level-selector';

  export default {
    name: 'player',
    data: () => ({
      player : null
    }),
    props: {
      streamData: Object,
      poster: String
    },
    watch: {
      streamData(value) {
        this.createPlayer();
      }
    },
    mounted() {
      this.createPlayer();
    },
    methods: {
      createPlayer() {
        this.player = new Clappr.Player({
          source: this.streamData.streams[0].url,
          poster: this.poster,
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
