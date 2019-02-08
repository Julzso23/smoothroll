<template>
  <div>
    <div class="row mb-2">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6 mb-2" label="Media" :options="mediaOptions" @selectionUpdate="selection => {mediaType = selection; updateMediaList()}" />
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="media in mediaList" :key="media.media_id">
        <media-card :media="media" />
      </div>
    </div>
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';
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
      offset: 0
    }),
    methods: {
      async updateMediaList() {
        await this.$store.dispatch('getHistory', {
          mediaTypes: this.mediaType,
          limit: this.limit,
          offset: this.offset
        });
      }
    },
    created() {
      this.updateMediaList();
      document.title = 'History ― Smoothroll';
    },
    components: {
      DropdownSelector,
      MediaCard
    },
    computed: {
      mediaList() {
        return this.$store.state.media.mediaList;
      }
    }
  }
</script>
