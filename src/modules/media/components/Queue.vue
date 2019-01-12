<template>
</template>

<script>
  export default {
    name: 'queue',
    created() {
      this.$store.dispatch('getQueue');
    }
  }
</script>
