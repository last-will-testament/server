const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

// router.post('/', async(req, res) => {
//     try{
//       const createdLawyerr= await Users.create(req.body);
//       console.log(`Created Users: ${createdUser}`);
//       res.json({
//         status:200,
//         data: createdUser
//       })
//       console.log("post success")
//     }catch(err){
//       res.send(err)
//     }
// });

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

//POST - create Wills
router.post('/', async(req, response) => {
  try{
    const createdLawyer = await Lawyer.create(req.body);
    //we don't have login so we don't need this....
    // createdWills.authorId = req.session.userId;
    // createdWills.authorname = req.session.username;

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
