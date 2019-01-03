<template>
  <div>
    <div class="row">
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6" label="Filter" :options="filterOptions" @selectionUpdate="selection => filter = selection" />
      <dropdown-selector class="col-lg-3 col-md-4 col-sm-6" label="Media" :options="mediaOptions" @selectionUpdate="selection => media = selection" />
    </div>
  </div>
</template>

<script>
  import DropdownSelector from 'modules/shared/components/DropdownSelector';

  export default {
    name: 'browse',
    components: {
      DropdownSelector
    },
    data: () => ({
      filterOptions: [
        {key: 'alpha', value: 'Alphabetical'},
        {key: 'featured', value: 'Featured'},
        {key: 'newest', value: 'Newest'},
        {key: 'popular', value: 'Popular'},
        {key: 'simulcast', value: 'Simulcast'},
        {key: 'updated', value: 'Updated'}
      ],
      filter: 'alpha',

      mediaOptions: [
        {key: 'anime', value: 'Anime'},
        {key: 'drama', value: 'Drama'}
      ],
      media: 'anime'
    })
  }
</script>
