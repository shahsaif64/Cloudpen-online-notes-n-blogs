const express = require('express');
const router = express.Router();
const userModel= require("../Models/User")
const { query, validationResult, body } = require('express-validator');



// Create a User using POST "/api/auth/createuser"   no login required

router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 4 }),
    body('email','Enter a valid Email').isEmail({ min: 4 }),
    body('password','8 character minimum').isLength({ min: 8 }),

], (req, resp) => {
    //if there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
     
        resp.send({ errors: result.array() });
    }else{
        userModel.create(req.body)
        .then(user=>resp.json(user))
        .catch(err=>{console.log(err); resp.json({error:"email already exists",message:err.message}) });
    }
    

    
        
   
   
       
    

})


module.exports = router

