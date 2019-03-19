<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.filter')" :options="filterOptions" v-model="filter" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" v-model="mediaType" />
      <checkbox class="col-lg-3 col-md-4 col-sm-6 mb-2" v-model="compact" :label="$t('media.compact')" />
    </div>

    <series-list :filter="filter ? filter.key : ''" :mediaType="mediaType ? mediaType.key : ''" />
  </div>
</template>

<script>
import DropdownSelector from 'modules/shared/DropdownSelector'
import Checkbox from 'modules/shared/Checkbox'
import SeriesList from 'modules/media/SeriesList'

export default {
  name: 'browse-filter',
  components: {
    DropdownSelector,
    Checkbox,
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
      filter: null,

      mediaOptions: [
        { key: 'anime', value: this.$t('media.types.anime') },
        { key: 'drama', value: this.$t('media.types.drama') }
      ],
      mediaType: null
    }
  },
  mounted () {
    this.filter = this.filterOptions[0]
    this.mediaType = this.mediaOptions[0]
  },
  computed: {
    compact: {
      get () {
        return this.$store.state.media.displayCompact
      },
      set (value) {
        this.$store.commit('setCompactDisplay', value)
      }
    }
  }
}
</script>
