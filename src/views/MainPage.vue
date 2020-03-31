<template>
  <div class="main-page-container">
  <div class="container">
    <div class="columns main-page">
      <div class="column is-half-desktop is-two-thirds-tablet is-full">
        <div class="field">
           <b-switch @input="changeTileView" v-model="tileView">
               Tile view
           </b-switch>
       </div>
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
        <div v-if="!tileView" class="posts-container" v-for="post in posts">
          <post-card v-bind:post="post" @loadPosts="loadPosts" />
        </div>
        <b-pagination
            :total="totalPosts"
            :current="page"
            :per-page="postsPerPage"
            @change="pageChange"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
        >
        </b-pagination>
      </div>
    </div>
    <div v-if="tileView" v-masonry origin-left="true" transition-duration="1s" item-selector=".item">
        <div v-masonry-tile class="item" v-for="(post, index) in posts">
           <post-card :tileView="tileView" :post="post" @loadPosts="loadPosts" />
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { apiUrl } from '@/apiConfig.js'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/api/apiRequests.js'

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
      page: 1,
      totalPosts: 0,
      postsPerPage: 10,
      tileView: false
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
      getPosts(this.page, this.postsPerPage)
        .then(data => {
          if (data.posts && data.posts.length !== 0) {
            this.posts = data.posts
          }
          if (data.totalPosts) {
            this.totalPosts = data.totalPosts
          }
        });
    },
    pageChange(page) {
      this.page = page;
      this.loadPosts()
    },
    changeTileView(isTile) {
      this.page = 1;
      if (isTile) {
        this.postsPerPage = 30;
      } else {
        this.postsPerPage = 10;
      }
      this.loadPosts()
    }
  }
}
</script>

<style scoped>
.new-post-button {
  margin-bottom: 10px;
}
.main-page {
  margin: 0;
  display: flex;
  justify-content: center;
}
.main-page-container {
  min-height: 94vh;
  background: #f3f3f3;
}
</style>
