const mongoose = require("mongoose")

const userSchema= mongoose.Schema({
    fname:{type:String, required:true},  
    lname:{type:String, required:true},  
    email:{type:String, required:true, unique:true},  
    phone:{type:Number, required:true, unique:true},  
    address:{type:String, required:true},  
    occupation:{type:String, required:true},  
    dob:{type:Date, required:true},  
    password:{type:String, required:true},  
    date:{type:Date, default:Date.now}, 
    website:{type:String}, 
    github:{type:String}, 
    twitter:{type:String}, 
    insta:{type:String}, 
    facebook:{type:String} 
})
const User = mongoose.model('users',userSchema);



module.exports=User;

