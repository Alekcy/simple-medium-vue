<template>
  <b-navbar type="is-primary">
    <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
            Simple-vue-medium
        </b-navbar-item>
    </template>

    <template slot="end">
        <b-navbar-dropdown v-if="isAuth && userName" v-bind:label="userName">
          <b-navbar-item v-if="role">
            Role: {{role}}
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item tag="div">
            <div class="buttons">
                <router-link v-if="!isAuth" class="button is-light" to="/login">Log in</router-link>
                <button v-on:click="logout" v-else class="button is-light">Log out</button>
            </div>
        </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isAuth() {
      return this.$store.state.userIsAuth
    },
    userName() {
      return this.$store.state.userName
    },
    role() {
      return this.$store.state.userRole
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
