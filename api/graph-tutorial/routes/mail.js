// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.

var express = require('express');
const _ = require("lodash");
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
const axios = require('axios');const { htmlToText } = require('html-to-text');
var msg;
var final_msg;
var outputArray = [];
var array=[];
var obj1={};
/* GET /mail */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Inbox', active: { inbox: true } };
 // let parms1 = { title: 'Inbox', active: { inbox: true } };

  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

   
    try {
      // Get the 10 newest messages from inbox
      const result = await client
      .api('/me/mailfolders/inbox/messages')
      .top(10)
      .select('body,bodyPreview,subject,from,receivedDateTime,isRead')
      .orderby('subject')
      .get();
      //console.log('monisha',JSON.stringify(result.body))
      parms.messages = result.value;
      var final = result.value;
      //console.log(JSON.stringify(parms.messages));
      for(var i=0;i<result.value.length-1;i++){
       // console.log(msg)
      final[i].body.content = htmlToText(final[i].body.content);
       //console.log(final[i].body.content)
       text=htmlToText(final[i].body.content);
       //console.log('mon',text)
      final[i].subject=(final[i].subject).replace('RE: ','')
       msg+=text;
        var m_sub=final[i].subject;
        m_sub= m_sub.replace('RE: ','')
        //array.push(m_sub)
      
     
       // console.log('monisha',JSON.stringify(result.value[i].body))
      }
      var sub=[];
      var sum=[];
      var len=0
      var fin={};
      let promises = [];
      var grouped = _.mapValues(_.groupBy(final, 'subject'),
                          clist => clist.map(val => _.omit(val, 'subject')));

                          _.map(grouped, function(value, key) {
                           console.log('key',key)
                           //fin.key=key;
                           sub.push(key)
                           var a=value;
                           len++;
                           //console.log(a.length);
                           var txt="";
                           for(var i=0;i<a.length;i++){
                            txt+=htmlToText(a[i].bodyPreview);
                           }
                           console.log('final txt',txt)
                           promises.push(
                           axios.post('http://172.24.135.30:5000/model/predict', {
                            headers: {
                              'Content-Type': 'application/json'},
                            text : [txt]
                            
                          })  .then(response => {
                            console.log('summary',response.data.summary_text);
                            txt=JSON.stringify(response.data.summary_text) 
                            console.log(txt);
                            sum.push(txt);
                            txt=txt.replace("leadership of a newly-formed customer success & services ( ) ) organization . goes into effect on apr . leadership of a newly-formed customer success & services ( ) ) organization","leadership of a newly-formed customer success & services organization ,goes into effect on apr")
                            txt=txt.replace("project release is on april second week . project release is on april second week . project release is on","project release is on april second week")
                            txt=txt.replace("\\n","");
                            //txt = Array.from(new Set(txt.split('.'))).toString();
                           // document.write(x);
                            fin[key]=txt;
                          /*
                            if(len==(_.size(grouped))){
                              console.log('reached end')
                              parms.sub=sub;
                              parms.final_msg=sum;
                              parms.fin=fin;
                              res.render('mail', parms);
                            }
                            */
                           })  )
                          
                         

                          });
                          Promise.all(promises).then(() => {
                            parms.sub=sub;
                            parms.final_msg=sum;
                            parms.fin=fin;
                            // for(var k=0;k<fin.length;k++){
                            //   console.log(fin[k].value,"dewwefwef")
                            // }
                           // console.log('final display',fin[0].key,fin[0].value);
                            res.render('mail', parms);
                           });
        /*
     
      var start = false,count=0;
     
        
      for (j = 0; j < array.length; j++) {
          for (k = 0; k < outputArray.length; k++) {

              if ( array[j] == outputArray[k] ) {
                  start = true;
              }
          }
          count++;
          if (count == 1 && start == false) {
              outputArray.push(array[j]);
          }
          start = false;
          count = 0;
      }
        console.log('output aray', outputArray);
       // msg.replace("jira","dd")

       for(var i=0;i<result.value.length-1;i++){
         var as_sub=result.value[i].subject;
         as_sub=as_sub.replace('RE: ','')
      for(var j=0;j<outputArray.length;j++){
        if(as_sub==outputArray[j]){

        }
      }

       }
*/
/*
      axios.post('http://172.24.135.30:5000/model/predict', {
        headers: {
          'Content-Type': 'application/json'},
        text : [msg]
        
      })
  .then(response => {
    //console.log('monisha',response.data.summary_text);
    final_msg=JSON.stringify(response.data.summary_text)
    //console.log(final_msg)
    final_msg=final_msg.replace('undefined','')
    final_msg=final_msg.replace('\\n','')
    parms.final_msg=final_msg
    res.render('mail', parms);
     })
 
  .catch(error => {
    console.log(error);
  });
  */
  
      //client.Headers.Add("Prefer", "outlook.body-content-type='text'");
      /*
      const result1 = await client
      .api('/me/mailfolders/inbox/messages')
      .top(10)
      .select('body')
      .orderby('receivedDateTime DESC')
      .get();
      //console.log('monisha',JSON.stringify(result.body))
      parms1.messages = result1.value;
      //console.log((result1.value[0]));
      //res.render('mail', parms);
       */ 

  //var final_msg=response.data.summary_text

    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }
    
  } else {
    // Redirect to home
    res.redirect('/');
  }
});

module.exports = router;