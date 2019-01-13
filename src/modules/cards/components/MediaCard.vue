<template>
  <div class="card bg-dark text-light">
    <router-link :to="'/media/' + media.media_id" class="text-reset"><img class="card-img-top" :src="media.screenshot_image.large_url" alt="Media Thumbnail" /></router-link>
    <progress-bar :value="(media.playhead / media.duration) * 100" />
    <div class="mx-2 my-1 d-flex flex-column">
      <span class="text-truncate">{{media.series_name}}</span>
      <small>Episode {{media.episode_number}}</small>
      <small class="text-truncate"><router-link :to="'/media/' + media.media_id" class="text-reset">{{media.name}}</router-link></small>
    </div>
  </div>
</template>

<script>
  import ProgressBar from 'modules/shared/components/ProgressBar';

  export default {
    name: 'media-card',
    props: {
      media: Object
    },
    components: {
      ProgressBar
    }
  }
</script>
