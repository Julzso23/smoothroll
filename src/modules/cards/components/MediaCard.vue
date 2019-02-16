<template>
  <card :class="active ? 'active-card' : ''">
    <router-link :to="'/media/' + media.media_id" class="text-reset embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item image" v-if="media.screenshot_image" :src="media.screenshot_image.large_url" alt="Media Thumbnail" />
      <div class="play"></div>
    </router-link>

    <progress-bar :value="(media.playhead / media.duration) * 100" />

    <div class="mx-2 my-1 d-flex flex-column">
      <span class="text-truncate"><router-link :to="'/series/' + media.series_id" class="text-reset" :title="media.collection_name">{{media.collection_name}}</router-link></span>
      <small><router-link :to="'/media/' + media.media_id" class="text-reset">{{$t('media.episode', {number: media.episode_number})}}</router-link></small>
      <small class="text-truncate"><router-link :to="'/media/' + media.media_id" class="text-reset">{{media.name}}</router-link></small>
    </div>

    <slot></slot>
  </card>
</template>

<script>
  import ProgressBar from 'modules/shared/components/ProgressBar';
  import Card from './Card';

  export default {
    name: 'media-card',
    props: {
      media: Object,
      active: Boolean
    },
    components: {
      ProgressBar,
      Card
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
</style>
