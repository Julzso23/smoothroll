<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" label="Media" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateMediaList()}" />
    </div>

    <div class="row" v-if="!loading">
      <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="media in mediaList" :key="media.media_id">
        <media-card :media="media" />
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
    data: () => ({
      mediaOptions: [
        {key: 'anime', value: 'Anime'},
        {key: 'drama', value: 'Drama'},
        {key: 'anime|drama', value: 'Both'}
      ],
      mediaType: 'anime',

      limit: 50,
      offset: 0,

      loading: false
    }),
    methods: {
      async updateMediaList() {
        this.loading = true;

        await this.$store.dispatch('getHistory', {
          mediaTypes: this.mediaType,
          limit: this.limit,
          offset: this.offset
        })
          .then(() => {
            this.loading = false;
          });
      }
    },
    created() {
      this.updateMediaList();
      document.title = 'History ― Smoothroll';
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
