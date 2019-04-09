<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" v-model="mediaType" />
      <checkbox class="col-lg-3 col-md-4 col-sm-6 mb-2" v-model="compact" :label="$t('media.compact')" />
      <loading-small v-if="loading && mediaList.length !== 0" />
    </div>

    <div class="mb-4" v-if="!loading || mediaList.length !== 0">
      <div class="alert alert-info bg-dark text-light" v-if="!mediaList.length">
        {{$t('media.emptyHistory')}}
      </div>

      <div class="row" v-if="compact">
        <div class="col-12 mb-2" v-for="media in mediaList" :key="media.media_id">
          <compact-media-card :media="media" />
        </div>
      </div>

      <div class="row" v-else>
        <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="media in mediaList" :key="media.media_id">
          <media-card :media="media" />
        </div>
      </div>

      <div v-if="canLoadMore">
        <button class="btn btn-block btn-primary" v-if="!loadingMore" @click="loadMore">{{$t('media.loadMore')}}</button>
        <loading v-else />
      </div>
    </div>

    <loading v-else />
  </div>
</template>

<script>
import DropdownSelector from 'modules/shared/DropdownSelector'
import Checkbox from 'modules/shared/Checkbox'
import Loading from 'modules/shared/Loading'
import LoadingSmall from 'modules/shared/LoadingSmall'
import MediaCard from 'modules/cards/MediaCard'
import CompactMediaCard from 'modules/cards/CompactMediaCard'

export default {
  name: 'History',
  data: function () {
    return {
      mediaOptions: [
        { key: 'anime', value: this.$t('media.types.anime') },
        { key: 'drama', value: this.$t('media.types.drama') },
        { key: 'anime|drama', value: this.$t('media.types.both') }
      ],
      mediaType: null,

      limit: 50,
      offset: 0,

      loading: false,
      loadingMore: false,
      canLoadMore: true
    }
  },
  methods: {
    async updateMediaList () {
      this.loading = true
      this.offset = 0

      await this.$store.dispatch('media/getHistory', {
        mediaTypes: this.mediaType.key,
        limit: this.limit,
        offset: this.offset
      })
        .then(data => {
          this.loading = false

          if (this.mediaList.length % this.limit !== 0 || data.length === 0) {
            this.canLoadMore = false
          }
        })
    },

    async loadMore () {
      this.loadingMore = true
      this.offset += this.limit

      await this.$store.dispatch('media/getHistory', {
        mediaTypes: this.mediaType.key,
        limit: this.limit,
        offset: this.offset,
        append: true
      })
        .then(data => {
          this.loadingMore = false
          if (this.mediaList.length % this.limit !== 0 || data.length === 0) {
            this.canLoadMore = false
          }
        })
    }
  },
  mounted () {
    document.title = `${this.$t('navbar.history')} ― Smoothroll`

    this.mediaType = this.mediaOptions[0]
  },
  components: {
    DropdownSelector,
    Checkbox,
    MediaCard,
    CompactMediaCard,
    Loading,
    LoadingSmall
  },
  computed: {
    mediaList () {
      return this.$store.state.media.mediaList
    },
    compact: {
      get () {
        return this.$store.state.media.displayCompact
      },
      set (value) {
        this.$store.commit('media/setCompactDisplay', value)
      }
    },
    locale () {
      return this.$store.state.locale.locale
    }
  },
  watch: {
    mediaType () {
      this.updateMediaList()
    },
    locale () {
      this.updateMediaList()
    }
  }
}
</script>
