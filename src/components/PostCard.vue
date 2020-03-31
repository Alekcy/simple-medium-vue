<template>
  <div class="box" :class="tileView ? 'post-card-tile' : 'post-card' " v-on:click="onCardClick">
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
           v-on:click.stop="onClapClick"
           icon-pack="mdi"
           icon-left="thumb-up"
        >
          {{ claps }}
        </b-button>
        <div class="buttons" v-if="!tileView && userRole === 'writer' && userId === post.userId">
          <b-button v-on:click.stop="onChangeClick" outlined type="is-primary" icon-pack="far" icon-left="edit">
            Change
          </b-button>
          <b-button v-on:click.stop="onDeleteConfirm" outlined type="is-danger" icon-pack="far" icon-left="trash-alt">
            Delete
          </b-button>
        </div>
      </div>
    </div>
    <div class="buttons" v-if="tileView && userRole === 'writer' && userId === post.userId">
      <b-button v-on:click.stop="onChangeClick" outlined type="is-primary" icon-pack="far" icon-left="edit">
        Change
      </b-button>
      <b-button v-on:click.stop="onDeleteConfirm" outlined type="is-danger" icon-pack="far" icon-left="trash-alt">
        Delete
      </b-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { deletePost, postClapRequest } from '@/api/apiRequests.js'

export default {
  name: 'PostCard',
  props: ['post', 'tileView'],
  data() {
    return {
      claps: this.post && this.post.claps
    }
  },

  watch: {
    post(newVal, oldVal) {
      this.claps = newVal.claps
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
    onCardClick(e) {
      this.$router.push(`/post/${this.post.id}`)
    },
    onChangeClick() {
      this.$router.push(`/post/change/${this.post.id}`)
    },
    onClapClick() {
      postClapRequest(this.post.id, this.claps + 1)
        .then(data => {
          if (data && data.claps === this.claps + 1) {
            this.claps++;
          }
        });
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
      deletePost(this.post.id)
        .then(() => {
          this.$buefy.toast.open('Post deleted')
          this.$emit('loadPosts')
        })
    }
  }
}
</script>

<style>
.post-card {
  margin: 10px 0;
  border-radius: 1px;
  width: 100%;
  cursor: pointer;
}
.post-card-tile {
  margin: 10px;
  border-radius: 1px;
  width: 300px;
  cursor: pointer;
}
.post-card:hover, .post-card-tile:hover {
  background: #efefef;
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
