<template>
  <div class="container">
    <div class="columns main-page">
      <div class="column is-half-desktop is-two-thirds-tablet is-full">
        <router-link to="/post/create">
          <b-button
            v-if="userIsAuth && userRole === 'writer'"
            class="new-post-button"
            type="is-info"
            icon-pack="fas"
            icon-left="plus"
            expanded
          >
            Add new post
          </b-button>
        </router-link>
        <div class="posts-container" v-for="post in posts">
          <post-card v-bind:post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl } from '@/apiConfig.js'
import PostCard from '@/components/PostCard'

export default {
  name: 'MainPage',
  computed: {
    userIsAuth() {
      return this.$store.state.userIsAuth
    },
    userRole() {
      return this.$store.state.user && this.$store.state.user.role
    },
  },
  data () {
    return {
      posts: [],
    }
  },
  components: {
    PostCard
  },
  mounted() {
    this.loadPosts()
  },
  methods: {
    loadPosts() {
      fetch(`${apiUrl}/posts`)
        .then(response => {
          const res = response.json().then(data => {
            if (data && data.length !== 0) {
              this.posts = data
            }
          });
        })
    }
  }
}
</script>

<style scoped>
.main-page {
  margin: 0;
  display: flex;
  justify-content: center;
}

</style>
