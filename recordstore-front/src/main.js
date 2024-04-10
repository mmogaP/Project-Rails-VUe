// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/tailwind.css'
import Vueaxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios/index.js'

Vue.config.productionTip = false

Vue.use(Vueaxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
