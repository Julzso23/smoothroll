<template>
  <div>
    <div class="row mb-4">
      <div class="col-9">
        <h3 class="text-light">{{series.name}}</h3>
        <p class="text-light">{{series.description}}</p>
        <button class="btn btn-primary" @click="toggleQueue">{{series.in_queue ? 'Remove from queue' : 'Add to queue'}}</button>
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
      this.$store.dispatch('getSeries', this.seriesId);
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
      },
      seriesId() {
        return this.$route.params.id;
      }
    },
    components: {
      Collection
    },
    watch: {
      series(value) {
        this.$store.dispatch('listMedia', {
          seriesId: this.seriesId,
          count: this.series.media_count
        });
      },
      seriesId() {
        this.$store.dispatch('getSeries', this.seriesId);
      }
    },
    methods: {
      toggleQueue() {
        this.$store.dispatch('toggleQueue', {
          seriesId: this.series.series_id,
          inQueue: this.series.in_queue
        })
          .then(() => {
            this.$store.dispatch('getSeries', this.seriesId);
          });
      }
    }
  }
</script>
