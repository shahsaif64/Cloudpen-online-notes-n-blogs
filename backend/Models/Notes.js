const mongoose= require('mongoose');
const notesSchema= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users'},  //connecting notes to users by userid and ref:'users' is users collection in DB
    title:{type:String,required:true},
    description:{type:String,required:true},
    tag:{type:String,default:"General"},
    date:{type:Date,default:Date.now}
})

module.exports=mongoose.model('notes',notesSchema);