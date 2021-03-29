<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logo">
       EditProfile
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
   </Sidebar>

  <div class="Personal Info">

      <div class="column">
                    <div class="form-group col-md-5">
                        <label htmlFor="exampleInputEmail1">Email:</label>&nbsp;
                        <label htmlFor="exampleInputEmail1">{{emailLogin}}</label>
                        <!--<input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="email" />-->
                    </div>
      </div>
      <div class="row">
                    <div class="form-group col-md-1">
                        <label htmlFor="exampleInputAge1">Age</label>
                        <input type="text" class="form-control" v-model="age" name="age" id="age" aria-describedby="emailHelp" placeholder="age" />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="exampleRole">Role in Genesys</label>
                        <input type="text" class="form-control" v-model="job_title" name="job_title" id="job_title" aria-describedby="emailHelp" placeholder="job_title" />
                    </div>   
      </div>

      <div class="row">
                    <div class="form-group col-md-4">
                        <label htmlFor="exampleskills">skills</label>
                        <input type="text" class="form-control" v-model="skills" name="skills" id="skills" aria-describedby="emailHelp" placeholder="skills" />
                    </div>
                    <div class="form-group col-md-4">
                        <label htmlFor="exampleInterests">Interests</label>
                        <input type="text" class="form-control" v-model="interests" name="interests" id="interests" aria-describedby="emailHelp" placeholder="interests" />
                    </div>
      </div>
      <div class="row">
                    <div class="form-group col-md-4">
                        <label htmlFor="examplepersonalmail">Personalmailid</label>
                        <input type="text" class="form-control" v-model="personalMail" name="personalMail" id="personalMail" aria-describedby="emailHelp" placeholder="personalMail" />
                    </div>
                    <div class="form-group col-md-2">
                        <label htmlFor="examplePhoneno">Phoneno</label>
                        <input type="text" class="form-control" v-model="contact" name="contact" id="contact" aria-describedby="emailHelp" placeholder="contact" />
                    </div>  
      </div>
         <div class="row">
                    <div class="form-group col-md-12">
                        <input type="radio" id="Mentor" value="Mentor" v-model="role">
                        <label for="Mentor">Mentor</label>
                        &nbsp;
                        <input type="radio" id="Mentee" value="Mentee" v-model="role">
                        <label for="Mentee">Mentee</label>

                    </div>
    </div>

  </div>  
  <button type="button" @click='updateProfileInfobyId()' class="btn btn-danger">Save</button>&nbsp;
  &nbsp;
  <!--<router-link to="Mentorassign" tag="button" class="btn btn-danger">next</router-link>-->
  <button type="button" @click='assignMentor()' class="btn btn-danger">Assign Mentor</button>&nbsp;
  &nbsp;
  <router-link to="Profile" tag="button" class="btn btn-danger">Back to Profile</router-link>

 </div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import {updateProfileInfobyId, getMyMentor} from '../services/UserService';
import 'vuejs-noty/dist/vuejs-noty.css'

export default {
 name: 'app',
  mounted() {
      console.log("mounted",this.$email);
      this.first = this.$first;
      this.emailLogin = this.$email;
    },
   data() {
    return {
      first: this.$first,
      emailLogin: this.$email,
      role: "",
      age: "",
      skills: "",
      interests: "",
      personalMail: "",
      contact: "",
      job_title: ""
    }
  },
 components: {
   Burger,
   Sidebar

 }, 
 methods: {
      clickHome() {
          console.log(this.$route.query.page)
          this.$router.push({name: 'HomeScreen'})
      },
      clickLeaderBoard() {
          this.$router.push({name: 'Leaderborad'})
      },
      updateProfileInfobyId(){
          const payload = {
              firstName: this.first,
              email: this.email,
              role:this.role,
              age:this.age,
              skills:this.skills,
              interests:this.interests,
              personalMail:this.personalMail,
              contact:this.contact,
              job_title:this.job_title
          }
          this.$emit('updateUser',payload)
          //this.clearForm();
        
                   updateProfileInfobyId(payload).then(response => {
                   console.log(response);
                   //this.getAllUsers();
              });
          this.$notify({
                group: 'foo',
                title: 'Data saved'
              });
      },
      clearForm() {
          this.firstName = "";
          this.lastName = "";
          this.email = "",
          this.role="",
          this.age= "",
          this.skills= "",
          this.interests= "",
          this.personalMail= "",
          this.contact= "",
          this.job_title= "";
      },
      assignMentor(){
        const payload = {
              interests: this.interests
          }
        getMyMentor(payload).then(response => {
          console.log(response.name)
          this.$notify({
          group: 'foo',
          title: 'Mentor Assigned',
          text: response.name
        });
        })  
        //this.$vueNoty.show("Hello world!")
        //this.$store.dispatch("notify", "Hello from Vuex")
        
      }
      
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