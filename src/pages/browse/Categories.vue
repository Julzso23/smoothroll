<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" v-model="mediaType" />
    </div>

    <div v-if="!loading && mediaType">
      <h1 class="text-light">{{$t('media.genres')}}</h1>
      <hr class="mt-0 bg-light" />
      <router-link v-for="genre in genres" :key="genre.tag" class="btn btn-primary btn-lg m-1" :to="'/browse/categories/' + mediaType.key + '/' + genre.tag">{{genre.label}}</router-link>
      <h1 class="text-light">{{$t('media.seasons')}}</h1>
      <hr class="mt-0 bg-light" />
      <router-link v-for="season in seasons" :key="season.tag" class="btn btn-primary btn-lg m-1" :to="'/browse/categories/' + mediaType.key + '/' + season.tag">{{season.label}}</router-link>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import DropdownSelector from 'modules/shared/components/DropdownSelector'
import Loading from 'modules/shared/components/Loading'

export default {
  name: 'browse-tags',
  mounted () {
    this.mediaType = this.mediaOptions[0]
  },
  methods: {
    updateCategories () {
      this.loading = true
      this.$store.dispatch('getCategories', this.mediaType.key)
        .then(() => {
          this.loading = false
        })
    }
  },
  computed: {
    genres () {
      return this.$store.state.browse.categories.genre
    },
    seasons () {
      return this.$store.state.browse.categories.season
    }
  },
  data () {
    return {
      mediaOptions: [
        { key: 'anime', value: this.$t('media.types.anime') },
        { key: 'drama', value: this.$t('media.types.drama') }
      ],
      mediaType: null,

      loading: false
    }
  },
  components: {
    DropdownSelector,
    Loading
  },
  watch: {
    mediaType () {
      this.updateCategories()
    }
  }
}
</script>
