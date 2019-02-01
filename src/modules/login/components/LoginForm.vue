<template>
  <form @submit.prevent="login">
    <input v-model="account" type="text" name="account" placeholder="Username or email" class="form-control" />
    <input v-model="password" type="password" name="password" placeholder="Password" class="form-control" />
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<script>
  export default {
    name: 'login-form',
    data: () => ({
      account: '',
      password: ''
    }),
    methods: {
      async login() {
        this.$store.dispatch('login', {
          account: this.account,
          password: this.password
        })
          .then(() => this.$router.go(-1));
      }
    }
  }
</script>
