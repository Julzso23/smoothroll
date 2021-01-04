<template>
  <form @submit.prevent="login" v-if="!loading">
    <div class="alert alert-danger" role="alert" v-if="error.length != 0">{{error}}</div>

    <div class="form-group">
      <input v-model="account" type="text" name="username" :placeholder="$t('authentication.usernameEmail')" autocomplete="username" class="form-control" />
    </div>

    <div class="form-group">
      <input v-model="password" type="password" name="password" :placeholder="$t('authentication.password')" autocomplete="current-password" class="form-control" />
    </div>

    <button type="submit" class="btn btn-block btn-primary">{{$t('authentication.login')}}</button>
  </form>

  <loading v-else />
</template>

<script>
import Loading from 'modules/shared/Loading'

export default {
  name: 'login-form',
  data: () => ({
    account: '',
    password: ''
  }),
  methods: {
    async login () {
      this.$store.dispatch('authentication/login', {
        account: this.account,
        password: this.password
      })
        .then(() => this.$router.go(-1))
    }
  },
  computed: {
    loading () {
      return this.$store.state.authentication.loading
    },
    error () {
      return this.$store.state.authentication.error
    }
  },
  components: {
    Loading
  }
}
</script>
