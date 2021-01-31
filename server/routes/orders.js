require('../data/database');
const express = require('express');
const router = express.Router();
const orderModel = require('../Models/orders');


router.get('/', (req, res) => {
    orderModel.find({}, (err, data) => {
    if (err) {
      res.send('error')
    }
    else {
      res.send(data);
    }
  })
});

router.post('/', (req, res) => {
  const order = new orderModel(req.body).save().then( () => res.send(order))
  next();

})

router.put('/', (req,res) => {
    orderModel.findOneAndUpdate({id: req.body.id}, { $set: req.body} , (err, doc)=> {
        err? res.status(500).send(err) : res.send(doc);
    } )
  });
  
  router.delete(`/:id`, (req,res) => {
    orderModel.findOneAndDelete({id:req.params.id}, err => {
     console.log(req.params);
        err? res.status(500).send(err) : res.status(200).send({})
    })
  } )   



module.exports = router;