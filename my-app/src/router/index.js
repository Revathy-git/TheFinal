import Vue from 'vue'
//import VueRouter, { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import Overview from '@/views/Overview.vue'
import Dashboard from '@/components/Dashboard.vue'
import HomeScreen from '@/views/HomeScreen.vue'
import Leaderborad from '@/views/Leaderboard.vue'
import Profile from '@/views/Profile.vue'
import EditProfile from '@/views/EditProfile.vue'
import MenteeView from '@/views/MenteeView.vue'
import MentorView from '@/views/MentorView.vue'

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
    },
    {
      path: '/overview/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/overview/editprofile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/overview/mentee',
      name: 'Mentee',
      component: MenteeView
    },
    {
      path: '/overview/mentor',
      name: 'Mentor',
      component: MentorView
    }
  ]
})

export default router
