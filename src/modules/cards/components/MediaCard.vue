<template>
  <div class="card bg-dark text-light">
    <img class="card-img-top" :src="media.screenshot_image.large_url" alt="Media Thumbnail" />
    <div class="mx-2 my-1 d-flex flex-column">
      <span class="text-truncate"><router-link :to="'/media/' + media.media_id">{{series.name}}</router-link></span>
      <small>Episode {{media.episode_number}}</small>
      <small class="text-truncate">{{media.name}}</small>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'media-card',
    props: {
      media: Object,
      series: Object
    }
  }
</script>
