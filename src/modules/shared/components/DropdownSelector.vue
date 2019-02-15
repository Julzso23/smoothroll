<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <label class="input-group-text bg-dark text-light">{{label}}</label>
    </div>
    <select class="custom-select" v-model="selection" @change="onChange">
      <option v-for="option in options" :key="option.key">{{option.value}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'dropdown-selector',
    props: {
      options: Array,
      label: String,
      initialSelection: String
    },
    data: () => ({
      selection: ''
    }),
    mounted() {
      if (this.initialSelection) {
        for (let option of this.options) {
          if (option.key == this.initialSelection) {
            this.selection = option.value;
            return;
          }
        }
      }
      this.selection = this.options[0].value;
    },
    methods: {
      onChange() {
        let key = '';
        for (let option of this.options) {
          if (option.value == this.selection) {
            key = option.key;
            break;
          }
        }
        this.$emit('selectionUpdate', key);
      }
    }
  }
</script>
