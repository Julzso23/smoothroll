<template>
  <div class="sk-fading-circle">
    <div v-for="i in count" :key="i" :class="'sk-circle sk-circle' + i"></div>
  </div>
</template>

<script>
export default {
  name: 'loading-small',
  data: () => ({
    count: 10
  })
}
</script>

<style lang="scss" scoped>
  @import 'scss/_variables';

  .sk-fading-circle {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
  }

  .sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  $count: 10;

  .sk-fading-circle .sk-circle:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: (15% * 12) / $count;
    height: (15% * 12) / $count;
    background-color: $light;
    border-radius: 100%;
    animation: sk-circleFadeDelay ($count * 0.1s) infinite ease-out both;
  }

  @for $i from 1 through $count {
    .sk-fading-circle .sk-circle#{$i} {
      transform: rotate((360deg / $count) * ($i - 1));
    }

    .sk-fading-circle .sk-circle#{$i}:before {
      animation-delay: -0.1s * (($count + 1) - $i);
    }
  }

  @-webkit-keyframes sk-circleFadeDelay {
    0%, 39%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }

  @keyframes sk-circleFadeDelay {
    0%, 39%, 100% { opacity: 0; }
    40% { opacity: 1; }
  }
</style>
