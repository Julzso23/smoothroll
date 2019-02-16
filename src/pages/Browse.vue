<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.filter')" :options="filterOptions" @selectionUpdate="selection => {filter = selection; updateSeriesList()}" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateSeriesList()}" />
    </div>

    <div v-if="!loading" class="mb-4">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4" v-for="series in seriesList" :key="series.series_id">
          <series-card :series="series" />
        </div>
      </div>

      <div v-if="canLoadMore">
        <button class="btn btn-block btn-primary" v-if="!loadingMore" @click="loadMore">{{$t('media.loadMore')}}</button>
        <button class="btn btn-block btn-disabled" v-else><loading /></button>
      </div>
    </div>

    <loading v-else />
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';
  import Loading from 'modules/shared/components/Loading';
  import SeriesCard from 'modules/cards/components/SeriesCard';

  export default {
    name: 'browse',
    components: {
      DropdownSelector,
      SeriesCard,
      Loading
    },
    data: function() {
      return {
        filterOptions: [
          {key: 'alpha', value: this.$t('media.filters.alphabetical')},
          {key: 'featured', value: this.$t('media.filters.featured')},
          {key: 'newest', value: this.$t('media.filters.newest')},
          {key: 'popular', value: this.$t('media.filters.popular')},
          {key: 'simulcast', value: this.$t('media.filters.simulcast')},
          {key: 'updated', value: this.$t('media.filters.updated')}
        ],
        filter: 'alpha',

        mediaOptions: [
          {key: 'anime', value: this.$t('media.types.anime')},
          {key: 'drama', value: this.$t('media.types.drama')}
        ],
        mediaType: 'anime',

        limit: 50,
        offset: 0,

        loading: false,
        loadingMore: false,
        canLoadMore: true
      };
    },
    computed: {
      seriesList() {
        return this.$store.state.media.seriesList;
      }
    },
    methods: {
      async updateSeriesList() {
        this.loading = true;
        this.offset = 0;

        await this.$store.dispatch('listSeries', {
          filter: this.filter,
          mediaType: this.mediaType,
          limit: this.limit,
          offset: this.offset
        })
          .then(() => {
            this.loading = false;
          });
      },

      async loadMore() {
        this.loadingMore = true;
        this.offset += this.limit;

        await this.$store.dispatch('listSeries', {
          filter: this.filter,
          mediaType: this.mediaType,
          limit: this.limit,
          offset: this.offset,
          append: true
        })
          .then(data => {
            this.loadingMore = false;
            if (this.seriesList.length % this.limit != 0 || data.length == 0) {
              this.canLoadMore = false;
            }
          });
      }
    },
    created() {
      this.updateSeriesList();

      document.title = `${this.$t('navbar.browse')} ― Smoothroll`;
    }
  }
</script>
