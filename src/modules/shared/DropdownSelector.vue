<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <label class="input-group-text bg-dark text-light">{{label}}</label>
    </div>
    <select class="custom-select" :value="value ? value.value : ''" @change="onChange">
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
    value: {
      key: String,
      value: String
    }
  },
  methods: {
    onChange (event) {
      for (const option of this.options) {
        if (option.value === event.target.value) {
          this.$emit('input', option)
          break
        }
      }
    }
  }
}
</script>
