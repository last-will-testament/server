const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

router.post('/', async(req, res) => {
    try{
      const createdLawyerr= await Users.create(req.body);
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