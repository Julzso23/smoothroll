<template>
  <series-list :filter="filter" :mediaType="mediaType" />
</template>

<script>
import SeriesList from 'modules/media/components/SeriesList'

export default {
  name: 'browse-tags',
  components: {
    SeriesList
  },
  data: () => ({
    filter: '',
    mediaType: ''
  }),
  mounted () {
    this.filter = 'tag:' + this.$route.params.tag
    this.mediaType = this.$route.params.mediaType
  }
}
</script>
