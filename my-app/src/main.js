import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = "true";

Vue.config.productionTip = false
Vue.prototype.$first = "aaa";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue);
