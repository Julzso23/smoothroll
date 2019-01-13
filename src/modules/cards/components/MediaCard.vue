<template>
  <div class="card bg-dark text-light">
    <img class="card-img-top" :src="media.screenshot_image.large_url" alt="Media Thumbnail" />
    <div class="mx-2 my-1 d-flex flex-column">
      <span class="truncate">{{series.name}}</span>
      <small>Episode {{media.episode_number}}</small>
      <small class="truncate">{{media.name}}</small>
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

<style lang="scss" scoped>
  .truncate {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
