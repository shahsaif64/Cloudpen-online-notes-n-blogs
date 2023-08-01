const express = require('express');
const router = express.Router();
const userModel = require("../Models/User")
const { query, validationResult, body } = require('express-validator');  //to verify the coming inputs
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../Middleware/fetchuser");

const JWT_SECRET = "forthesakeofsecurity";





//ROUTE1: Create a User using POST "/api/auth/createuser"   no login required

router.post('/createuser', [
    body('fname', 'Enter a valid first name').isLength({ min: 3 }),
    body('lname', 'Enter a valid last name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail({ min: 4 }),
    body('phone', '10 digits only').isLength({ min: 10,max:12 }),
    body('address', '8 character minimum').isLength({ min: 8 }),
    body('dob', '8 character minimum').isLength({ min: 4 }),
    body('occupation', '8 character minimum').isLength({ min: 5 }),
    body('password', '8 character minimum').isLength({ min: 8 })

], async (req, resp) => {
    let success=false;
    //if there are errors, return bad request and the error
    const result = validationResult(req);
    if (!result.isEmpty()) {
           
        return resp.status(400).json({ errors: result.array() });
    }
    try {
        //check whether the user with same email exists already
        let useremail = await userModel.findOne({ email: req.body.email });
        let userphone = await userModel.findOne({ number: req.body.phone });

        if ( useremail) {
            return resp.status(400).json({ error: "sorry user with this email already exists,try another email" })
        }else if(userphone){
            return resp.status(400).json({ error: "sorry user with this number already exists, enter different number" })
        }

        // making hash password and adding salt to hashed password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // if unique email, then create user
        user = await userModel.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            occupation: req.body.occupation,
            password: secPass,
            website: "Add your website",
            github: "Add your github account",
            twitter: "Add your twitter account",
            insta: "Add your instagram account",
            facebook: "Add your facebook account"
        });

        //Creating authenication Token 
        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        // console.log(authtoken);
        // resp.json(user);
        resp.json({success, authtoken,user});

    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }


})







//ROUTE2: Authenticate a user using: POST "/api/auth/login"   login 

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail({ min: 4 }),
    body('password', 'Password can not be Blank').exists()

], async (req, resp) => {
   let success=false;
    //if there are errors, return bad request and the error
    const result = validationResult(req);
    if (!result.isEmpty()) {

        return resp.send({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            
            return resp.status(400).json({success, error: "Please Try to login with correct credentialss" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
           
            return resp.status(400).json({success, error: "Please Try to login with correct credentials" });
        }
        //Creating authenication Token 
        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        resp.json({success, authtoken,user });


    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }

})






//ROUTE3: get logged in user Details using: POST "/api/auth/fetchuser"   login required

router.post('/fetchuser', fetchuser, async (req, resp) => {


    try {
         // Got the req.user value from fetchuser middleware 
       let userId=req.user.id;
         let user = await userModel.findById(userId).select("-password");
         resp.send(user);

    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }

})



// Edit a user 

router.put('/updateuser', fetchuser, async (req, resp) => {

    // const { website,github,twitter,insta,facebook } = req.body;
     try {
        let userId=req.user.id;
            let updatedata =await userModel.findByIdAndUpdate(userId, {$set:req.body}, { new: true });
            resp.send(updatedata);
            console.log(updatedata);
        
        
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal server error occured")
    }




})






module.exports = router

