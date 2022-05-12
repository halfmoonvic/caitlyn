import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import useAuthStore from './store/auth';
import marathon from './utils/client/marathon';

async function load() {
  const user = await marathon.getUser();

  createApp(App).use(store).mount('#app');

  // can't use pinia before install
  useAuthStore().setCurrentUser(user);
}

load().catch(e => {
  console.error(e);
  document.location.href = '/login/';
});
