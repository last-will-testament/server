const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

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

const gmail = google.gmail('v1');
const oauth2Client = new OAuth2('444985803644-pi65sb0ev4kinsu2fk8arqvo8tgf7v7f.apps.googleusercontent.com', 'rZ_mtqgos6gb-J3uVtMM7QWK', 'http://localhost:9000/');
const scopes = [
  'https://www.googleapis.com/auth/gmail',
  'https://www.googleapis.com/auth/pubsub'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

const {tokens} = await oauth2Client.getToken(code)
oauth2Client.setCredentials(tokens);

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

let testSubscription = (auth) => {
  
  gmail.users.watch({
    userId: "duanshu.translations@gmail.com",
    resource: {
        topicName: "projects/dead-or-alive-243118/topics/Linden",
        labelIds: ["INBOX"]
    }
});
}

async function runSample() {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = 'Status Check';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Living Dead <duanshu.translations@gmail.com>',
    'To: Linden Chiu <linden1023@hotmail.com>',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'Are you alive?',
    'Reply to this e-mail.',
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'duanshu.translations@gmail.com>',
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
  return res.data;
}


app.get('/user',(req,res)=>{//test subscription
    testSubscription();
})

app.post('/alive',(req,res)=>{
    
})


app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})