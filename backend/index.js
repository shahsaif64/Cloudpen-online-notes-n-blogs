const connectToMongo= require('./db');       // DBconnection
const express=require('express');
var cors = require('cors')
const app=express();
app.use(cors())
app.use(express.json());
connectToMongo();
const PORT= process.env.PORT || 6010



//Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));





app.listen(PORT);