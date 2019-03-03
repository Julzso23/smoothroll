<template>
  <div v-if="series && series.series_id == seriesId">
    <div class="header mb-4">
      <div class="header-image" :style="{'background-image': `url('${series.landscape_image.full_url}')`}"></div>
      <div class="header-gradient"><div class="container"><div class="row"><h2 class="text-light col-9">{{series.name}}</h2></div></div></div>
    </div>

    <div class="container">
      <div class="row mb-4">
        <div class="col-md-9 col-12">
          <p class="text-light">{{series.description}}</p>

          <toggle-queue-button @toggle="onQueueToggle" :seriesId="series.series_id" :inQueue="series.in_queue" />
          <rating class="float-right" :rating="series.rating" />
        </div>

        <div class="col-3 d-none d-md-block">
          <img class="img-fluid mx-auto d-block box-image" v-if="series.portrait_image" :src="series.portrait_image.large_url" />
        </div>
      </div>

      <div v-if="!collectionsLoading">
        <collection v-for="collection in mediaCollections" :key="collection.id" :collection="collection" />
      </div>
      <loading v-else />
    </div>
  </div>

  <loading v-else />
</template>

<script>
  import Collection from 'modules/media/components/Collection';
  import Loading from 'modules/shared/components/Loading';
  import ToggleQueueButton from 'modules/media/components/ToggleQueueButton';
  import Rating from 'modules/media/components/Rating';

  export default {
    name: 'series',
    created() {
      this.$store.dispatch('getSeries', this.seriesId);
    },
    data: () => ({
      collectionsLoading: false
    }),
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
      ToggleQueueButton,
      Rating
    },
    watch: {
      series(value) {
        this.collectionsLoading = true;

        this.$store.dispatch('listMedia', {
          seriesId: this.seriesId,
          count: this.series.media_count
        })
          .then(() => {
            this.collectionsLoading = false;
          });

        this.fixMixedContent();

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
      },
      fixMixedContent() {
        if (this.series.landscape_image) {
          this.series.landscape_image.full_url = this.series.landscape_image.full_url.replace('http://', 'https://');
        }

        if (this.series.portrait_image) {
          this.series.portrait_image.large_url = this.series.portrait_image.large_url.replace('http://', 'https://');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    overflow: hidden;
    margin-top: -1.5rem;

    .header-gradient {
      background: rgb(0,0,0);
      background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 90%);
      width: 100%;
      position: absolute;
      bottom: 0;
      padding-top: 1rem;

      h2 {
        padding: 0 10px;
        text-shadow: 1px 1px 2px black;
        font-weight: bold;
      }
    }
  }

  .header-image {
    filter: blur(4px);
    width: 100%;
    height: 15rem;
    background-size: cover;
    background-position: center;
  }

  .box-image {
    margin-top: -10rem;
    box-shadow: 0 1px 4px black;
  }
</style>
