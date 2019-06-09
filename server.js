const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const fs = require('fs');
const readline = require('readline');
const googleAuth = require('google-auth-library');
// const {PubSub} = require('@google-cloud/pubsub');
// const pubsub = new PubSub();

const tasks = require('./controllers/docusignController.js');

require('./db/db');

const AdminController = require('./controllers/adminController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // This allows the session cookie to be sent back and forth
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
  
app.use('/deadoralive', AdminController);

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

const { google } = require("googleapis"); 
const { OAuth2Client } = require("google-auth-library");
const credentials = require('./client_id.json');//required

let clientSecret = credentials.web.client_secret;
let clientId = credentials.web.client_id;
let redirectUrl = credentials.web.redirect_uris[0];

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/pubsub'
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
    runSample(auth);
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

async function runSample(auth) {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const gmail = google.gmail({version: 'v1', auth: auth});
  const subject = 'Status Check';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Living Dead <duanshu.translations@gmail.com>',
    'To: Linden Chiu <linden1023@hotmail.com>',//user'sname and e-mail goes here
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
    userId: 'duanshu.translations@gmail.com',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
  return res.data;
}


// app.get('/user',(req,res)=>{//test subscription
//     testSubscription();
// })

app.post('/alive',(req,res)=>{
   //hits, don't send will
})


app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})