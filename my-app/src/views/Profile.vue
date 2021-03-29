<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logo">
       My Profile
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

  <div class="Personal Info" id="info">
    <article>
      <th scope="row">Name:&emsp;{{this.firstName}}{{lastName}}</th><br>
      <th scope="row">Email:{{email}}</th>&nbsp;<br>
      <th scope="row">Role:{{role}}</th><br>
      <th scope="row">Age:{{age}}</th><br>
      <th scope="row">Role In Genesys:{{job_title}}</th><br>
      <th scope="row">Skills:{{Skills}}</th><br>
      <th scope="row">Interests:{{interests}}</th><br>
      <th scope="row">Personal Mail Id:{{personalMail}}</th><br>
      <th scope="row">Contact:{{contact}}</th><br>
    </article>
  </div>  
  <button type="button" @click='getUserById()' class="btn btn-danger">show</button>&nbsp;

  <router-link to="EditProfile" tag="button" class="btn btn-danger">EditProfile</router-link>

 </div>
</template>
<script>

import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import {getUserById } from '../services/UserService';



export default {
 name: 'app',
  data() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: '',
      //profilepic:'',
      role: '',
      age:'',
      skills:'',
      interests:'',
      personalMail:'',
      contact:'',
      job_title:''
    }
  }, 
 methods: {
      clickHome() {
          console.log(this.$route.query.page)
          this.$router.push({name: 'HomeScreen'})
      },
      clickLeaderBoard() {
          this.$router.push({name: 'Leaderborad'})
      },
    getUserById() {
      getUserById().then(response => {
        console.log("profilecheck");
        console.log(response);
        //return {response}
 
      });
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
  float: center;
  padding: 20px;
  width: 70%;
  background-color: #ffffff;
  height: 500px; 
}
</style>