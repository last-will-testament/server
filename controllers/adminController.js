const express = require('express');
const router = express.Router();
const Users = require('../models/User');


//GET all wills..
router.get('/', async(req, res) => {
    try{
      const allUser = await Users.find();
      res.json({
        status: 200,
        data: allUser
      })
    }catch(err){
        res.send(err)
    }
  });

  //POST - create Wills
router.post('/', async(req, response) => {
    try{
      const createdUser = await Users.create(req.body);
      createdUser.save((err, savedUser) => {
        response.json({
          status: 200,
          data: savedUser,
        })
      })
    }catch(err){
      console.log('error????_?');
      response.send(err)
    }
  });



module.exports = router;
