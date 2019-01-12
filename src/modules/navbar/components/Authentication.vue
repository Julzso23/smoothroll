<template>
  <ul class="navbar-nav" v-if="isLoggedIn">
    <span class="navbar-text text-muted">{{username}}</span>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="$api.logout()">Logout</a>
    </li>
  </ul>

  <ul class="navbar-nav" v-else>
    <navbar-link to="/login">Login</navbar-link>
  </ul>
</template>

<script>
  import NavbarLink from './NavbarLink';

  export default {
    name: 'navbar-authentication',
    components: {
      NavbarLink
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      username() {
        return this.$store.state.authentication.user.username;
      }
    }
  }
</script>
