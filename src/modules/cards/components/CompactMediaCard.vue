<template>
  <card class="flex-row align-items-center">
    <slot></slot>

    <router-link :to="'/media/' + media.media_id" :title="media.name" class="text-reset">
      <div class="mx-4 my-2 text-truncate">
        {{$t('media.episode', { number: media.episode_number })}}: {{media.name}} - {{this.media.collection_name}}
      </div>
    </router-link>
  </card>
</template>

<script>
import Card from './Card'

export default {
  name: 'compact-series-card',
  props: {
    media: {
      media_id: String,
      name: String
    }
  },
  components: {
    Card
  }
}
</script>
