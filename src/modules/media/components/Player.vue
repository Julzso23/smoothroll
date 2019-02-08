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
      mediaId: String,
      streamData: Object,
      poster: String,
      duration: Number,
      playhead: Number
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

        if (this.playhead == this.duration) {
          this.player.seek(this.playhead);
        }

        this.player.on(Clappr.Events.PLAYER_ENDED, () => this.logTime(this.duration));
        this.player.on(Clappr.Events.PLAYER_PAUSE, () => this.logTime(this.player.getCurrentTime()));
        this.player.on(Clappr.Events.PLAYER_SEEK, () => this.logTime(this.player.getCurrentTime()));
      },

      logTime(time) {
        this.$store.dispatch('logTime', {
          mediaId: this.mediaId,
          time: time
        });
      }
    }
  }
</script>
