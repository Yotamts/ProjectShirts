require('../data/database');
const express = require('express');
const router = express.Router();
const userModel = require('../Models/users');

/* GET users listing. */
router.get('/', (req, res) => {
  userModel.find({}, (err, data) => {
    if (err) {
      res.send('error')
    }
    else {
      res.send(data);
    }
  })
});

router.post('/', (req, res) => {
  const user = new userModel(req.body).save().then( () => res.send(user))
  next();

})

router.put('/', (req,res) => {
  userModel.findOneAndUpdate({mail: req.body.mail}, { $set: req.body} , (err, doc)=> {
      err? res.status(500).send(err) : res.send(doc);
  } )
});

router.delete(`/:mail`, (req,res) => {
  userModel.findOneAndDelete({mail:req.params.mail}, err => {
   console.log(req.params);
      err? res.status(500).send(err) : res.status(200).send({})
  })
} )   

module.exports = router;