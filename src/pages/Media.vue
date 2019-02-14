<template>
  <div v-if="media && media.media_id == mediaId">
    <player :mediaId="media.media_id" :streamData="media.stream_data" :poster="media.screenshot_image.full_url" :duration="media.duration" :playhead="media.playhead" />

    <h3 class="text-light"><router-link :to="'/series/' + media.series_id" class="text-reset">{{media.collection_name}}</router-link></h3>
    <h4 class="text-light">{{'Episode ' + media.episode_number + ' - ' + media.name}}</h4>
    <p class="text-light">{{media.description}}</p>

    <scrolling-collection :collection="collection" :active="media.media_id" />
  </div>
  <loading v-else />
</template>

<script>
  import Player from 'modules/media/components/Player';
  import Loading from 'modules/shared/components/Loading';
  import ScrollingCollection from 'modules/media/components/ScrollingCollection';

  export default {
    name: 'media',
    created() {
      this.$store.dispatch('getMedia', this.mediaId);
    },
    computed: {
      media() {
        return this.$store.state.media.currentMedia;
      },
      mediaId() {
        return this.$route.params.id;
      },
      collection() {
        return this.$store.state.media.collection;
      }
    },
    components: {
      Player,
      Loading,
      ScrollingCollection
    },
    watch: {
      mediaId() {
        this.$store.dispatch('getMedia', this.mediaId);
      },
      media() {
        document.title = `Episode ${this.media.episode_number}: ${this.media.name} - ${this.media.series_name} ― Smoothroll`;

        this.$store.dispatch('getCollection', this.media.collection_id);
      }
    }
  }
</script>
