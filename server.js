const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;

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
  
app.use('/deadoralive',AdminController);

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

let testSubscription = () => {
  gmail.users.watch({
    userId: "duanshu.translations@gmail.com",
    resource: {
        topicName: "projects/dead-or-alive-243118/topics/Linden",
        labelIds: ["INBOX"]
    }
});
}


app.get('/user',(req,res)=>{//test subscription
    testSubscription();
})

app.post('/alive',(req,res)=>{
    
})


app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})