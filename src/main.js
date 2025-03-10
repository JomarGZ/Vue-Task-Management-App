
import "@/bootstrap.js";
import "@/echo.js";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ValidationError from "@/components/ValidationError.vue";
import IconSpinner from "./components/IconSpinner.vue";

import App from './App.vue'
import router from './router'

import './assets/style.css';
import Icon from "./components/icons/Icon.vue";
import VueSweetalert2 from "vue-sweetalert2";
import Pagination from "./components/Pagination.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)
app.component("ValidationError", ValidationError)
app.component("PaginationComponent", Pagination)
app.component("IconSpinner", IconSpinner)
app.component("IconSVG", Icon)

app.mount('#app')
