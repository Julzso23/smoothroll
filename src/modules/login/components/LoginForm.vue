<template>
  <form @submit.prevent="login(account, password)">
    <input v-model="account" type="text" name="account" placeholder="Username or email" class="form-control" />
    <input v-model="password" type="password" name="password" placeholder="Password" class="form-control" />
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<script>
  import login from '../mixins/login';

  export default {
    name: 'login-form',
    data: () => ({
      account: '',
      password: ''
    }),
    mixins: [login]
  }
</script>

<style lang="scss" module>
</style>
