import { createRouter, createWebHistory } from 'vue-router'
import Signin from './components/Signin.vue'
/* import About from './components/About.vue' */

const routes = [
  { path: '/', component: Signin },
  /* { path: '/about', component: About } */
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router