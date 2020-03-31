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
        <b-button
           v-if="userRole === 'reader'"
           type="is-primary"
           v-on:click="onClapClick"
           icon-pack="mdi"
           icon-left="thumb-up"
        >
          {{ claps }}
        </b-button>
        <div class="buttons" v-if="userRole === 'writer' && userId === post.userId">
          <b-button v-on:click="onChangeClick" outlined type="is-primary" icon-pack="far" icon-left="edit">
            Change
          </b-button>
          <b-button v-on:click="onDeleteConfirm" outlined type="is-danger" icon-pack="far" icon-left="trash-alt">
            Delete
          </b-button>
        </div>
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
      return this.$store.state.user && this.$store.state.user.role
    },
    userId() {
      return this.$store.state.user && this.$store.state.user.id
    }
  },
  methods: {
    onChangeClick() {
      this.$router.push(`/post/change/${this.post.id}`)
    },
    onClapClick() {
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
    },
    onDeleteConfirm() {
      this.$buefy.dialog.confirm({
        title: 'Deleting post',
        message: 'Are you sure you want to <b>delete</b> your post?',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deletePost()
      })
    },
    deletePost() {
      fetch(`${apiUrl}/posts/${this.post.id}`, {method: 'DELETE'})
      .then(() => this.$buefy.toast.open('Post deleted'))
    }
  }
}
</script>

<style>
.post-card {
  margin: 10px 0;
  border-radius: 1px;
  width: 100%;
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

</style>
