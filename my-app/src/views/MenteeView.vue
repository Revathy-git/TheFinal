<template>
 <div id="app">
   <nav class="main-nav">
     <div class="logo">
       Your View
     </div>
     <Burger></Burger>
   </nav>

   <Sidebar>
     <ul class="sidebar-panel-nav">
       <button type="button" @click='clickHome()' class="btn btn-danger">Home</button><br><br>
       <button type="button" @click='clickNotifications()' class="btn btn-danger">Notifications</button><br><br>
       <button type="button" @click='clickLeaderBoard()' class="btn btn-danger">Leaderboard</button><br><br>
       <button type="button" @click='clickMenteeView()' class="btn btn-danger">Mentee View</button><br><br>
       <button type="button" @click='clickProfile()' class="btn btn-danger">Profile</button><br><br>
     </ul>
   </Sidebar>

   <div>
        <section>
          <article>
            <div v-if="courseInProgress">
              <h1>Goals Assigned</h1>
              <!--<h2>All Goals</h2>
              <ul>
                  <li v-for="task in tasklist" v-bind:key="task" v-text="task.description"></li>
              </ul>-->
              <h2>All goals</h2>
              <ul>
                  <li v-for="task in inCompletedlist" v-bind:key="task">{{ task.description }}  
                  <!--<button @click="startProgress(task)" v-if="changebutton">StartProgress</button>
                  <button class="changebutton" v-else>StartProgress</button>-->
                  <button @click="toggle(task)">Mark as finished</button></li>
              </ul>
              <h2>All complete goals</h2>
              <ul>
                  <li v-for="task in Completedlist" v-bind:key="task">{{ task.description }}  <button @click="toggle(task)">Mark as unfinished</button></li>
              </ul>
              <button type="button" @click='getQuestions()'>Take Assessment</button>
            </div>
            <div v-else>
              <h1>Final Review</h1>
              <tr v-for="item in rowData" v-bind:key="item">
                <th scope="row">{{ item.question }}</th>
                <input type="text" class="form-control" v-model="item.answer" name="item.answer" id="answer" placeholder="Answer" />
                
              </tr>
              <button type="button" @click='submitAnswers()'>Submit</button>
            </div>
          </article>
          
          <nav class="right-nav">
            <ul>
              <div>
                <h1 class="righth1">Course Progress</h1>
                <p class="nocourse" v-if="courseCompleted">No course present</p>
                <div id="chart" v-else>
                  <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                </div>
                
              </div>
              <button type="button" @click='getCourseCompletionList()' class="ref-course-btn">RefreshCourse</button><br><br>
            </ul>
          </nav>
      </section>
   </div>
 </div>
</template>

<script>
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';
import ApexCharts from 'vue-apexcharts'
import { getCourses,getQuestionsService} from '../services/UserService'

export default {
 name: 'app1',
 beforeCreate(){
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
      this.tasklist = [{description: 'Go somewhere', completed:false},
          {description: 'Go here', completed:false},
          {description: 'Go there', completed:false},
          {description: 'Go anywhere', completed:false},]
      

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
      rowData:[],
      series: [44, 55, 41],
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
      getCourseCompletionList(){
        this.courseCompleted=false
        //TODO: api to get course completion
      },
      getQuestions(){
        this.courseInProgress=false
        console.log("getQuestions method")
        getQuestionsService().then(response => {
        for (var i = 0; i < response.length; i++) {
          this.addQuestion(response[i])
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
      console.log(this.rowData[0]["answer"])
      //TODO: save answers to db
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

article {
  float: left;
  padding: 20px;
  width: 70%;
  background-color: #f1f1f1;
  height: 500px; /* only for demonstration, should be removed */
}

.statush1{
  text-align: left;
  //text-transform: uppercase;
  color: #4CAF50;
}

.righth1{
   text-align: middle;
   font-size: 1.5rem;
   color: #4CAF50;
}

.nocourse{
   text-align: center;
   font-size: 1rem;
   color: #ff3399;
   top: 55%;
   right: 14%
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
  right: 11%
}

.changebutton{
  color: white;
}
</style>