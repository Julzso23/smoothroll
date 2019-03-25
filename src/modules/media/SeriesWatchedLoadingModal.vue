<template>
  <div class="modal" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content bg-dark text-light">
        <div class="modal-body text-center">
          <progress-bar :value="completion" />
          {{currentEpisode}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from 'modules/shared/ProgressBar'

export default {
  name: 'series-watched-loading-modal',
  components: {
    ProgressBar
  },
  props: {
    completion: Number,
    currentEpisode: String
  }
}
</script>
