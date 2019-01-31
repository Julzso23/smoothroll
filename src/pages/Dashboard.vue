<template>
  <div>
    <h3 class="text-light">Queue</h3>
    <queue />
  </div>
</template>

<script>
  import Queue from 'modules/media/components/Queue';

  export default {
    name: 'dashboard',
    components: {
      Queue
    }
  }
</script>
