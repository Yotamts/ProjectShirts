const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shirtsmodel = require('../Models/shirts')

const userSchema = new Schema({
    name:String,
    mail:String,
    isManager:Boolean,
    isGuest:Boolean,
    address:String,
    phone:String,
    shoppingCart:[],
    purchases:[]
});

module.exports = mongoose.model('users', userSchema);