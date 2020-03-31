<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third-desktop is-two-thirds-tablet is-full login-form">
          <b-field
            label="Username (email)"
            v-bind:type="{'is-danger': emailError !== null}"
            :message="emailError"
          >
             <b-input type="email" v-model="email">
             </b-input>
         </b-field>
         <b-field
           label="Password"
           v-bind:type="{'is-danger': passwordError !== null}"
           :message="passwordError"
         >
            <b-input type="password" v-model="password">
            </b-input>
        </b-field>
        <div class="login-button-container">
          <b-button v-on:click="login" expanded type="is-primary login-button">Log In</b-button>
        </div>
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
    login () {
      if (this.validateForm()) {
        fetch(`${apiUrl}/users?login=${this.email}`)
          .then(response => response.json().then(data => {
            if (this.validateUsersResponse(data)) {
              this.$store.dispatch('login', data[0])
              this.$router.push('/')
            }
          }))
      }
    },
    validateForm () {
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
    validateUsersResponse (data) {
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
.login-button-container {
  text-align: center;
}
</style>
