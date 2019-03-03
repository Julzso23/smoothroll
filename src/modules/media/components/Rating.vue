<template>
  <span :class="'rating rating-' + rating">★★★★★</span>
</template>

<script>
  export default {
    name: 'rating',
    props: {
      rating: Number
    }
  }
</script>

<style lang="scss" scoped>
  .rating {
    position: relative;
    display: inline-block;
    color: transparent;
    font-size: 2rem;
    margin: -0.5rem 0;
  }

  .rating:before{
    position: absolute;
    top: 0;
    left: 0;
    content: '★★★★★';
    color:lightgray;
  }

  .rating:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '★★★★★';
    color: gold;
    overflow: hidden;
  }

  @for $i from 0 through 100 {
    .rating-#{$i}:after {
      width: 1% * $i;
    }
  }
</style>
