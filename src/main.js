
import "@/bootstrap.js";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ValidationError from "@/components/ValidationError.vue";
import IconSpinner from "./components/IconSpinner.vue";

import App from './App.vue'
import router from './router'

import './assets/style.css';
import Icon from "./components/icons/Icon.vue";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("ValidationError", ValidationError)
app.component("IconSpinner", IconSpinner)
app.component("IconSGV", Icon)

app.mount('#app')
