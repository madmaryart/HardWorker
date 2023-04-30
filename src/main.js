import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import base64 from 'js-base64';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  base64,
  render: (h) => h(App),
}).$mount('#app');
