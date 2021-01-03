<template>
  <div class="player embed-responsive embed-responsive-16by9" v-if="!broke">
    <div id="player" class="embed-responsive-item"></div>
  </div>
  <div v-else class='d-flex justify-content-center align-items-center error-box'>
    <!-- <div class='self-align-center '> -->
      <fa-icon icon="exclamation-triangle" class='text-primary' />
    <!-- </div> -->
  </div>
</template>

<script>
import Clappr from 'clappr'
import LevelSelector from 'level-selector'
import PlaybackRatePlugin from 'clappr-playback-rate-plugin'

export default {
  name: 'player',
  data: () => ({
    player: null,
    broke: false,
    hasBeenPlayed: false,
    loggingTime: false,
    lastTimeUpdate: 0,
    timeLogRate: 10 // Log the current time once every x seconds
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

    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy () {
    if (this.player.isPlaying()) {
      this.logTime(this.player.getCurrentTime())
    }
  },
  methods: {
    createPlayer () {
      if (this.streamData.streams.length === 0) {
        this.broke = true

        return
      }

      this.broke = false

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
        },
        events: {
          onEnded: () => this.logTime(this.player.getDuration()),
          onPause: () => this.logTime(this.player.getCurrentTime()),
          onSeek: time => this.logTime(time),
          onPlay: this.onPlay,
          onTimeUpdate: this.onTimeUpdate
        }
      })
    },

    logTime (time) {
      if (time !== 0 && time <= this.player.getDuration() && !this.loggingTime) {
        this.loggingTime = true
        this.$store.dispatch('media/logTime', {
          mediaId: this.mediaId,
          time: Math.floor(time)
        }).then(() => {
          this.loggingTime = false
        })
      }
    },

    onPlay () {
      if (!this.hasBeenPlayed) {
        this.hasBeenPlayed = true

        if (this.playhead < this.player.getDuration() * 0.99) {
          this.player.seek(this.playhead)
        }
      }
    },

    onTimeUpdate (progress) {
      const roundedTime = progress.current - progress.current % this.timeLogRate
      if (roundedTime !== this.lastTimeUpdate) {
        this.lastTimeUpdate = roundedTime
        this.logTime(roundedTime)
      }
    },

    onKeyDown (event) {
      if (this.player !== null && !event.repeat) {
        const playerFocused = document.getElementById('player').contains(document.activeElement)

        switch (event.code) {
          case 'Space':
            if (playerFocused) break
          case 'KeyK':
          {
            if (this.player.isPlaying()) {
              this.player.pause()
            } else {
              this.player.play()
            }

            event.preventDefault()
            break
          }
          case 'KeyF':
          {
            this.player.core.mediaControl.toggleFullscreen()
            event.preventDefault()
            break
          }
          case 'ArrowLeft':
            if (playerFocused) break
          case 'KeyJ':
          {
            let newTime = this.player.getCurrentTime() - 5
            if (newTime < 0) {
              newTime = 0
            }
            this.player.seek(newTime)

            event.preventDefault()
            break
          }
          case 'ArrowRight':
            if (playerFocused) break
          case 'KeyL':
          {
            let newTime = this.player.getCurrentTime() + 5
            if (newTime > this.player.getDuration()) {
              newTime = this.player.getDuration()
            }
            this.player.seek(newTime)

            event.preventDefault()
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .player {
    box-shadow: 0 1px 4px black;
  }

  .error-box {
    height: 15rem;
  }

  .error-box > svg {
    font-size: 10rem;
  }
</style>
