<template>
  <div class="card bg-dark text-light">
    <img class="card-img-top" :src="series.portrait_image.thumb_url" alt="Series Thumbnail" />
    <div class="mx-2 my-1 truncate">
      <span>{{series.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'series-card',
    props: {
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
