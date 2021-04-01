<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logoMentee">
       Mentee Progress
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
   
   <section>
          
            <!--<h1>Your Mentees</h1>-->
            <br>
            <tr>
              <div class="card">
                <!--<img src="img1.jpg" alt="Girl in a jacket" style="width:100%">-->
                <div class="container">
                  <h4><b>Revathy E</b></h4> 
                  <p>Software Engineer</p> 
                  <label for="file"><b>Goal Completion progress:</b></label>&nbsp;&nbsp;
                  <progress id="file" value="32" max="100"> 32% </progress><br>
                  <label><b>Your next appointment with Mentor: </b>Tomorrow at 11 am</label><br>
                  <label><b>Total courses assigned: </b>4</label><br>
                  <label><b>Total courses completed: </b>2</label><br>
                  <div>
                    
                        <div>
                          <a class="btn btn-success me-2" href="https://teams.microsoft.com/l/chat/0/0?users=revathy.elankumaran@genesys.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20revathy" target="_blank" role="button">Connect with your MENTEE🙂<i class="fas fa-download"></i></a> 
                        </div>
                  </div>
                </div>
              </div>
            </tr>
            <br>
            <!--<tr>
              <div class="card">
                
                <div class="container">
                  <h4><b>Manonmani S</b></h4> 
                  <p>Associate Software Engineer</p> 
                  <label for="file">Goal Completion progress:</label>
                  <progress id="file" value="70" max="100"> 32% </progress><br>
                  <label><b>Your next appointment with Mentor: </b>Coming tomorrow at 11 am</label><br>
                  <label><b>Total courses assigned: </b>7</label><br>
                  <label><b>Total courses completed: </b>2</label><br>
                </div>
              </div>
            </tr> -->
            <br><br>
              <!--<nav class="click-chat">
                <ul>
                  <div>
                    <h1 class="chat">Connecting people !!</h1>
                        <div class="text-center">
                          <a class="btn btn-success me-2" href="https://teams.microsoft.com/l/chat/0/0?users=revathy.elankumaran@genesys.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20revathy" target="_blank" role="button">Connect with your MENTEE🙂<i class="fas fa-download"></i></a> 
                        </div>
                  </div>
                </ul>

          </nav>   -->
   </section>       
 </div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';

export default {
 name: 'app',
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

  .chat{
    text-align: middle;
    font-size: 1.5rem;
    color: #290320;
  }
  .click-chat{
    float:left ;
    width: 20%;
    height: 100px; /* only for demonstration, should be removed */
    background: #ccc;
    padding: 20px;
  }

 section::after {
  content: "";
  display: table;
  clear: both;
}

.right-nav {
  float: right;
  width: 30%;
  height: 400px; /* only for demonstration, should be removed */
  background: #ccc;
  padding: 20px;
}

/* Style the list inside the menu */
nav ul {
  list-style-type: none;
  padding: 0;
}

article1 {
  float: center;
  padding: 20px;
  width: 90%;
  background-color: #f1f1f1;
  height: 700px; /* only for demonstration, should be removed */
}

.statush1{
  text-align: left;
  //text-transform: uppercase;
  color: #4CAF50;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 250%;
  background-color: #ffe6e6;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}
</style>