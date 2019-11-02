<template>
  <div>
    <card :class="{'active-card' : active}" @contextmenu.native.prevent.stop="contextMenu" ref="card" v-if="!loading">
      <router-link :to="'/media/' + media.media_id" class="text-reset embed-responsive embed-responsive-16by9">
        <img class="card-img-top embed-responsive-item image" v-if="media.screenshot_image" :src="$https(media.screenshot_image.large_url)" alt="Media Thumbnail" />
        <div class="play"></div>
        <div class="watched-grey" v-if="watched"></div>
        <fa-icon icon="eye" v-if="watched" class="watched" />
        <span class="badge badge-secondary length">{{ media.playhead > 0 && !watched ? watchedTime + ' / ' : ''}}{{length}}</span>
      </router-link>

      <progress-bar :value="(media.playhead / media.duration) * 100" />

      <div class="mx-2 my-1 d-flex flex-column">
        <span class="text-truncate">
          <router-link :to="'/series/' + media.series_id" class="text-reset" :title="media.collection_name">
            {{media.collection_name}}
          </router-link>
        </span>

        <small class="text-truncate">
          <router-link :to="'/media/' + media.media_id" class="text-reset" :title="$t('media.episode', {number: media.episode_number}) + ' ― ' + media.name">
            {{$t('media.episode', {number: media.episode_number})}} ― {{media.name}}
          </router-link>
        </small>
      </div>

      <slot></slot>
    </card>

    <card v-else :class="{'active-card' : active}" :style="{height: cardHeight + 'px'}">
      <loading class="my-auto" />
    </card>

    <media-card-context v-model="showContextMenu" :position="contextMenuPosition" :watched="watched"
                        :mediaId="media.media_id" :seriesId="media.series_id" :duration="media.duration"
                        @beginUpdate="mediaBeginUpdate" @updated="mediaUpdated" />
  </div>
</template>

<script>
import ProgressBar from 'modules/shared/ProgressBar'
import Card from './Card'
import MediaCardContext from './MediaCardContext'
import Loading from 'modules/shared/Loading'
import EventBus from 'eventBus'

export default {
  name: 'media-card',
  props: {
    media: Object,
    active: Boolean
  },
  data: () => ({
    showContextMenu: false,
    contextMenuPosition: {
      x: 0,
      y: 0
    },
    loading: false,
    cardHeight: 0
  }),
  components: {
    ProgressBar,
    Card,
    MediaCardContext,
    Loading
  },
  created () {
    EventBus.$on('closeContextMenus', () => {
      this.showContextMenu = false
    })
  },
  methods: {
    contextMenu (event) {
      EventBus.$emit('closeContextMenus')

      this.showContextMenu = true
      this.contextMenuPosition.x = event.clientX - this.$refs.card.$el.getBoundingClientRect().left
      this.contextMenuPosition.y = event.clientY - this.$refs.card.$el.getBoundingClientRect().top
    },
    mediaUpdated () {
      this.loading = false
    },
    mediaBeginUpdate () {
      this.cardHeight = this.$refs.card.$el.getBoundingClientRect().height
      this.loading = true
    }
  },
  computed: {
    length () {
      return new Date(this.media.duration * 1000).toISOString().substr(11, 8).replace(/^(00:)?0?/, '')
    },
    watchedTime () {
      return new Date(this.media.playhead * 1000).toISOString().substr(11, 8).replace(/^(00:)?0?/, '')
    },
    watched () {
      return this.media.playhead >= this.media.duration * 0.9
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .image {
    object-fit: cover;
  }

  $play-size: 48px;

  .card:hover .play, .active-card .play {
    box-sizing: border-box;
    width: 0;
    height: 0;
    position: absolute;
    border-style: solid;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-width: ($play-size / 2) 0 ($play-size / 2) $play-size * 0.866;
    border-color: transparent transparent transparent $light;
  }

  .active-card {
    border-bottom: solid 2px $primary;
  }

  .length {
    position: absolute;
    bottom: 2px;
    right: 2px;
  }

  .watched {
    position: absolute;
    left: 4px;
    bottom: 4px;
  }

  .card {
    overflow: hidden;
  }

  .watched-grey {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(100, 100, 100, 0.5);
  }
</style>
