<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <label class="input-group-text bg-dark text-light">{{label}}</label>
    </div>
    <div class="input-group-append">
      <div class="input-group-text">
        <input type="checkbox" :checked="value" @input="input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    value: Boolean,
    label: String
  },
  methods: {
    input (event) {
      this.$emit('input', event.target.checked)
    }
  }
}
</script>
