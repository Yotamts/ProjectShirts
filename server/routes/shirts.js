require('../data/database');
const express = require('express');
const router = express.Router();
const shirtModel = require('../Models/shirts');


router.get('/', (req, res) => {
    shirtModel.find({}, (err, data) => {
    if (err) {
      res.send('error')
    }
    else {
      res.send(data);
    }
  })
});

router.post('/', (req, res) => {
  const shirt = new shirtModel(req.body).save().then( () => res.send(shirt))
  next();

})

router.put('/', (req,res) => {
    shirtModel.findOneAndUpdate({id: req.body.id}, { $set: req.body} , (err, doc)=> {
        err? res.status(500).send(err) : res.send(doc);
    } )
  });
  
  router.delete(`/:id`, (req,res) => {
    shirtModel.findOneAndDelete({id:req.params.id}, err => {
     console.log(req.params);
        err? res.status(500).send(err) : res.status(200).send({})
    })
  } )   



module.exports = router;