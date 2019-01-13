<template>
  <div>
    {{name}}
  </div>
</template>

<script>
  export default {
    name: 'media',
    created() {
      this.$store.dispatch('getMedia', this.$route.params.id);
    },
    computed: {
      name() {
        if (this.$store.state.media.currentMedia) {
          return this.$store.state.media.currentMedia.name;
        }
        return '';
      }
    }
  }
</script>
