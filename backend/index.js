require("dotenv").config();
const express=require('express');
const app=express();
require('./db'); 
var cors = require('cors')
app.use(cors())
app.use(express.json());

const PORT=process.env.PORT || 6010



//Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));





app.listen(PORT);