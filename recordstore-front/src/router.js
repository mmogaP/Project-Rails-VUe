import { createRouter, createWebHistory } from 'vue-router'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Artists from './components/artists/Artists.vue'
import Records from './components/records/Records.vue'

const routes = [
  { path: '/', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/artist', component: Artists },
  { path: '/records', component: Records}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router