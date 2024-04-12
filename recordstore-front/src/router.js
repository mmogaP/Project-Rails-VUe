import { createRouter, createWebHistory } from 'vue-router'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'

const routes = [
  { path: '/', component: Signin },
  { path: '/signup', component: Signup  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router