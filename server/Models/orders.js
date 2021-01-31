const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shirtsmodel = require('../Models/shirts')


const orderSchema = new Schema({
    id:Number,
    date:String,
    status:String,
    area:String,
    address:String,
    apartment:Number,
    customer_name:String,
    remarks:String ,
    items:[],
    flag:Boolean
});

module.exports = mongoose.model('orders',orderSchema );