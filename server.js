const express = require('express');
const app 	  = express();

const PORT = process.env.PORT || 3000;


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
  
app.get('/',(req,res)=>{
    res.render('index.ejs')
})



app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})