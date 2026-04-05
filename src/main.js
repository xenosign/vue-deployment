import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createGtag } from 'vue-gtag';

const app = createApp(App);

const gtag = createGtag({
  tagId: 'G-B05TZS38KE',
  router,
});

app.use(router);
app.use(gtag);

app.mount('#app');
