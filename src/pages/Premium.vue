<template>
  <div>
    <h1 class="text-light">{{$t('error.premium')}}</h1>
  </div>
</template>

<script>
export default {
  name: 'premium',
  created () {
    document.title = 'Premium ― Smoothroll'
  }
}
</script>
