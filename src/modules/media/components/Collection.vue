<template>
  <div class="mb-2">
    <button class="btn btn-block btn-secondary text-left" type="button" data-toggle="collapse" :data-target="`#collection-${collection.id}`" aria-expanded="false" :aria-controls="`collection-${collection.id}`">
      {{collection.name}}
      <span class="dropdown-toggle float-right"></span>
    </button>
    <div class="row collapse mt-2" :id="`collection-${collection.id}`">
      <div class="col-lg-3 col-md-4 col-sm-6 offset-sm-0 col-8 offset-2 mb-4" v-for="mediaItem in collection.media" :key="mediaItem.media_id">
        <media-card :media="mediaItem" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaCard from 'modules/cards/components/MediaCard'

export default {
  name: 'collection',
  components: {
    MediaCard
  },
  props: {
    collection: Object
  }
}
</script>
