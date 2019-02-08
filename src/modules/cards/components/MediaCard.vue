<template>
  <card>
    <router-link :to="'/media/' + media.media_id" class="text-reset embed-responsive embed-responsive-16by9">
      <img class="card-img-top embed-responsive-item image" :src="media.screenshot_image.large_url" alt="Media Thumbnail" />
    </router-link>

    <progress-bar :value="(media.playhead / media.duration) * 100" />

    <div class="mx-2 my-1 d-flex flex-column">
      <span class="text-truncate"><router-link :to="'/series/' + media.series_id" class="text-reset">{{media.series_name}}</router-link></span>
      <small>Episode {{media.episode_number}}</small>
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
      media: Object
    },
    components: {
      ProgressBar,
      Card
    }
  }
</script>

<style lang="scss" scoped>
  .image {
    object-fit: cover;
  }
</style>
