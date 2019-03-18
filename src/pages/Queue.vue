<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" v-model="mediaType" />
      <checkbox class="col-lg-3 col-md-4 col-sm-6 mb-2" v-model="compact" :label="$t('media.compact')" />
      <loading-small v-if="loading && length !== 0" />
    </div>
    <queue :mediaType="mediaType ? mediaType.key : ''" :compact="compact" />
  </div>
</template>

<script>
import Queue from 'modules/media/components/Queue'
import DropdownSelector from 'modules/shared/components/DropdownSelector'
import Checkbox from 'modules/shared/components/Checkbox'
import LoadingSmall from 'modules/shared/components/LoadingSmall'

export default {
  name: 'queue-page',
  components: {
    Queue,
    DropdownSelector,
    Checkbox,
    LoadingSmall
  },
  mounted () {
    document.title = `${this.$t('navbar.queue')} ― Smoothroll`

    this.mediaType = this.mediaOptions[0]
  },
  data () {
    return {
      mediaOptions: [
        { key: 'anime', value: this.$t('media.types.anime') },
        { key: 'drama', value: this.$t('media.types.drama') },
        { key: 'anime|drama', value: this.$t('media.types.both') }
      ],
      mediaType: null
    }
  },
  computed: {
    compact: {
      get () {
        return this.$store.state.media.displayCompact
      },
      set (value) {
        this.$store.commit('setCompactDisplay', value)
      }
    },
    loading () {
      return this.$store.state.queue.loading
    },
    length () {
      return this.$store.state.queue.queue.length
    }
  }
}
</script>
