<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logoMentee">
       EditProfile
     </div>

   </nav>


  <div class="Personal Info">

      <div class="column">
                    <div class="form-group col-md-5">
                        <label htmlFor="exampleInputEmail1"><b>Email:</b></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label htmlFor="exampleInputEmail1">{{emailLogin}}</label>
                        <!--<input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="email" />-->
                    </div>
      </div>
      <div class="row">
                    <div class="form-group col-md-2">
                        <label htmlFor="exampleInputAge1"><b>Age</b></label>
                        <input type="text" class="form-control" v-model="age" name="age" id="age" aria-describedby="emailHelp" placeholder="age" />
                    </div>
                    <div class="form-group col-md-1"></div>
                    <div class="form-group col-md-2">
                        <label htmlFor="exampleRole"><b>Role in Genesys</b></label>
                        <input type="text" class="form-control" v-model="job_title" name="job_title" id="job_title" aria-describedby="emailHelp" placeholder="job_title" />
                    </div>   
      </div>

      <div class="row">
                    <div class="form-group col-md-2">
                        <label htmlFor="exampleskills"><b>Skills</b></label>
                        <input type="text" class="form-control" v-model="skills" name="skills" id="skills" aria-describedby="emailHelp" placeholder="skills" />
                    </div>
                    <div class="form-group col-md-1"></div>
                    <div class="form-group col-md-2">
                        <label htmlFor="exampleInterests"><b>Interests</b></label>
                        <input type="text" class="form-control" v-model="interests" name="interests" id="interests" aria-describedby="emailHelp" placeholder="interests" />
                    </div>
      </div>
      <div class="row">
                    <div class="form-group col-md-2">
                        <label htmlFor="examplepersonalmail"><b>Personalmailid</b></label>
                        <input type="text" class="form-control" v-model="personalMail" name="personalMail" id="personalMail" aria-describedby="emailHelp" placeholder="personalMail" />
                    </div>
                    <div class="form-group col-md-1"></div>
                    <div class="form-group col-md-2">
                        <label htmlFor="examplePhoneno"><b>Phone No.</b></label>
                        <input type="text" class="form-control" v-model="contact" name="contact" id="contact" aria-describedby="emailHelp" placeholder="contact" />
                    </div>  
      </div>
         <div class="row">
                    <div class="form-group col-md-12">
                        <input type="radio" @change="onChange1($event)" id="Mentor" value="Mentor" v-model="role">
                        <label for="Mentor"><b>Mentor</b></label>
                        &nbsp;
                        <input type="radio" @change="onChange($event)" id="Mentee" value="Mentee" v-model="role">
                        <label for="Mentee"><b>Mentee</b></label>

                    </div>
    </div>

  </div>  
  <button type="button" @click='updateProfileInfobyId()' class="btn btn-danger">Save</button>&nbsp;
  &nbsp;
  <router-link to="Profile" tag="button" class="btn btn-danger">Back to Profile</router-link>&nbsp;&nbsp;
  <!--<router-link to="Mentorassign" tag="button" class="btn btn-danger">next</router-link>-->
  <div v-if="assignMentorCheck"/>
  <button type="button" @click='assignMentor()' class="btn btn-danger" v-else>Assign Mentor</button>
  &nbsp;&nbsp;
  

 </div>
</template>

<script>


import {updateProfileInfobyId, getMyMentor} from '../services/UserService';
import 'vuejs-noty/dist/vuejs-noty.css'
import Vue from 'vue'
Vue.prototype.$mentorAssgin = ""

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
      job_title: "",
      assignMentorCheck: true
    }
  },
 components: {
   

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
               type:'info',
                duration:7000,                
                title: 'Data saved',
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
          type:'info',
          duration:7000,
          title: 'Mentor Assigned',
          text: response.name
        });
        this.$mentorAssgin=response.name
        Vue.prototype.$mentorAssgin = response.name;
        console.log("editprofile - mentorassign", this.$mentorAssgin)
        })  
        //this.$vueNoty.show("Hello world!")
        //this.$store.dispatch("notify", "Hello from Vuex")
        
      },
      onChange(event) {
              var data = event;
              this.assignMentorCheck = false
              console.log(data);
          },
      onChange1(event) {
              var data = event;
              this.assignMentorCheck = true
              console.log(data);
          }    
      
  }
}




</script>
   <notifications group="foo" position="top center"/>
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
.vue-notification {
 
    font-size: 30px;
    padding: 20px 30px;
    margin:  0px 30px;
    color: #fff;
    background: #44a4fc;
    border-right: 5px solid #187fe7;
    border-bottom-style: ridge;
    position: auto;
    width: 700px;
    top: 0px;
    right: 0px;
}

.vue-notification-group {
    display: block;
    position: auto;
    z-index: 5000;
    width: 500px;
    left:20px;


}
.notification-title {
    font-weight: 200;
    position:auto;
}
.vue-notification-wrapper {
    position: auto;
    display: block;
    overflow: relative;
    width: 20px;
    margin: 0;
    padding: 0;
    width: 600px;
    top: 20px;
    right: 20px;
    left:0px;
}
 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }


</style>