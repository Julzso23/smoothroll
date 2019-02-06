<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
      <login-form />
    </div>
  </div>
</template>

<script>
  import LoginForm from 'modules/login/components/LoginForm';

  export default {
    name: 'login',
    components: {
      LoginForm
    }
  }
</script>
