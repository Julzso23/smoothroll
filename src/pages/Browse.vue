<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" label="Filter" :options="filterOptions" @selectionUpdate="selection => {filter = selection; updateSeriesList()}" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" label="Media" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateSeriesList()}" />
    </div>

    <div class="row">
      <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4" v-for="series in seriesList" :key="series.series_id">
        <series-card :series="series" />
      </div>
    </div>
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';
  import SeriesCard from 'modules/cards/components/SeriesCard';

  export default {
    name: 'browse',
    components: {
      DropdownSelector,
      SeriesCard
    },
    data: () => ({
      filterOptions: [
        {key: 'alpha', value: 'Alphabetical'},
        {key: 'featured', value: 'Featured'},
        {key: 'newest', value: 'Newest'},
        {key: 'popular', value: 'Popular'},
        {key: 'simulcast', value: 'Simulcast'},
        {key: 'updated', value: 'Updated'}
      ],
      filter: 'alpha',

      mediaOptions: [
        {key: 'anime', value: 'Anime'},
        {key: 'drama', value: 'Drama'}
      ],
      mediaType: 'anime',

      limit: 50,
      offset: 0
    }),
    computed: {
      seriesList() {
        return this.$store.state.series.seriesList;
      }
    },
    methods: {
      async updateSeriesList() {
        await this.$store.dispatch('listSeries', {
          filter: this.filter,
          mediaType: this.mediaType,
          limit: this.limit,
          offset: this.offset
        });
      }
    },
    created() {
      this.updateSeriesList();
    }
  }
</script>
