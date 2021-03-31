<template>
 <div id="app" class="app-class">
   <nav class="main-nav">
     <div class="logo">
       Welcome {{first}}
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
       <button type="button" @click='clickHome()' class="btn btn-danger">Home</button><br><br>
       <a href="http://localhost:3000/calendar" tag="li" class="btn btn-danger">Calendar</a><br><br>
       <a href="http://localhost:8082/leaderboard.html" tag="li" class="btn btn-danger">LeaderBoard</a><br><br>
       <button type="button" @click='clickMenteeView()' class="btn btn-danger">Mentee View</button><br><br>
       <button type="button" @click='clickMentorView()' class="btn btn-danger">Mentor View</button><br><br>
       <button type="button" @click='clickProfile()' class="btn btn-danger">Profile</button><br><br>
          <a href="http://localhost:3000/mail" tag="li" class="btn btn-danger">Monthly Summary</a>

     </ul>
   </Sidebar>

   <div class="main-div">
       <div class="left-div">
         <form>
            <div class="statustextbox">
              <label htmlFor="exampleInputEmail1">Post your status</label>
              <input type="text" class="form-control" v-model="req_sentence" name="req_sentence" id="req_sentence" aria-describedby="emailHelp" placeholder="how are you doing now" />
              <button type="button" @click='showStatus()'>Give Suggestion</button>
            </div>
          </form>
            <div v-if="show_image_preview" >
              <img v-bind:src = "previewImage" class="uploading-image" />
              <input type="file" accept="image/jpeg" @change=uploadImage>
            </div> 
            <div v-if="res_data">
              <textarea name = "response_data" v-model="res_data" id="response_data" cols="60" rows="2"></textarea>              
            </div>
            <div v-if="show_res_data">
              <button type="button" @click='showAnotherStatus()'>More Suggestion</button>
              <button type="button" @click='postUpdate()'>Post Update</button>
            </div>
            <div v-if="postResponseStatus">
              <p>Revathy</p>
            </div>
            <div v-if="postResponseStatus">
              <img v-bind:src = "postImg" width="200" height="150">              
            </div>
            <div v-if="postResponseStatus">
              <p>
                {{ postText }}
              </p>
            </div>
             <div v-if="postResponseStatus">
              <p>Mythili</p>
            </div>
            <div v-if="postResponseStatus">
              <img v-bind:src = "postImg2" width="200" height="150">              
            </div>
            <div v-if="postResponseStatus">
              <p>
                Successfully completed all tasks
              </p>
            </div>
       </div>
       <div class="right-div">
         <nav class="right-nav">
            <ul>
              <div class="right-nav-1">
                <h1 class="righth1">Goals Progress</h1>
                <p class="nocourse" v-if="courseCompleted">No goals assigned</p>
                <div id="chart" v-else>
                  <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                </div>
                
              </div>
              <button type="button" @click='getCourses()' class="ref-course-btn">RefreshGoals</button><br><br>
            </ul>

          </nav>
       </div>
     
        <section v-show="hide">
          <article>
            <!--<h1 class="statush1">Post your status</h1>
            <p>I will feeling good today</p>-->
            <form>
              <div class="statustextbox">
                <label htmlFor="exampleInputEmail1">Post your status</label>
                <input type="text" class="form-control" v-model="req_sentence" name="req_sentence" id="req_sentence" aria-describedby="emailHelp" placeholder="how are you doing now" />
                <button type="button" @click='showStatus()'>Give Suggestion</button>
              </div>
            </form>
            <div v-if="res_data">
              <textarea name="response_data" v-model="res_data" id="response_data" cols="60" rows="2"></textarea>              
            </div>
            <div v-if="show_res_data">
              <button type="button" @click='showAnotherStatus()'>More Suggestion</button>
              <button type="button" @click='postUpdate()'>Post Update</button>
            </div>
            <div v-if="postResponseStatus">
              <p>Revathy</p>
            </div>
            <div v-if="postResponseStatus">
              <img v-bind:src = "postImg" width="200" height="150">              
            </div>
            <div v-if="postResponseStatus">
              <p>
                {{ postText }}
              </p>
            </div>
             <div v-if="postResponseStatus">
              <p>Mythili</p>
            </div>
            <div v-if="postResponseStatus">
              <img v-bind:src = "postImg" width="200" height="150">              
            </div>
            <div v-if="postResponseStatus">
              <p>
                Some Text
              </p>
            </div>
          </article>
          <nav class="right-nav">
            <ul>
              <div>
                <h1 class="righth1">Goals Progress</h1>
                <p class="nocourse" v-if="courseCompleted">No goals assigned</p>
                <div id="chart" v-else>
                  <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                </div>
                
              </div>
              <button type="button" @click='getCourses()' class="ref-course-btn">RefreshGoals</button><br><br>
            </ul>

          </nav>
        
      </section>
   </div>
 <div class = "footer">
 </div>
 </div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import ApexCharts from 'vue-apexcharts'

