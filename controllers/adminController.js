const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const Wills = require('../models/Wills');
const Lawyer = require('../models/Lawyer');

router.get('/',(req,res)=>{
    res.render('deadoralive.ejs')
})

router.get('/new',(req,res)=>{
    res.render('new.ejs')
})

router.post('/',(req,res)=>{
    const username = req.body.username;
    const contactNumber = req.body.contactNumber;
    const contactEmail = req.body.contactEmail;
    const NewUser={
        username:username,
        contactNumber:contactNumber,
        contactEmail:contactEmail,
    }
    try{
        Users.create(NewUser,(req,createUser)=>{
            if(err){
                res.send(err)
            }else{
                res.redirect('/')
            }
        })
    }catch(error){
        res.send(error)
    }
})




module.exports = router;