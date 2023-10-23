
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import router from './router';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from "vuetify/iconsets/mdi";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import App from "@/App.vue"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    }
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(Toast)
app.use(router)

app.mount('#app')
