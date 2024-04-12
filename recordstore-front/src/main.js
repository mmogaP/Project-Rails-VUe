import { createApp } from 'vue'
import App from './App.vue'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(router)

app.config.globalProperties.$axios = {
    secured: securedAxiosInstance,
    plain: plainAxiosInstance
}

app.mount('#app')