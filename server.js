const express = require('express');
const app 	  = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db/db');

const axios = require('axios');
const PORT = process.env.PORT || 9000;

const fs = require('fs');
const readline = require('readline');
const googleAuth = require('google-auth-library');
// const {PubSub} = require('@google-cloud/pubsub');
// const pubsub = new PubSub();
const Users = require('./models/User');


// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // This allows the session cookie to be sent back and forth
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));


const adminController = require('./controllers/adminController');
const willController = require('./controllers/wiilContrroller');
const lawyerController = require('./controllers/lawyerController');


app.use('/deadoralive/user',  adminController);
app.use('/deadoralive/will',  willController);
app.use('/deadoralive/lawyer', lawyerController);

// app.get('/',(req,res)=>{
//     res.render('index.ejs')
// })
const { google } = require("googleapis"); 
const { OAuth2Client } = require("google-auth-library");
const credentials = require('./client_id.json');//required

let clientSecret = credentials.web.client_secret;
let clientId = credentials.web.client_id;
let redirectUrl = credentials.web.redirect_uris[0];

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send'
];

const auth = new OAuth2Client(clientId, clientSecret, redirectUrl);

app.get('/connect', (req, res) => {
   let authUrl = auth.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
   });
   res.redirect(authUrl);
});

app.get('/auth/callback', (req, res) => {
  
  return auth.getToken(req.query.code, (err, token) => {
    auth.credentials = token;
    const sendUser = Users.find({}).then(
	function(user){
		console.log('===>',user[0].userEmail);
		runSample(auth,user[0].userEmail);
	})   
  });
});

// let testSubscription = (auth) => {
  
//   gmail.users.watch({
//     userId: "duanshu.translations@gmail.com",
//     resource: {
//         topicName: "projects/dead-or-alive-243118/topics/Linden",
//         labelIds: ["INBOX"]
//     }
// });
// }

const sendUser = Users.find({}).then(
	function(user){
		console.log('===>',user);
	})





async function runSample(auth, user) {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const gmail = google.gmail({version: 'v1', auth: auth});
  const subject = 'Status Check';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const person = `To: zz <${user}>`
  const messageParts = [
    'From: Living Dead <duanshu.translations@gmail.com>',
    person,//user'sname and e-mail goes here
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'Dead yet?',
    'Reply to this e-mail if not.',
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
  return res.data;
}

app.get('/dead',(req,res)=>{
  axios({
    method: 'GET',
    url: 'http://localhost:3000/',
    data: {
      "email": "john@email.com",
      "name": "John Doe",
      "recipientId": "1",
      "clientUserId": "1234"
    }
  }).then((res) => {
    console.log(typeof res.data)
    console.log(res.data); 
  })
})





app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})
