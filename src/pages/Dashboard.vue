<template>
  <div>
    <h3 class="text-light">Queue</h3>
    <queue />

    <h3 class="text-light">Recent Releases</h3>
    <recent-media />
  </div>
</template>

<script>
  import Queue from 'modules/media/components/Queue';
  import RecentMedia from 'modules/media/components/RecentMedia';

  export default {
    name: 'dashboard',
    components: {
      Queue,
      RecentMedia
    },
    created() {
      document.title = "Dashboard ― Smoothroll";
    }
  }
</script>
