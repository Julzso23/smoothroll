<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.filter')" :options="filterOptions" @selectionUpdate="selection => filter = selection" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" @selectionUpdate="selection => mediaType = selection" />
    </div>

    <series-list :filter="filter" :mediaType="mediaType" />
  </div>
</template>

<script>
import DropdownSelector from 'modules/shared/components/DropdownSelector'
import SeriesList from 'modules/media/components/SeriesList'

export default {
  name: 'browse-filter',
  components: {
    DropdownSelector,
    SeriesList
  },
  data: function () {
    return {
      filterOptions: [
        { key: 'alpha', value: this.$t('media.filters.alphabetical') },
        { key: 'featured', value: this.$t('media.filters.featured') },
        { key: 'newest', value: this.$t('media.filters.newest') },
        { key: 'popular', value: this.$t('media.filters.popular') },
        { key: 'simulcast', value: this.$t('media.filters.simulcast') },
        { key: 'updated', value: this.$t('media.filters.updated') }
      ],
      filter: '',

      mediaOptions: [
        { key: 'anime', value: this.$t('media.types.anime') },
        { key: 'drama', value: this.$t('media.types.drama') }
      ],
      mediaType: ''
    }
  },
  mounted () {
    this.filter = this.filterOptions[0].key
    this.mediaType = this.mediaOptions[0].key
  }
}
</script>
