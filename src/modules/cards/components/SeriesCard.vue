<template>
  <div class="card bg-dark text-light">
    <img class="card-img-top" :src="series.portrait_image.thumb_url" alt="Series Thumbnail" />
    <div class="mx-2 my-1 text-truncate">
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
