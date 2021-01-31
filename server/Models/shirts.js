const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shirtSchema = new Schema({
    id:Number,
    league:String,
    team:String,
    id:Number,
    title:String,
    price:Number,
    goalkeeper:Boolean,
    img:String ,
    stock:Number,
    in_stock:Boolean,
    size:String,
    num:Number ,
    name:String ,
    long_sleeves:Boolean ,
    quantity:Number
});

module.exports = mongoose.model('shirts',shirtSchema );