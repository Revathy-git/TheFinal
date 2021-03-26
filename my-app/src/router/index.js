import Vue from 'vue'
//import VueRouter, { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import Overview from '@/views/Overview.vue'
import Dashboard from '@/components/Dashboard.vue'
import HomeScreen from '@/views/HomeScreen.vue'
import Leaderborad from '@/views/Leaderboard.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
      
    },
    {
      path: '/overview/home',
      name: 'HomeScreen',
      component: HomeScreen
    },
    {
      path: '/overview/leaderboard',
      name: 'Leaderborad',
      component: Leaderborad
    }
  ]
})

export default router
