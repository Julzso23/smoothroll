<template>
  <div>
    <card ref="card" @contextmenu.native.prevent.stop="contextMenu" v-if="!loading">
      <router-link :to="'/series/' + series.series_id" class="text-reset">
        <div class="card-img-top image-container">
          <ribbon v-if="series.in_queue" />
          <img class="card-img-top" :src="$https(series.portrait_image.thumb_url)" alt="Series Thumbnail" @mouseenter="setPopperVisible(true)" @mouseleave="setPopperVisible(false)" />
        </div>
      </router-link>

      <div class="mx-2 my-1 text-truncate">
        <router-link :to="'/series/' + series.series_id" class="text-reset" :title="series.name">{{series.name}}</router-link>
      </div>
    </card>

    <card v-else :style="{height: cardHeight + 'px'}">
      <loading class="my-auto" />
    </card>

    <card ref="popper" :style="{display: showPopper ? 'block' : 'none', height: popperHeight + 'px'}" class="popper block-truncate">
      {{series.description}}
    </card>

    <series-card-context v-model="showContextMenu" :position="contextMenuPosition" :inQueue="series.in_queue"
                         :seriesId="series.series_id" @beginUpdate="seriesBeginUpdate" @updated="seriesUpdated" />
  </div>
</template>

<script>
import Card from './Card'
import Ribbon from './Ribbon'
import Popper from 'popper.js'
import Loading from 'modules/shared/Loading'
import SeriesCardContext from './SeriesCardContext'
import EventBus from 'event-bus'

export default {
  name: 'series-card',
  props: {
    series: Object
  },
  components: {
    Card,
    Ribbon,
    Loading,
    SeriesCardContext
  },
  mounted () {
    this.popper = new Popper(this.$refs.card.$el, this.$refs.popper.$el, { placement: 'right-start' })
  },
  created () {
    EventBus.$on('closeContextMenus', () => {
      this.showContextMenu = false
    })
  },
  methods: {
    setPopperVisible (visible) {
      this.showPopper = visible
      this.popperHeight = this.$refs.card.$el.offsetHeight
      this.popper.scheduleUpdate()
    },
    contextMenu (event) {
      EventBus.$emit('closeContextMenus')

      this.showContextMenu = true
      this.contextMenuPosition.x = event.clientX - this.$refs.card.$el.getBoundingClientRect().left
      this.contextMenuPosition.y = event.clientY - this.$refs.card.$el.getBoundingClientRect().top
    },
    seriesUpdated () {
      this.loading = false
    },
    seriesBeginUpdate () {
      this.cardHeight = this.$refs.card.$el.getBoundingClientRect().height
      this.loading = true
    }
  },
  data: () => ({
    popper: null,
    showPopper: false,
    popperHeight: 0,
    loading: false,
    cardHeight: 0,
    showContextMenu: false,
    contextMenuPosition: {
      x: 0,
      y: 0
    }
  })
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .card {
    overflow: hidden;
  }

  .image-container {
    position: relative;
  }

  .popper {
    z-index: 9999;
    padding: 6px;
    margin-left: 10px;
  }

  .block-truncate:after {
    background: linear-gradient(to right, rgba($dark, 0.5), $dark 50%);
    height: 1.5rem;
    width: 70%;
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
    padding-right: 1rem;
    background-attachment: local local scroll scroll;
  }
</style>
