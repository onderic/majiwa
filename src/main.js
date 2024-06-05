import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "preline/preline";
import axios from 'axios';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

axios.defaults.baseURL = 'http://localhost:3002'; 
app.config.globalProperties.$axios = axios;


app.mount('#app')
