<template>
  <div>
    <div class="row mb-4">
      <div class="col-9">
        <h3 class="text-light">{{series.name}}</h3>
        <p class="text-light">{{series.description}}</p>
      </div>

      <div class="col-3">
        <img class="img-fluid mx-auto d-block" v-if="series.portrait_image" :src="series.portrait_image.large_url" />
      </div>
    </div>

    <collection v-for="collection in mediaCollections" :key="collection.id" :collection="collection" />
  </div>
</template>

<script>
  import Collection from 'modules/media/components/Collection';

  export default {
    name: 'series',
    created() {
      this.$store.dispatch('getSeries', this.$route.params.id);
    },
    computed: {
      series() {
        return this.$store.state.media.currentSeries || {};
      },
      mediaCollections() {
        let collections = [];
        for (let media of this.$store.state.media.mediaList) {
          if (!collections.find(collection => collection.id == media.collection_id)) {
            let collection = {};
            collection.id = media.collection_id;
            collection.name = media.collection_name;
            collection.media = [];
            collections.push(collection);
          }

          collections.find(collection => collection.id == media.collection_id).media.push(media);
        }
        return collections;
      }
    },
    components: {
      Collection
    },
    watch: {
      series(value) {
        this.$store.dispatch('listMedia', {
          seriesId: this.$route.params.id,
          count: this.series.media_count
        });
      }
    }
  }
</script>
