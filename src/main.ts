import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import router from './router';

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import App from "@/App.vue"

const app = createApp(App)

app.use(createPinia())
app.use(Toast)
app.use(router)

app.mount('#app')
