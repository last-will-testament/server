const express = require('express');
const router = express.Router();
const Wills = require('../models/Wills');


router.get('/',async (req,res)=>{
    const allWills = await Wills.find({});
    res.render('deadoralive.ejs',{
        wills:allWills,
    })
})

router.get('/newWills',(req,res)=>{
    res.render('newWill.ejs')
})

router.post('/',(req,res)=>{
    const username = req.body.username;
    const contactNumber = req.body.contactNumber;
    const contactEmail = req.body.contactEmail;
    const NewWill={
        username:username,
        contactNumber:contactNumber,
        contactEmail:contactEmail,
    }
    try{
        Wills.create(NewWill,(err,createWill)=>{
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