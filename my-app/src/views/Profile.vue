<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logoMentee">
       My Profile
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
        <button type="button" @click='clickHome()' class="btn btn-danger">Home</button><br><br>
       <a href="http://localhost:3000/calendar" tag="li" class="btn btn-danger">Calendar</a><br><br>
       <a href="http://localhost:8082/leaderboard.html" tag="li" class="btn btn-danger">LeaderBoard</a><br><br>
       <!--<button type="button" @click='clickMenteeView()' class="btn btn-danger">Mentee View</button><br><br>-->
       <button type="button" @click='clickMentorView()' class="btn btn-danger">Mentor View</button><br><br>
       <button type="button" @click='clickProfile()' class="btn btn-danger">Profile</button><br><br>
          <a href="http://localhost:3000/mail" tag="li" class="btn btn-danger">Monthly Summary</a>
     </ul>
   </Sidebar>

   <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Personal Info</h1>

  <div class="Personal Info" id="info">
    <!-- <article> -->
      <div class="personal_div">
      <table class="personal_table">
      <tr>
      <th scope="row">Name:&emsp;</th><th>{{first}}</th></tr>
      <tr>
      <th scope="row">Email:</th><th>{{emailLogin}}</th></tr>
      <tr>
      <th scope="row">Role:</th>
      <th v-if="displayRole"></th>
      <th v-else>{{role}}</th></tr>
      <tr>
      <th scope="row">Age:</th>
      <th v-if="displayAge"></th>
      <th v-else>{{age}}</th></tr>
      <tr>
      <th scope="row">Role In Genesys:</th>
      <th v-if="displayRoleInGenesys"></th>
      <th v-else>{{job_title}}</th></tr>
      <tr>
      <th scope="row">Skills:</th>
      <th v-if="displaySkills"></th>
      <th v-else>{{skills}}</th></tr>
      <tr>
      <th scope="row">Interests:</th>
      <th v-if="displayInterests"></th>
      <th v-else>{{interests}}</th></tr>
      <tr>
      <th scope="row">Personal Mail Id:</th>
      <th v-if="displayPersonalEmail"></th>
      <th v-else>{{personalMail}}</th></tr>
      <tr>
      <th scope="row">Contact:</th>
      <th v-if="displayContact"></th>
      <th v-else>{{contact}}</th></tr>
      <tr v-if="mentorAssgined">
      </tr>
      <tr v-else>
      <th scope="row">Mentor:</th>
      <th>{{mentor}}</th>
      </tr>
      </table>
      </div>
    <!-- </article> -->
  </div>  
 <div class="buttonStyle">
  <!--<button type="button" @click='getUserById()' class="btn btn-danger">show</button>&nbsp;-->
  <router-link to="EditProfile" tag="button" class="btn btn-danger">EditProfile</router-link>
 </div>
 </div>
</template>
<script>

import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import {getUserById } from '../services/UserService'


export default {
 name: 'app',
 mounted() {
      //Vue.prototype.$first = this.email.split(".")[0];
      //Vue.prototype.$email = this.email;
      console.log("mounted",this.$email);
      this.first = this.$first;
      this.emailLogin = this.$email;
      console.log("mounted",this.first);

      this.mentor = this.$mentorAssgin
      if(this.mentor != ''){
        this.mentorAssgined = false
      }
      this.getUserById()
    },
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
      job_title:'',
      first: this.$first,
      emailLogin: this.$email,
      displayRole:true,
      displayAge:true,
      displayRoleInGenesys:true,
      displaySkills:true,
      displayInterests:true,
      displayPersonalEmail:true,
      displayContact:true,
      mentorAssgined: true,
      mentor: ''
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
      clickMenteeView(){
              this.$router.push({name: 'Mentee'})
            },
      clickMentorView(){
        this.$router.push({name: 'Mentor'})
      },
    getUserById() {
      getUserById(this.first).then(response => {
        console.log("profilecheck",response);
        this.firstName=response[0].firstname;
        this.lastName=response[0].lastname;
        this.email=response[0].email;
        this.role=response[0].role;
        this.age=response[0].age;
        this.skills=response[0].skills;
        this.interests=response[0].interests;
        this.personalMail=response[0].personalmail;
        this.contact=response[0].contact;
        this.job_title=response[0].job_title; 
        //return (this.firstname);
        this.displayRole = false
        this.displayAge = false
        this.displayRoleInGenesys = false
        this.displaySkills = false
        this.displayInterests = false
        this.displayPersonalEmail = false
        this.displayContact = false
        console.log("sdsdddsf",this.role)
      })
    }
  },
  /*beforeMount(){
    this.first = this.$first;
    console.log("beforemount", this.$first)
    console.log("beforemount", this.$mentorAssgin)
    this.mentor = this.$mentorAssgin
    if(this.mentor != ''){
      this.mentorAssgined = false
    }
    this.getUserById()
  },*/

 components: {
   Burger,
   Sidebar
 },
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
     background-image: url('../images/background.jpg');
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
.personal_div{
  display: flex;
  justify-content: center;
}
.personal_table{
  align-self: center;
  background-color: slategray;
  border-radius: 3px;
  width:40%;
  font-size: 25px;
  color: black;
  background: rgba(255,255,255,0.12);
  text-align: left;
}
.personal_table tr{
  text-align: left;
}
.personal_table tr:nth-child(even) {
    background: rgba(192, 191, 191, 0.12);
    /* opacity: 0.2; */
}

.personal_table tr th {
  width:50%
}

.buttonStyle {
  display: flex;
  justify-content: center;
  align-self: center;
  padding-top: 5%;
  padding-right:2%
}


</style>