import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'virtual:windi.css'
import router from './router.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
