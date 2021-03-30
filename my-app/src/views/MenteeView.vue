<template>
 <div id="app">
   <nav class="main-nav">
     
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
       <button type="button" @click='clickHome()' class="btn btn-danger">Home</button><br><br>
              <a href="http://localhost:3000/calendar" tag="li" class="btn btn-danger">Calendar</a><br><br>
              <a href="http://172.24.135.111:8082/leaderboard.html" tag="li" class="btn btn-danger">LeaderBoard</a><br><br>
              <button type="button" @click='clickMenteeView()' class="btn btn-danger">Mentee View</button><br><br>
              <button type="button" @click='clickProfile()' class="btn btn-danger">Profile</button><br><br>
                 <a href="http://localhost:3000/mail" tag="li" class="btn btn-danger">Monthly Summary</a>
     </ul>
   </Sidebar>

   <div crossorigin="anonymous">
        <section>
          <div class = "article">
            <div v-if="courseInProgress" crossorigin="anonymous">
              <h1 class="title">Goals Assigned</h1>
              <!--<h2>All Goals</h2>
              <ul>
                  <div class="text1"><li class ="text1" v-for="task in tasklist" v-bind:key="task" v-text="task.description"></li></div>
              </ul>-->
              <h2 class="subtitle">All goals</h2>
              <ul>
                  <li class="text1" v-for="task in inCompletedlist" v-bind:key="task">{{ task.description }}  
                  <!--<button @click="startProgress(task)" v-if="changebutton">StartProgress</button>
                  <button class="changebutton" v-else>StartProgress</button>-->
                  <button @click="toggle(task)">Mark as finished</button></li>
              </ul>
              <h2 class="subtitle">All complete goals</h2>
              <ul>
                  <li class="text1" v-for="task in Completedlist" v-bind:key="task">{{ task.description }}  <button @click="toggle(task)">Mark as unfinished</button></li>
              </ul>
              <button type="button" class="button1" @click='getQuestions()'>Take Assessment</button>
            </div>
            <div v-else>
              <h1>Final Review</h1>
              <tr v-for="item in rowData" v-bind:key="item">
                <th scope="row">{{ item.question }}</th>&nbsp;<br>
                <!--<input type="text" class="form-control" v-model="item.answer" name="item.answer" id="answer" placeholder="Answer" />-->
                <textarea align = "center" rows="4" cols="50" v-model="item.answer" name="item.answer" form="usrform"/>&nbsp;&nbsp;&nbsp;
                <!--<button type="button" @click='validateAnswer(item)'>Validate</button>-->
                
              </tr>
            
              <button type="button" @click='submitAnswers()'>Submit</button>
              <div v-if="validateAns">
              </div>
              <div v-else>
                <p v-for="task in rowData1" v-bind:key="task">Correctness for question {{ task.number }} is {{ task.score }} </p>
              </div>
              
              </div>
          </div>
          
          <nav class="right-nav1">
            <ul>
              <div>
                <h1 class="righth1">Goal Progress</h1>
                <p class="nocourse" v-if="courseCompleted">No goals assigned</p>
                <div id="chart" v-else>
                  <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                </div>
                
              </div>
               <button type="button" @click='getCourseCompletionList()' class="ref-course-btn">RefreshGoals</button><br><br>
            </ul>
          </nav>
          <nav class="click-chat1">
            <ul>
              <div>
                <h1 class="chat">Chat with your mentor</h1>
                    <div class="text-left">
                      <a class="btn btn-success me-2" href="https://teams.microsoft.com/l/chat/0/0?users=maithili.jampana@genesys.com&topicName=Prep%20For%20Meeting%20Tomorrow&message=Hi%20maithili" target="_blank" role="button">Connect with one click<i class="fas fa-download"></i></a>

                    </div>
              </div>
            </ul>

          </nav>      
      </section>
   </div>
 </div>
</template>

