const connectToMongo= require('./db');       // DBconnection
const express=require('express');
const app=express();
app.use(express.json());
connectToMongo();



//Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));





app.listen(4500);