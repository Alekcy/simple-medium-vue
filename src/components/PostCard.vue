<template>
  <div class="box post-card">
    <div class="post-title">
      {{post.title}}
    </div>
    <div class="post-content">
      {{post.description}}
    </div>
    <div class="level">
      <div class="level-left date-block">
        {{ date }}
      </div>
      <div class="level-right" v-if="userIsAuth">
        <b-button v-if="userRole === 'reader'" v-on:click="onClapClick" icon-pack="mdi" icon-left="thumb-up">
          {{ claps }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { apiUrl } from '@/apiConfig.js'

export default {
  name: 'PostCard',
  props: ['post'],
  data() {
    return {
      claps: this.post && this.post.claps
    }
  },
  computed: {
    date() {
      return this.post && this.post.createdAt
        ? moment(this.post.createdAt).format('MMMM Do YYYY, hh:mm')
        : ''
    },
    userIsAuth() {
      return this.$store.state.userIsAuth
    },
    userRole() {
      return this.$store.state.userRole
    }
  },
  methods: {
    onClapClick: function () {
      fetch(`${apiUrl}/posts/${this.post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          claps: this.claps + 1
        })
      })
      .then(response => response.json().then(data => {
        if (data && data.claps === this.claps + 1) {
          this.claps++;
        }
      }));
    }
  }
}
</script>

<style>
.post-card {
  margin: 5px;
  border-radius: 1px;
}
.post-title {
  font-weight: bold;
  font-size: 1.2rem;
  text-align: left;
}
.post-content {
  text-align: left;
  margin: 10px 0;
}
.date-block {
  font-size: 0.8rem;
  color: gray;
}
@media (min-width: 1200px) {
  .post-card {
    width: 40%;
  }
}
@media (min-width: 800px) and (max-width: 1200px) {
  .post-card {
    width: 60%;
  }
}
@media (max-width: 800px) {
  .post-card {
    width: 100%;
  }
}
</style>
