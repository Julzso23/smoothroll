<template>
  <div class="spinner">
    <div v-for="i in count" :key="i" :class="'rect rect' + i"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data: () => ({
    count: 5
  })
}
</script>

<style lang="scss" scoped>
  @import "scss/_variables";

  $count: 5;

  .spinner {
    margin: 0 auto;
    width: $count * 8px;
    height: 40px;
    display: flex;
    justify-content: space-around;

    .rect {
      background-color: $light;
      height: 100%;
      width: 6px;

      animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }

    @for $i from 1 through $count {
      .rect#{$i} {
        animation-delay: -0.1s * ($count - $i);
      }
    }
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
</style>
