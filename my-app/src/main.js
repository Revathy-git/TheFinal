import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios';
import vueNoty from 'vuejs-noty'
import tailvue from 'nuxt-tailvue'
import Notifications from 'vue-notification'
import VuePassword from 'vue-password'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = "true";

Vue.config.productionTip = false
Vue.prototype.$first = "aaa";
Vue.prototype.$email = "";

Vue.component(VuePassword)

new Vue({
  router,
  store,
  vueNoty,
  tailvue,
  VuePassword,
  render: h => h(App),
}).$mount('#app')
Vue.use(Notifications)
Vue.use(BootstrapVue);
