import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.use(Vuex)

let notifier = new Vue()

// save our state (isPanel open or not) 
export const store = Vue.observable({
  isNavOpen: false
});

// We call toggleNav anywhere we need it in our app
export const mutations = {
  toggleNav() {
      store.isNavOpen = !store.isNavOpen
  }
};

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
      notify(context, payload){
        console.log("notify",payload)
        notifier.$notify(payload)
    }
  },
  modules: {
  }
})
