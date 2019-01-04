<template>
  <ul class="navbar-nav" v-if="user == null">
    <navbar-link to="/login">Login</navbar-link>
  </ul>

  <ul class="navbar-nav" v-else>
    <span class="navbar-text text-muted">{{user.username}}</span>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="$api.logout()">Logout</a>
    </li>
  </ul>
</template>

<script>
  import NavbarLink from './NavbarLink';
  import EventBus from 'EventBus';

  export default {
    name: 'navbar-authentication',
    data: () => ({
      user: null
    }),
    components: {
      NavbarLink
    },
    created() {
      EventBus.$on('onLogin', data => this.user = data.user);
      EventBus.$on('onLogout', () => this.user = null);
    }
  }
</script>
