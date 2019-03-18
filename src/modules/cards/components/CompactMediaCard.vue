<template>
  <card>
    <div class="d-flex flex-row align-items-center">
      <slot></slot>

      <router-link :to="'/media/' + media.media_id" :title="media.name" class="text-reset overflow-hidden">
        <div class="mx-4 my-2 text-truncate">
          {{$t('media.episode', { number: media.episode_number })}}: {{media.name}} - {{this.media.collection_name}}
        </div>
      </router-link>
    </div>

    <progress-bar :value="(media.playhead / media.duration) * 100" />
  </card>
</template>

<script>
import Card from './Card'
import ProgressBar from 'modules/shared/components/ProgressBar'

export default {
  name: 'compact-series-card',
  props: {
    media: {
      media_id: String,
      name: String,
      playhead: Number,
      duration: Number
    }
  },
  components: {
    Card,
    ProgressBar
  }
}
</script>
