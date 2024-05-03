import { createApp } from 'vue'
import './index.css'
import './style.css'
import App from './App.vue'
import store from "./store";
import router from "./router";
import CKEditor from '@ckeditor/ckeditor5-vue';

localStorage.theme = 'light'

createApp(App)
  .use(store)
  .use(router)
  .use(CKEditor)
  .mount('#app')
