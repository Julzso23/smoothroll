<template>
  <div v-if="series && series.series_id == seriesId">
    <div class="row mb-4">
      <div class="col-9">
        <h3 class="text-light">{{series.name}}</h3>
        <p class="text-light">{{series.description}}</p>

        <toggle-queue-button @toggle="onQueueToggle" :seriesId="series.series_id" :inQueue="series.in_queue" />
      </div>

      <div class="col-3">
        <img class="img-fluid mx-auto d-block" v-if="series.portrait_image" :src="series.portrait_image.large_url" />
      </div>
    </div>

    <collection v-for="collection in mediaCollections" :key="collection.id" :collection="collection" />
  </div>

  <loading v-else />
</template>

<script>
  import Collection from 'modules/media/components/Collection';
  import Loading from 'modules/shared/components/Loading';
  import ToggleQueueButton from 'modules/media/components/ToggleQueueButton';

  export default {
    name: 'series',
    created() {
      this.$store.dispatch('getSeries', this.seriesId);
    },
    computed: {
      series() {
        return this.$store.state.media.currentSeries;
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
      Collection,
      Loading,
      ToggleQueueButton
    },
    watch: {
      series(value) {
        this.$store.dispatch('listMedia', {
          seriesId: this.seriesId,
          count: this.series.media_count
        });

        document.title = `${this.series.name} ― Smoothroll`;
      },
      seriesId() {
        this.$store.dispatch('getSeries', this.seriesId);
      }
    },
    methods: {
      onQueueToggle(endLoading) {
        this.$store.dispatch('getSeries', this.seriesId)
          .then(() => {
            endLoading();
          });
      }
    }
  }
</script>
