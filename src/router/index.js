import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import CreateChangePost from '@/views/CreateChangePost.vue'
import PostView from '@/views/PostView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/post/create',
    name: 'Create post',
    component: CreateChangePost
  },
  {
    path: '/post/change/:id',
    name: 'Change post',
    component: CreateChangePost,
    props: true
  },
  {
    path: '/post/:id',
    name: 'Post View',
    component: PostView,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
