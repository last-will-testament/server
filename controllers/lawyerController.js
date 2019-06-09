const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');



//GET all wills..
router.get('/', async(req, res) => {
  try{
    const allLawyer = await Lawyer.find();
    res.json({
      status: 200,
      data: allLawyer
    })
  }catch(err){
      res.send(err)
  }
});

//GET one will...
router.get('/:id', async(req, res) => {
  try{
    const foundLawyer = await Lawyer.findById(req.params.id)
    res.json({
      status: 200,
      data: foundLawyer
    })
  }catch(err){
    res.send(err)
  }
});


//POST - create Wills
router.post('/', async(req, response) => {
  try{
    const createdLawyer = await Lawyer.create(req.body);
    createdLawyer.save((err, savedLawyer) => {
      response.json({
        status: 200,
        data: savedLawyer,
      })
    })

  }catch(err){
    console.log('error????_?');
    response.send(err)
  }
});




module.exports = router;
