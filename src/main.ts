import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook, faUsers, faSkull, faGear, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
library.add(faBook, faUsers, faSkull, faGear, faPlus, faXmark)

createApp(App)
.use(router)
.use(pinia)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
