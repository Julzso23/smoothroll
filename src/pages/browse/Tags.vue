<template>
  <div>
    <div class="row mb-2">
      <checkbox class="col-lg-3 col-md-4 col-sm-6 mb-2" v-model="compact" :label="$t('media.compact')" />
    </div>
    <series-list :filter="filter" :mediaType="mediaType" />
  </div>
</template>

<script>
import SeriesList from 'modules/media/SeriesList'
import Checkbox from 'modules/shared/Checkbox'

export default {
  name: 'browse-tags',
  components: {
    SeriesList,
    Checkbox
  },
  data: () => ({
    filter: '',
    mediaType: ''
  }),
  mounted () {
    this.filter = 'tag:' + this.$route.params.tag
    this.mediaType = this.$route.params.mediaType
  },
  computed: {
    compact: {
      get () {
        return this.$store.state.media.displayCompact
      },
      set (value) {
        this.$store.commit('media/setCompactDisplay', value)
      }
    }
  }
}
</script>
