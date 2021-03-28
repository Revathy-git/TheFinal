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

  <div class="Personal Info">
      <th scope="row">Name:&emsp;{{firstName}}{{lastName}}</th><br>
      <th scope="row">Email:{{email}}</th>&nbsp;<br>

      <th scope="row">Age:{{age}}</th><br>
      <th scope="row">Role In Genesys:{{role}}</th><br>
      <th scope="row">Skills:{{Skills}}</th><br>
      <th scope="row">Interests:{{interests}}</th><br>
      <th scope="row">Personal Mail Id:{{personalMail}}</th><br>
      <th scope="row">Contact:{{contact}}</th><br>
  </div>  
  <router-link to="EditProfile" tag="button" class="btn btn-danger">EditProfile</router-link>

 </div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';

export default {
 name: 'app',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      //profilepic:'',
      age:'',
      role: '',
      skills:'',
      interests:'',
      personalMail:'',
      contact:''
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
      getProfileInfo () {
        console.log(this.firstName)
        console.log(this.lastName)
        console.log(this.email)
        console.log(this.age)
        console.log(this.role)
        console.log(this.skills)
        console.log(this.interests)
        console.log(this.personalMail)
        console.log(this.contact)
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
</style>