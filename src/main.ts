import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {optionUrl} from '@/utils/config';

import VueScroller from 'vue-scroller';


Vue.use(VueScroller);

Vue.config.productionTip = false;
// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:5010',
// }))

import io from 'socket.io-client';

Vue.prototype.$socket = io(optionUrl);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
