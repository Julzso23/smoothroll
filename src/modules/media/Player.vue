<template>
  <div class="player embed-responsive embed-responsive-16by9 mb-3">
    <div id="player" class="embed-responsive-item"></div>
  </div>
</template>

<script>
import Clappr from 'clappr'
import LevelSelector from 'level-selector'
import PlaybackRatePlugin from 'clappr-playback-rate-plugin'

export default {
  name: 'player',
  data: () => ({
    player: null
  }),
  props: {
    mediaId: String,
    streamData: Object,
    poster: String,
    duration: Number,
    playhead: Number
  },
  watch: {
    streamData (value) {
      this.createPlayer()
    }
  },
  mounted () {
    this.createPlayer()
  },
  beforeDestroy () {
    if (this.player.isPlaying()) {
      this.logTime(this.player.getCurrentTime())
    }
  },
  methods: {
    createPlayer () {
      this.player = new Clappr.Player({
        source: this.streamData.streams[0].url,
        poster: this.poster,
        parentId: '#player',
        plugins: {
          core: [Clappr.MediaControl, LevelSelector, PlaybackRatePlugin]
        },
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
        },
        playbackRateConfig: {
          defaultValue: '1.0',
          options: [
            { value: '0.25', label: '0.25x' },
            { value: '0.5', label: '0.5x' },
            { value: '1.0', label: '1x' },
            { value: '1.5', label: '1.5x' },
            { value: '2.0', label: '2x' }
          ]
        }
      })

      if (this.playhead !== this.duration) {
        this.player.seek(this.playhead)
      }

      this.player.on(Clappr.Events.PLAYER_ENDED, () => this.logTime(this.duration))
      this.player.on(Clappr.Events.PLAYER_PAUSE, () => this.logTime(this.player.getCurrentTime()))
    },

    logTime (time) {
      if (time !== 0 && time <= this.duration) {
        this.$store.dispatch('media/logTime', {
          mediaId: this.mediaId,
          time: time
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .player {
    box-shadow: 0 1px 4px black;
  }
</style>
