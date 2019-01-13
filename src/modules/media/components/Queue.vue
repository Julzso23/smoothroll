<template>
  <div class="row">
    <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="queueItem in queue" :key="queueItem.queue_entry_id">
      <media-card :media="queueItem.most_likely_media" :series="queueItem.series" />
    </div>
  </div>
</template>

<script>
  import MediaCard from 'modules/cards/components/MediaCard';

  export default {
    name: 'queue',
    components: {
      MediaCard
    },
    created() {
      this.$store.dispatch('getQueue');
    },
    computed: {
      queue() {
        return this.$store.state.media.queue;
      }
    }
  }
</script>
