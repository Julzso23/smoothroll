<template>
  <router-link :to="'/series/' + series.series_id" :title="series.name">
    <card>
      <div class="mx-4 my-2 text-truncate">
        {{series.name}}
      </div>
    </card>
  </router-link>
</template>

<script>
import Card from './Card'

export default {
  name: 'compact-series-card',
  props: {
    series: {
      series_id: String,
      name: String
    }
  },
  components: {
    Card
  }
}
</script>
