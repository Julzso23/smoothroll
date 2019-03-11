<template>
  <ul class="navbar-nav" v-if="isLoggedIn">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{username}}
      </a>
      <div class="dropdown-menu bg-dark" aria-labelledby="userDropdown">
        <!-- <router-link class="dropdown-item bg-dark text-light" to="/settings">{{$t('navbar.settings')}}</router-link>
        <div class="dropdown-divider"></div> -->
        <a class="dropdown-item bg-dark text-light" href="#" @click="logout">{{$t('authentication.logout')}}</a>
      </div>
    </li>
  </ul>

  <ul class="navbar-nav" v-else>
    <navbar-link to="/login">{{$t('authentication.login')}}</navbar-link>
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
    },
    methods: {
      async logout() {
        await this.$store.dispatch('logout');
        this.$router.push('/login');
      }
    }
  }
</script>
