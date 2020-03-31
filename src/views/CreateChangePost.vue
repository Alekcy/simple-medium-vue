<template>
  <div v-if="error">
    <div class="error">{{error}}</div>
  </div>
  <div v-else>
    <div class="container">
      <div class="columns">
        <div class="column is-two-third-desktop is-two-thirds-tablet is-full">
          <div class="post-id" v-if="id">Change post: {{id}}</div>
          <b-field
            label="Title"
            v-bind:type="{'is-danger': titleError !== null}"
            :message="titleError"
          >
            <b-input type="text" v-model="postData.title" />
          </b-field>
          <b-field
            label="Description"
            v-bind:type="{'is-danger': descriptionError !== null}"
            :message="descriptionError"
          >
           <b-input maxlength="150" type="textarea" v-model="postData.description" />
          </b-field>
          <div id="editorContainer" />
          <div class="level">
            <div class="level-left">
              <b-button v-on:click="savePost" expanded type="is-primary save-button">Save</b-button>
            </div>
            <div class="level-right" v-if="type === 'change'">
              <b-button v-on:click="onDeleteConfirm" type="is-danger">Delete</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createEditor } from 'vueditor'
import { apiUrl } from '@/apiConfig.js'
import 'vueditor/dist/style/vueditor.min.css'
import moment from 'moment'
import { getPostById, createPost, changePost } from '@/api/apiRequests.js'

export default {
  name: 'CreateChangePost',
  props: ['id'],
  data () {
    return {
      postData: {
        title: '',
        description: '',
        content: ''
      },
      error: null,
      editor: null,
      type: 'create',
      titleError: null,
      descriptionError: null,
    }
  },
  mounted () {
    this.createEditor();
    if (this.id) {
      this.type = 'change';
      this.loadPost();
    };
  },
  methods: {
    createEditor() {
      this.editor = createEditor('#editorContainer', {
         toolbar: [
           'removeFormat', 'undo', '|', 'elements', 'foreColor', 'backColor', 'divider',
           'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
           'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
           'insertOrderedList', 'insertUnorderedList'
         ],
         uploadUrl: '',
         id: '',
         classList: []
      });
    },
    loadPost() {
      getPostById(this.id)
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              this.postData = data
              if (data.content) this.editor.setContent(data.content)
            })
          } else {
            this.error = `Unexpected error: status ${response.status}`
          }
        })
        .catch(() => {
          this.error = 'Unexpected error'
        })
    },
    savePost() {
      if (this.validateForm()) {
        if (this.type === 'create') {
          createPost({
            ...this.postData,
            content: this.editor.getContent(),
            userId: this.$store.state.user.id,
            createdAt: moment(),
            updatedAt: moment(),
            claps: 0,
          }).then(response => {
              if (response.status === 201) {
                response.json().then(data => {
                  if (data.id) this.$router.push(`/post/${data.id}`)
                })
              }
            })
        } else if (this.type === 'change' && this.postData.id) {
          changePost(
            this.id, {
            ...this.postData,
            content: this.editor.getContent(),
            updatedAt: moment(),
          }).then(response => {
              if (response.status === 200) {
                this.$router.push(`/post/${this.id}`)
              }
            })
        }
      }
    },
    validateForm () {
      let isValid = true;
      this.titleError = null;
      this.descriptionError = null;
      if (this.postData.title === '') {
        isValid = false;
        this.titleError = 'The field must not be empty';
      }
      if (this.postData.description === '') {
        isValid = false;
        this.descriptionError = 'The field must not be empty';
      }
      return isValid;
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
      fetch(`${apiUrl}/posts/${this.id}`, {method: 'DELETE'})
      .then(() => {
        this.$buefy.toast.open('Post deleted')
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
  .level {
    margin: 20px 0;
  }
  .columns {
    text-align: left;
    justify-content: center;
    margin: 0;
  }
  .error {
    font-size: 2rem;
    font-weight: bold;
    margin-top: 100px;
  }
  .post-id {
    margin: 20px 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .save-button {
    width: 300px;
  }
</style>
