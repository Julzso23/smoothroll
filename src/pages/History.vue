<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" :label="$t('media.media')" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateMediaList()}" />
    </div>

    <div class="mb-4" v-if="!loading">
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="media in mediaList" :key="media.media_id">
          <media-card :media="media" />
        </div>
      </div>

      <div v-if="canLoadMore">
        <button class="btn btn-block btn-primary" v-if="!loadingMore" @click="loadMore">Load More</button>
        <button class="btn btn-block btn-disabled" v-else><loading /></button>
      </div>
    </div>

    <loading v-else />
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';
  import Loading from 'modules/shared/components/Loading';
  import MediaCard from 'modules/cards/components/MediaCard';

  export default {
    name: 'History',
    data: function() {
      return {
        mediaOptions: [
          {key: 'anime', value: this.$t('media.types.anime')},
          {key: 'drama', value: this.$t('media.types.drama')},
          {key: 'anime|drama', value: this.$t('media.types.both')}
        ],
        mediaType: 'anime',

        limit: 50,
        offset: 0,

        loading: false,
        loadingMore: false,
        canLoadMore: true
      };
    },
    methods: {
      async updateMediaList() {
        this.loading = true;
        this.offset = 0;

        await this.$store.dispatch('getHistory', {
          mediaTypes: this.mediaType,
          limit: this.limit,
          offset: this.offset
        })
          .then(() => {
            this.loading = false;
          });
      },

      async loadMore() {
        this.loadingMore = true;
        this.offset += this.limit;

        await this.$store.dispatch('getHistory', {
          mediaTypes: this.mediaType,
          limit: this.limit,
          offset: this.offset,
          append: true
        })
          .then(() => {
            this.loadingMore = false;
            if (this.mediaList.length % this.limit != 0 || data.length == 0) {
              this.canLoadMore = false;
            }
          });
      }
    },
    created() {
      this.updateMediaList();
      document.title = `${this.$t('navbar.history')} ― Smoothroll`;
    },
    components: {
      DropdownSelector,
      MediaCard,
      Loading
    },
    computed: {
      mediaList() {
        return this.$store.state.media.mediaList;
      }
    }
  }
</script>
