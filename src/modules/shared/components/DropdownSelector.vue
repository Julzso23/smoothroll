<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <label class="input-group-text">{{label}}</label>
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
      label: String
    },
    data: () => ({
      selection: ''
    }),
    created() {
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
