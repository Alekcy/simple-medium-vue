<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third-desktop is-two-thirds-tablet is-full login-form">
        <div class="field">
          <label class="label">Username (email)</label>
          <div class="control">
            <input
              class="input"
              v-bind:class="{'is-danger': emailError !== null}"
              type="text"
              placeholder="Text input"
              v-model="email"
            >
          </div>
          <p v-if="emailError" class="help is-danger">{{emailError}}</p>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              v-model="password"
              v-bind:class="{'is-danger': passwordError !== null}"
              type="password"
              placeholder="password"
            >
          </div>
          <p v-if="passwordError" class="help is-danger">{{passwordError}}</p>
        </div>
        <button v-on:click="login" class="button is-primary">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from '@/apiConfig.js'
import { validateEmail } from '@/utils/regex.js'

export default {
  name: 'LoginPage',
  data: function () {
    return {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.userIsAuth
    }
  },
  methods: {
    login: function () {
      if (this.validateForm()) {
        fetch(`${apiUrl}/users?login=${this.email}`)
          .then(response => response.json().then(data => {
            if (this.validateUsersResponse(data)) {
              this.$store.dispatch('login', {
                role: data[0].role,
                userName: data[0].login,
              })
              this.$router.push('/')
            }
          }))
      }
    },
    validateForm: function () {
      let isValid = true;
      this.emailError = null;
      this.passwordError = null;
      if (this.email === '') {
        isValid = false;
        this.emailError = 'The field must not be empty';
      } else {
        if (!validateEmail(this.email)) {
          isValid = false;
          this.emailError = 'Enter valid email';
        }
      }
      if (this.password === '') {
        isValid = false;
        this.passwordError = 'The field must not be empty';
      }
      return isValid;
    },
    validateUsersResponse: function (data) {
      let isValid = true;
      if (!data || data.length === 0) {
        isValid = false;
        this.emailError = 'User with this email does not exist'
      } else {
        if (String(data[0].password) !== this.password) {
          isValid = false;
          this.passwordError = 'Password incorrect'
        }
      }
      return isValid;
    }
  }
}
</script>

<style scoped>
.login-form {
  text-align: left;
  margin-top: 100px;
}
.columns {
  margin: 0;
  justify-content: center;
}
</style>
