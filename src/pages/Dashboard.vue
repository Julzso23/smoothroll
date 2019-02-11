<template>
  <div>
    <h3 class="text-light">Queue</h3>
    <hr class="mt-0 bg-light" />
    <queue />

    <h3 class="text-light">Recent Releases</h3>
    <hr class="mt-0 bg-light" />
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
