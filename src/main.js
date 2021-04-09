import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'
import 'swagger-ui/dist/swagger-ui.css'
import router from './router'

createApp(App).use(router).mount('#app')
