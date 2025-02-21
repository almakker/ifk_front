import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import './assets/styles/tailwind.css'

const app = createApp(App)
app.use(Quasar)
app.mount('#app')
