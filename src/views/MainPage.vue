<template>
  <div class="container">
    <div class="posts-container" v-for="post in posts">
      <post-card v-bind:post="post" />
    </div>
  </div>
</template>

<script>
import { apiUrl } from '@/apiConfig.js'
import PostCard from '@/components/PostCard'

export default {
  name: 'MainPage',
  data () {
    return {
      posts: [],
    }
  },
  components: {
    PostCard
  },
  mounted () {
    fetch(`${apiUrl}/posts`)
      .then(response => {
        const res = response.json().then(data => {
          if (data && data.length !== 0) {
            this.posts = data
          }
        });
      })
  },
}
</script>

<style scoped>
.posts-container {
  display: flex;
  justify-content: center;
}
</style>
