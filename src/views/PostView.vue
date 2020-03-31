<template>
  <div v-if="error">
    <div class="error">{{error}}</div>
  </div>
  <div v-else class="container">
    <div class="columns main-page">
      <div v-if="postData" class="column is-half-desktop is-two-thirds-tablet is-full">
        <div class="title">{{postData.title}}</div>
        <div class="description">{{postData.description}}</div>
        <hr/>
        <div v-html="postData.content" class="content"></div>
        <div class="level">
          <div class="level-left time">
            {{ this.date }}
          </div>
          <div class="level-right" v-if="userIsAuth">
            <b-button
               v-if="userRole === 'reader'"
               type="is-primary"
               v-on:click="onClapClick"
               icon-pack="mdi"
               icon-left="thumb-up"
            >
              {{ postData.claps }}
            </b-button>
            <div class="buttons" v-if="userRole === 'writer' && userId === postData.userId">
              <b-button v-on:click.stop="onChangeClick" outlined type="is-primary" icon-pack="far" icon-left="edit">
                Change
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostById, postClapRequest } from '@/api/apiRequests.js'
import moment from 'moment'

export default {
  name: 'PostView',
  data() {
    return {
      postData: null,
      error: null,
    }
  },
  computed: {
    date() {
      return this.postData && this.postData.createdAt
        ? moment(this.postData.createdAt).format('MMMM Do YYYY, hh:mm')
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
  props: ['id'],
  mounted() {
    if (this.id) {
      getPostById(this.id)
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              this.postData = data
            })
          } else {
            this.error = `Unexpected error: status ${response.status}`
          }
        })
        .catch(() => {
          this.error = 'Unexpected error'
        })
    } else {
      this.error = 'Unexpected error'
    }
  },
  methods: {
    onChangeClick() {
      this.$router.push(`/post/change/${this.postData.id}`)
    },
    onClapClick() {
      postClapRequest(this.postData.id, this.postData.claps + 1)
        .then(data => {
          if (data && data.claps === this.postData.claps + 1) {
            this.postData.claps++;
          }
        });
    },
  }
}
</script>

<style scoped>
  .columns {
    justify-content: center;
    text-align: left;
    margin: 0;
  }
  .title {
    margin-top: 30px;
    text-align: center;
  }
  .time {
    font-size: 0.8rem;
    color: gray;
    margin-top: 10px;
    text-align: right;
  }
  .error {
    font-size: 2rem;
    font-weight: bold;
    margin-top: 100px;
  }
</style>
