<template>
  <li class="nav-item">
    <router-link :to="to" class="nav-link"><slot></slot></router-link>
  </li>
</template>

<script>
  export default {
    name: 'navbar-link',
    props: {
      to: String
    }
  }
</script>
