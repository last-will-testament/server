const express = require('express');
const app 	  = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 9000;


require('./db/db');

const AdminController = require('./controllers/adminController');
const WillController = require('./controllers/wiilContrroller');
const lawyerController = require('./controllers/lawyerController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // This allows the session cookie to be sent back and forth
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
  
app.use('/deadoralive/user',AdminController);
app.use('/deadoralive/will', WillController);
app.use('/deadoralive/lawyer',lawyerController);

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/deadoralive',(req,res)=>{
    res.render('deadoralive.ejs')
})




app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})