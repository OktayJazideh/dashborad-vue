import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { pinia } from './store'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
