import { createApp } from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';
import router from './router';

const app = createApp(App);

app.use(
  VueGtag,
  {
    config: { id: 'G-B05TZS38KE' },
  },
  router,
);

app.mount('#app');
