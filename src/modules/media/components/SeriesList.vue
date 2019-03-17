<template>
  <div v-if="!loading" class="mb-4">
    <div class="alert alert-info bg-dark text-light" v-if="!seriesList.length">
      {{$t('media.emptyBrowse')}}
    </div>

    <div class="row">
      <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-4" v-for="series in seriesList" :key="series.series_id">
        <series-card :series="series" />
      </div>
    </div>

    <div v-if="canLoadMore">
      <button class="btn btn-block btn-primary" v-if="!loadingMore" @click="loadMore">{{$t('media.loadMore')}}</button>
      <loading v-else />
    </div>
  </div>

  <loading v-else />
</template>

<script>
import Loading from 'modules/shared/components/Loading'
import SeriesCard from 'modules/cards/components/SeriesCard'

export default {
  name: 'series-list',
  components: {
    SeriesCard,
    Loading
  },
  props: {
    filter: String,
    mediaType: String
  },
  data: function () {
    return {
      limit: 50,
      offset: 0,

      loading: false,
      loadingMore: false,
      canLoadMore: false
    }
  },
  computed: {
    seriesList () {
      return this.$store.state.browse.seriesList
    }
  },
  methods: {
    async updateSeriesList () {
      this.loading = true
      this.offset = 0

      await this.$store.dispatch('listSeries', {
        filter: this.filter,
        mediaType: this.mediaType,
        limit: this.limit,
        offset: this.offset
      })
        .then(data => {
          this.loading = false
          if (this.seriesList.length % this.limit !== 0 || data.length === 0) {
            this.canLoadMore = false
          } else {
            this.canLoadMore = true
          }
        })
    },

    async loadMore () {
      this.loadingMore = true
      this.offset += this.limit

      await this.$store.dispatch('listSeries', {
        filter: this.filter,
        mediaType: this.mediaType,
        limit: this.limit,
        offset: this.offset,
        append: true
      })
        .then(data => {
          this.loadingMore = false
          if (this.seriesList.length % this.limit !== 0 || data.length === 0) {
            this.canLoadMore = false
          } else {
            this.canLoadMore = true
          }
        })
    }
  },
  watch: {
    filter () {
      this.updateSeriesList()
    },
    mediaType () {
      this.updateSeriesList()
    }
  }
}
</script>
