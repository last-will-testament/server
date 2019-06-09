const express = require('express');
const router = express.Router();
const Users = require('../models/User');


router.get('/',async (req,res)=>{
    const allUsers = await Users.find({});
    res.render('deadoralive.ejs',{
        users:allUsers,
    })
})

router.get('/new',(req,res)=>{
    res.render('new.ejs')
})

router.post('/', async(req, res) => {
    try{
      const createdUser= await Users.create(req.body);
      console.log(`Created Users: ${createdUser}`);
      res.json({
        status:200,
        data: createdUser
      })
      console.log("post success")
    }catch(err){
      res.send(err)
    }
});


module.exports = router;
