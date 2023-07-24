var jwt = require('jsonwebtoken');
const JWT_SECRET = "forthesakeofsecurity";

const fetchuser = async (req, resp, next) => {

    //Get the user from jwt token and add it to req object    
    const token = req.header('auth-token');
    if (!token) {
      return  resp.status(401).send({ error: "Please authenticate using a valid token" });
    }


    try {
         //fetching user data from token
        const data= jwt.verify(token,JWT_SECRET);
        //assigning fetched user data to req.user and sending to next available function by next()
        req.user= data.user;
        next();
    } catch (error) {
        resp.status(401).send({ error: "Please authenticate using a valid token" });
    }

  
}


module.exports = fetchuser;
