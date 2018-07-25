const mongoose = require('mongoose');
const config = require('../config/database');

//Contact Schema
const cotactSchema = mongoose.Schema({

name:{
	type:String,
	require:true
},email:{
	type:String,
	require:true
},message:{
	type:String,
	require:true
}


});


const Contact = module.exports = mongoose.model('Contact',cotactSchema);

module.exports.addContact = function(cotactSchema,callback){

cotactSchema.save(callback);

};

