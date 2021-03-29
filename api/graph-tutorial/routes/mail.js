// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.

var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
const axios = require('axios');
var msg;
var final_msg;
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
      .orderby('receivedDateTime DESC')
      .get();
      //console.log('monisha',JSON.stringify(result.body))
      parms.messages = result.value;
     
      //console.log(JSON.stringify(parms.messages));
      for(var i=0;i<result.value.length-1;i++){
        console.log(msg)
        msg+=result.value[i].bodyPreview;}
        
        console.log(msg);
       // msg.replace("jira","dd")

      axios.post('http://172.24.135.30:5000/model/predict', {
        headers: {
          'Content-Type': 'application/json'},
        text : [msg]
        
      })
  .then(response => {
    console.log('monisha',response.data.summary_text);
    final_msg=JSON.stringify(response.data.summary_text)
    console.log(final_msg)
    final_msg=final_msg.replace('undefined','')
    final_msg=final_msg.replace('\\n','')
    parms.final_msg=final_msg
    res.render('mail', parms);
     })
 
  .catch(error => {
    console.log(error);
  });
  
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