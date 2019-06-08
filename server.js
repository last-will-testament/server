const express = require('express');
const app 	  = express();

const PORT = process.env.PORT || 3000;


require('./db/db');

const AdminController = require('./controllers/adminController');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.listen(PORT,()=>{
	console.log("App is listening at : ", PORT);
})