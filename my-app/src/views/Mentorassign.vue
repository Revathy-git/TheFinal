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
       <button type="button" @click='clickNotifications()' class="btn btn-danger">Notifications</button><br><br>
       <button type="button" @click='clickLeaderBoard()' class="btn btn-danger">Leaderborad</button><br><br>
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