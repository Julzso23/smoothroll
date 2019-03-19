<template>
  <div class="progress rounded-0" style="height: 4px">
    <div class="progress-bar bg-primary" role="progressbar" :style="{width: value + '%'}" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    value: Number
  }
}
</script>
