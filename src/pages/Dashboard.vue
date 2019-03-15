<template>
  <div>
    <h3 class="text-light">
      {{$t('dashboard.queue')}}
      <loading-small v-if="queueLoading && queueLength != 0" />
    </h3>
    <hr class="mt-0 bg-light" />
    <queue ref="queue" />

    <h3 class="text-light">
      {{$t('dashboard.recent')}}
      <loading-small v-if="recentMediaLoading && recentMediaLength != 0" />
    </h3>
    <hr class="mt-0 bg-light" />
    <recent-media />
  </div>
</template>

<script>
import Queue from 'modules/media/components/Queue'
import RecentMedia from 'modules/media/components/RecentMedia'
import LoadingSmall from 'modules/shared/components/LoadingSmall'

export default {
  name: 'dashboard',
  components: {
    Queue,
    RecentMedia,
    LoadingSmall
  },
  created () {
    document.title = `${this.$t('navbar.dashboard')} ― Smoothroll`
  },
  computed: {
    queueLoading () {
      return this.$store.state.queue.loading
    },
    queueLength () {
      return this.$store.state.queue.queue.length
    },
    recentMediaLoading () {
      return this.$store.state.media.recentMediaLoading
    },
    recentMediaLength () {
      return this.$store.state.media.recentMedia.length
    }
  }
}
</script>
