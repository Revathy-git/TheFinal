<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Login</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputEmail1">First Name</label>
                        <input type="text" class="form-control" v-model="firstName" name="firstname" id="firstname" aria-describedby="emailHelp" placeholder="First Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="exampleInputPassword1">Last Name</label>
                        <input type="text" class="form-control" v-model="lastName" name="lastname" id="lastname" placeholder="Last Name" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="form-group col-md-12">
                        <input type="radio" id="Mentor" value="Mentor" v-model="role">
                        <label for="Mentor">Mentor</label>
                        &nbsp;
                        <input type="radio" id="Mentee" value="Mentee" v-model="role">
                        <label for="Mentee">Mentee</label>

                    </div>
                </div> -->
                <button type="button" @click='createUser()' class="btn btn-danger">SignUp</button>&nbsp;
                <button type="button" @click='loginUser()' class="btn btn-danger">Login</button>
                <!--<router-link to="/overview/home" tag="button" class="btn btn-danger">Login</router-link>-->
                
            </form>
        </div>
    </div>
    </div>
</template>

<script>

import Vue from "vue"


export default {
  name: 'CreateUser',
  beforeDestroy() {
      Vue.prototype.$first = this.firstName;
      console.log("destry",this.$first);
    },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    }
  },
  methods: {
      loginUser(){
          console.log(this.firstName)
          this.$first = this.firstName
          console.log(this.$first)
           /*const payload = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              role: this.role
          }*/
          //this.$emit('createUser', payload)
          this.$router.push({name: 'HomeScreen'})
      },
      createUser() {
          console.log(this.firstName)
          /*const payload = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              role: this.role
          }*/
          //this.$emit('createUser', payload)
          this.clearForm();
          this.$router.push({name: 'HomeScreen'})
      },
      clearForm() {
          this.firstName = "";
          this.lastName = "";
          this.email = "";
      }
  }
}
</script>