export default {
 name: 'app1',
 mounted() {
      console.log("mounted",this.$first);
      this.first = this.$first;
    },
 data() {
   return {
      status: '',
      hide : false,
      postImg:'',
      postImg2:'',
      postText:'',
      show_res_data:'',
      req_sentence: '',
      response_text: '',
      res_data: '',
      postResponseStatus: false,
      previewImage:null,
      show_image_preview:true,
      first: this.$first,
      courseCompleted: true,
      series: [2, 3, 2],
          chartOptions: {
            chart: {
              width: 380,
              type: 'donut',
              dropShadow: {
                enabled: true,
                color: '#111',
                top: -1,
                left: 3,
                blur: 3,
                opacity: 0.2
              }
            },
            stroke: {
              width: 0,
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      showAlways: true,
                      show: true
                    }
                  }
                }
              }
            },
            labels: ["Done", "In Progress", "Not Started"],
            dataLabels: {
              dropShadow: {
                blur: 3,
                opacity: 0.8
              }
            },
            fill: {
            type: 'pattern',
              opacity: 1,
              pattern: {
                enabled: true,
                style: ['verticalLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
              },
            },
            states: {
              hover: {
                filter: 'none'
              }
            },
            theme: {
              palette: 'palette2'
            },
            title: {
              text: ""
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
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
      clickProfile() {
          this.$router.push({name: 'Profile'})
      },
      getCourses(){
        
        this.courseCompleted=false
        //call api to refresh the window
        //this.$emit('getCourseDetails')
      },
      gotoTeams(){
       // this.$router.push({"name: 'toteams'"})        
      },
      clickMenteeView(){
        this.$router.push({name: 'Mentee'})
      },
      clickMentorView(){
        this.$router.push({name: 'Mentor'})
      },
      async showStatus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        var raw = JSON.stringify({
          "sentence": this.req_sentence
        });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        const res = await fetch("http://fce-u0263.us.int.genesyslab.com:5070/confidence", requestOptions)
        console.log(res); 
        const data = await res.json();
        this.res_data = data.message[0];
        this.show_res_data = true;
      },
      async showAnotherStatus(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        var raw = JSON.stringify({
          "sentence": this.req_sentence
        });
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        const res = await fetch("http://fce-u0263.us.int.genesyslab.com:5070/confidence", requestOptions)
        console.log(res); 
        const data = await res.json();
        this.res_data = data.message[1];
        this.show_res_data = true;
      },
      postUpdate(){
        this.postResponseStatus = true; 
        this.postText = this.res_data
        this.postImg = require('../images/img_girl.jpg');
        this.postImg2 = require('../images/img_girl2.jpg');
        this.res_data = '';
        this.show_res_data = false;
        this.show_image_preview = false;
      },
      uploadImage(e){
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e =>{
            this.previewImage = e.target.result;
            console.log(this.previewImage);
        };
      }
  },
 components: {
   Burger,
   Sidebar,
   apexchart: ApexCharts
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
   /*background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);*/
 }

 .logo {
   align-self: center;
   color: #fff;
   font-weight: bold;
   font-family: 'Lato';
   font-size: 2rem;
 }

 .app-class{
   height: 100%;
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
.left-nav {
  float: left;
  width: 70%;
  height: 500px; 
  /* background: #ccc; */
  padding: 20px;
}
.left-div {
  float:left;
  /* background: rgb(235, 224, 224); */
  background:white;
  width: 60%;
  height:1000px;
  border-width: 1cm;
  border-block-start-color: steelblue;
  padding-right: 2cm;
}

.right-div {
  float:right;
  background: #ccc;
  /* background: rgb(245, 205, 205); */
  width: 40%;
  height:1000px;
  border-width: 1cm;
  border-block-start-color: steelblue;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background:  rgb(101,31,87);
  color: white;
  text-align: center;
}

.statush1{
  text-align: left;
  /*text-transform: uppercase;*/
  color: #4CAF50;
}

.righth1{
   text-align: left;
   font-size: 1.5rem;
   color: #4CAF50;
}

.right-nav-1 {
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 3px 2px;
  cursor: pointer;
  position: absolute;
  right: 10%
}

.ref-course-btn{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 3px 2px;
  cursor: pointer;
  position: absolute;
  top: 55%;
  right: 20%
}
/* .uploading-image{
  width: 200px;
  height: 150px;
} */

</style>