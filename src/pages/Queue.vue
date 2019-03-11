<template>
  <div>
    <queue />
  </div>
</template>

<script>
import Queue from 'modules/media/components/Queue'

export default {
  name: 'queue-page',
  components: {
    Queue
  },
  created () {
    document.title = `${this.$t('navbar.queue')} ― Smoothroll`
  }
}
</script>
