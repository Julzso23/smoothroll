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

    <div v-for="collection in mediaCollections" :key="collection.id" class="mb-2">
      <button class="btn btn-block btn-secondary text-left" type="button" data-toggle="collapse" :data-target="`#collection-${collection.id}`" aria-expanded="false" :aria-controls="`collection-${collection.id}`">
        {{collection.name}}
        <span class="dropdown-toggle float-right"></span>
      </button>
      <div class="row collapse mt-2" :id="`collection-${collection.id}`">
        <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="mediaItem in collection.media" :key="mediaItem.media_id">
          <media-card :media="mediaItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MediaCard from 'modules/cards/components/MediaCard';

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
      MediaCard
    },
    watch: {
      series: function(value) {
        this.$store.dispatch('listMedia', {
          seriesId: this.$route.params.id,
          count: this.series.media_count
        });
      }
    }
  }
</script>
