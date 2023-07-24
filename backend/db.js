const mongoose = require('mongoose');
const mongoURI= 'mongodb://127.0.0.1:27017/Cloudpen';
const connectToMongo=()=>{
    // mongoose.connect(mongoURI)?console.log("connected succesfully"):console.log("connection failed");
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;
