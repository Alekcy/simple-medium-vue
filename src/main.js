import Vue from 'vue'
import Buefy from 'buefy'
import {VueMasonryPlugin} from 'vue-masonry';
import 'buefy/dist/buefy.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(VueMasonryPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
