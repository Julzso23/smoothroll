export default {
  methods: {
    async login(account, password) {
      let session_id = localStorage.getItem('session_id')
      if (!session_id) {
        session_id = await this.$api.startSession();
      }

      await this.$api.post('login', {
        account: account,
        password: password,
        session_id: session_id
      }).then(response => {
        if (!response.error) {
          localStorage.setItem('auth', response.data.auth);
        }
      });
    }
  }
};
