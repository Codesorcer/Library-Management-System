const jwt = require("jsonwebtoken");
require('dotenv').config

const auth = (req, res, next) => {
    try {
        let token = req.headers.cookie
        if(token){
            token = token.substring(6);
            let user = jwt.verify(token, process.env.JWT_SECRET)
            req.userID = user.id;
        }
        else{
            res.status(401).json({message: "Unauthorized User"});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized User"});
    }
}

module.exports = auth;