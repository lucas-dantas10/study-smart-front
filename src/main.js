import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store';
import { setupTrustedTypes } from './trusted-types';

setupTrustedTypes();

createApp(App).use(router).use(store).mount('#app');
