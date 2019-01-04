<template>
  <div>
    <div class="row mb-4">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6" label="Filter" :options="filterOptions" @selectionUpdate="selection => {filter = selection; updateSeriesList()}" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6" label="Media" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateSeriesList()}" />
    </div>

    <ul class="list-group">
      <li class="list-group-item bg-dark text-light" v-for="series in seriesList" :key="series.series_id">{{series.name}}</li>
    </ul>
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';

  export default {
    name: 'browse',
    components: {
      DropdownSelector
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

      seriesList: [],

      limit: 50,
      offset: 0
    }),
    methods: {
      async updateSeriesList() {
        await this.$api.listSeries(this.filter, this.mediaType, this.limit, this.offset)
          .then(data => this.seriesList = data);
      }
    },
    created() {
      this.updateSeriesList();
    }
  }
</script>
