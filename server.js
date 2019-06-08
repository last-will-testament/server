const express = require('express');
const app 	  = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./db/db');

const PORT = process.env.PORT || 9000;

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

// app.get('/deadoralive', (req,res)=>{
//     res.render('deadoralive.ejs')
// })




app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})