<script crossorigin="anonymous">
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import ApexCharts from 'vue-apexcharts'
import { getCourses,getQuestionsService,validateAnswer} from '../services/UserService'
import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
 name: 'app1',
 beforeCreate(){
   /*axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
   axios.get(`http://fce-u0263.us.int.genesyslab.com:5070/qa?topic=android`,
      {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      proxy: {
        host: 'http://fce-u0263.us.int.genesyslab.com',
        port: 5070
      }
      })
    .then(response => {
      //response.header("Access-Control-Allow-Origin", "*");
      // JSON responses are automatically parsed.
      //this.posts = response.data
      console.log("created11",response.data)
      for (var i = 0; i < response.length; i++) {
          this.addQuestion(response.data[i])
        }
    })
    .catch(e => {
      this.errors.push(e)
    })*/
   this.tasklist = [{description: 'Go somewhere', completed:false},
          {description: 'Go here', completed:false},
          {description: 'Go there', completed:false},
          {description: 'Go anywhere', completed:false},]
 },
 
 /*created(){
   console.log("beforeCreate")
   getCourses(this.first).then(response => {
        console.log("getCourses",response)
        this.courses = response
        this.tasklist = []
        for (var i = 0; i < this.courses.length; i++) {
          console.log("getCourses---",this.courses[i])
          this.tasklist[i] = {}
          this.tasklist[i]["description"] = this.courses[i]
          this.tasklist[i]["completed"] = true
      }
      
      })
   console.log("beforeCreate:::",this.courses)
 },*/
 mounted() {
      console.log("mounted",this.$first);
      this.first = this.$first;
      //this.$emit('getCourses', this.first)
      //this.tasklist = []
      //this.getCourses();
      //console.log("mounted:::",this.courses)
      this.tasklist = [{description: 'Should complete basic android course', completed:false},
          {description: 'Should develop an android weather app', completed:false},
          {description: 'Run an generate apk file', completed:false},
          {description: 'Give a demo on creating android app', completed:false},]
      

      //getting getQuestions
      /*getQuestionsService().then(response => {
        for (var i = 0; i < response.length; i++) {
          this.addQuestion(response[i])
        }
      })*/

      //this.addQuestion("q1")
      //this.addQuestion("q2")
      //this.addQuestion("q3")
    },
 data() {
   return {
      status: '',
      first: this.$first,
      courseCompleted: true,
      courseInProgress: true,
      tasklist:this.tasklist,
      question:"",
      answer:"",
      changebutton: true,
      score: true,
      validateAns:true,
      rowData:[],
      rowData1:[],
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
      getCourseCompletionList(){
        this.courseCompleted=false
        //TODO: api to get course completion
      },
      getQuestions(){
        this.courseInProgress=false
        console.log("getQuestions method")
        //this.addQuestion("What's the role of Google Play in compatibility?")
        //this.addQuestion("What is the Android Open Source Project?")
        //this.addQuestion("How can I get access to Google apps for Android, such as Maps?")
        getQuestionsService().then(response => {
          console.log(response.samples)
        for (var i = 0; i < response.samples.length; i++) {
          console.log("dsdsd")
          this.addQuestion(response.samples[i])
        }
        })
        
      },
      getCourses(){
        //this.$emit('getCourseDetails')
        getCourses(this.first).then(response => {
        console.log("getCourses",response)
        this.courses = response
        this.tasklist = []
        for (var i = 0; i < this.courses.length; i++) {
          console.log("getCourses---",this.courses[i])
          this.tasklist[i] = {}
          this.tasklist[i]["description"] = this.courses[i]
          this.tasklist[i]["completed"] = false
      }
      console.log("getCourses---",this.tasklist)
      })
      },
      clickMenteeView(){
        this.$router.push({name: 'Mentee'})
      },
      toggle(task){
        console.log("toggle---",this.tasklist)
        task.completed = !task.completed;
        this.tasklist.filter( task => ! task.completed );
      },
      startProgress(){
        //task.completed = false;
        this.changebutton = false
      },
      addQuestion(ques,ans){
        var my_object = {
          question:ques,
          answer:ans
        };
        this.rowData.push(my_object)

        this.question = '';
        this.answer = '';
        
    },
    submitAnswers(){
      console.log("submitAnswers",this.rowData[0]["question"])
      //TODO: save answers to db
      var s1,s2=72.12,s3=55.54;
      
      
      validateAnswer(this.rowData[0]["question"],this.rowData[0]["answer"]).then(response => {
          console.log(response.score)
          //item.score=response.score
          console.log("item",response.score)
          s1 = response.score
          console.log("item11",s1)
          this.rowData1.push({number:1,score:s1})
        })
        validateAnswer(this.rowData[1]["question"],this.rowData[1]["answer"]).then(response => {
          console.log(response.score)
          //item.score=response.score
          console.log("item",response.score)
          s2 = response.score
          console.log("item11",s1)
          this.rowData1.push({number:2,score:s2})
        })
        validateAnswer(this.rowData[2]["question"],this.rowData[2]["answer"]).then(response => {
          console.log(response.score)
          //item.score=response.score
          console.log("item",response.score)
          s3 = response.score
          console.log("item11",s1)
          this.rowData1.push({number:3,score:s3})
        })
        
        console.log("item11111",s1)
        
        //this.rowData1.push({number:2,score:s2})
        //this.rowData1.push({number:3,score:s3})
      /*for (var j = 0; j < this.rowData.length; j++) {
        console.log("item11",j)
        validateAnswer(this.rowData[j]["question"],this.rowData[j]["answer"]).then(response => {
          console.log(response.score)
          //item.score=response.score
          //console.log("item",item.score)
          var my_object=[]
          my_object = {
            number:j,
            score:response.score
          };
          console.log("item",j)
          this.rowData1.push(my_object)
          
        })
      }*/
      
      this.validateAns=false
    },
    validateAnswer(item){
      console.log("question",item.question)
      console.log("answer",item.answer)
      validateAnswer(item.question,item.answer).then(response => {
          console.log(response.score)
          item.score=response.score
          console.log("item",item.score)
          this.validate=false
          this.score=false
        })
    }
  },
  computed:{
      inCompletedlist(){
          console.log("inCompletedlist---",this.tasklist)
          return this.tasklist.filter( task => ! task.completed );
      },
      Completedlist(){
          return this.tasklist.filter( task => task.completed);
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
   background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);
 }

 .logo {
   align-self: center;
   color: #fff;
   font-weight: bold;
   font-family: 'Lato';
   font-size: 2rem;
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
   text-align: left;
   font-size: 1.5rem;
   color: #290320;
}

.text1{
text-align: left;
   font-size: 1.25rem;
   color: white;
}
.click-chat1{
  float:left ;
  width: 20%;
  height: 200px; /* only for demonstration, should be removed */
  top:10px;
  left:-50px;
 
}

 section::after {
  content: "";
  display: table;
  clear: both;
}

.right-nav1 {
  float: left;
  width: 30%;
  height: 400px; /* only for demonstration, should be removed */
  padding: 20px;
}

/* Style the list inside the menu */
nav ul {
  list-style-type: none;
  padding: 0;
}

.article {
  float: left;
  padding: 40px;
  width: 70%;
  left : -90px;
  height: 700px; /* only for demonstration, should be removed */
}

.statush1{
  text-align: left;
  //text-transform: uppercase;
  color: #4CAF50;
}

.righth1{
   text-align: left;
   font-size: 1.5rem;
   color: #4CAF50;
   left: 40px
}

.nocourse{
   text-align: center;
   font-size: 1rem;
   color: #ff3399;
   top: 55%;
   right: 14%
}
.button1{
  left:0px;
   background-color: #4CAF50;
   display: inline-block;
   border: none;
   color: white;
    text-align: center;
     margin: 3px 2px;
     cursor: pointer;
  position: absolute;
  right: -10px;
  left:50px;
   font-size: 16px;
}

.ref-course-btn{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 3px 2px;
  cursor: pointer;
  position: absolute;
  top: 53%;
  right: 14%
}

.changebutton{
  color: white;
}

.textarea{

}

.title{
  text-align: left;
  font-size: 30px;
  color: orange;
  left : 10px;
  
  font-family: Arial, Helvetica, sans-serif;
}

.subtitle{
  text-align: left;
  font-size: 25px;
  color: orange;
  font-family: Arial, Helvetica, sans-serif;
}

</style>