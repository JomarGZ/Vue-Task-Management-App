
import "@/bootstrap.js";
import './assets/style.css';

import "@/echo.js";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ValidationError from "@/components/ValidationError.vue";
import IconSpinner from "./components/IconSpinner.vue";

import App from './App.vue'
import router from './router'

import Icon from "./components/icons/Icon.vue";
import VueSweetalert2 from "vue-sweetalert2";
import Pagination from "./components/Pagination.vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
 });
app.use(router)
app.use(VueApexCharts)
app.use(VueSweetalert2)
app.component("ValidationError", ValidationError)
app.component("PaginationComponent", Pagination)
app.component("IconSpinner", IconSpinner)
app.component("IconSVG", Icon)

app.mount('#app')
