const express = require('express');
const router = express.Router();
const Wills = require('../models/Wills');

//GET all wills..
router.get('/', async(req, res) => {
  try{
    const allwills = await Wills.find();
    res.json({
      status: 200,
      data: allwills
    })
  }catch(err){
      res.send(err)
  }
});

//GET one will...
router.get('/:id', async(req, res) => {
  try{
    const foundWill = await Wills.findById(req.params.id)
    res.json({
      status: 200,
      data: foundWill
    })
  }catch(err){
    res.send(err)
  }
});

//POST - create Wills
router.post('/', async(req, response) => {
  try{
    const createdWills = await Wills.create(req.body);
    createdWills.save((err, savedWills) => {
      response.json({
        status: 200,
        data: savedWills,
      })
    })

  }catch(err){
    console.log('error????_?');
    response.send(err)
  }
});



//PUT - edit will...
router.put('/:id', async(req, res) => {
  try{
    const updatedWill = await Wills.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedWill
    })
  }catch(err){
    res.send(err)
  }
});


//DELETE Will
router.delete('/:id', async(req, res) => {
  try{
    const deletedWill = await Wills.findByIdAndRemove(req.params.id);
    res.json({
      status: 200,
      data: deletedWill
    })
  }catch(err){
    res.send(err)
  }
});


module.exports = router;
