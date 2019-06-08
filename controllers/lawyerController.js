const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

router.get('/',async (req,res)=>{
    const allLawyer = await Lawyer.find({});
    res.render('deadoralive.ejs',{
        layers:allLawyer,
    })
})

router.post('/',(req,res)=>{
    const username = req.body.username;
    const contactNumber = req.body.contactNumber;
    const contactEmail = req.body.contactEmail;
    const NewLawyer={
        username:username,
        contactNumber:contactNumber,
        contactEmail:contactEmail,
    }
    try{
        Lawyer.create(NewLawyer,(err,createLawyer)=>{
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