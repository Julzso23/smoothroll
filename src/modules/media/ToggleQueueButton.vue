<template>
  <button class="btn btn-primary" @click="toggleQueue" v-if="!loading">{{inQueue ? $t('media.queueRemove') : $t('media.queueAdd')}}</button>
  <button class="btn btn-disabled" v-else><loading /></button>
</template>

<script>
import Loading from 'modules/shared/Loading'

export default {
  name: 'toggle-queue-button',
  props: {
    seriesId: String,
    inQueue: Boolean
  },
  data: () => ({
    loading: false
  }),
  methods: {
    toggleQueue () {
      this.loading = true

      this.$store.dispatch('media/toggleQueue', {
        seriesId: this.seriesId,
        inQueue: this.inQueue
      })
        .then(() => {
          this.$emit('toggle', this.endLoading)
        })
    },
    endLoading () {
      this.loading = false
    }
  },
  components: {
    Loading
  }
}
</script>
