<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logo">
       Mentorassign
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
       <button type="button" @click='clickHome()' class="btn btn-danger">Home</button><br><br>
              <a href="http://localhost:3000/calendar" tag="li" class="btn btn-danger">Calendar</a><br><br>
              <a href="http://172.24.135.111:8082/leaderboard.html" tag="li" class="btn btn-danger">LeaderBoard</a><br><br>
              <button type="button" @click='clickMenteeView()' class="btn btn-danger">Mentee View</button><br><br>
              <button type="button" @click='clickMentorView()' class="btn btn-danger">Mentor View</button><br><br>
              <button type="button" @click='clickProfile()' class="btn btn-danger">Profile</button><br><br>
                 <a href="http://localhost:3000/mail" tag="li" class="btn btn-danger">Monthly Summary</a>
     </ul>
   </Sidebar>

  <div class="Info" id="info">
    <article>

    </article>
   </div>
  </div>
</template>
<script>

import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';




export default {
 name: 'app',
  data() {

  }, 
 methods: {
       clickHome() {
           console.log(this.$route.query.page)
           this.$router.push({name: 'HomeScreen'})
       },
       clickLeaderBoard() {
           this.$router.push({name: 'Leaderborad'})
       },
       clickMentorView(){
         this.$router.push({name: 'Mentor'})
       },
       clickMenteeView(){
               this.$router.push({name: 'Mentee'})
       },
       clickProfile() {
                 this.$router.push({name: 'Profile'})
       }
   },

 components: {
   Burger,
   Sidebar
 }
}

</script>
<style>
html {
   height: 100%;
   overflow:hidden;
 }

 body {
   border: 0; margin: 0; padding: 0;
   font-family: 'Lato';
   height: 100%;
   background: rgb(101,31,87);
   background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);
 }

 .logo {
   align-self: center;
   color: #fff;
   font-weight: bold;
   font-family: 'Lato'
 }

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }

 ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: #fff;
   text-decoration: none;
   font-size: 1.5rem;
   display: block;
   padding-bottom: 0.5em;
 }
 article {
  float: middle;
  padding: 50px;
  width: 70%;
  background-color: #ffffff;
  height: 500px; 
}
</style>