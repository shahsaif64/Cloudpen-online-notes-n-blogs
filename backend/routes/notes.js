const express= require('express');
const router=express.Router();

router.get('/',(req,resp)=>{

    resp.send(`<h1>Notes route</h1>`)
})

module.exports=router