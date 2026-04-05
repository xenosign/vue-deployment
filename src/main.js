import { createApp } from 'vue';
import App from './App.vue';
import { createGtag } from 'vue-gtag';

const app = createApp(App);

const gtag = createGtag({
  tagId: 'G-B05TZS38KE',
});

app.use(gtag);

app.mount('#app');
