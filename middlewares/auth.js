const jwt = require("jsonwebtoken");
require('dotenv').config

const clientauth = (req, res, next) => {
    try {
        let token = req.headers.cookie
//        console.log(req.headers);
        if(token){
            token = token.split('=')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id, email: decoded.email};
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
const adminauth = (req, res, next) => {
    try {
        let token = req.headers.cookie
        if(token){
            token = token.split('=')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = { id: decoded.id, email: decoded.email};
            next();
        }
        else{
            res.status(401).json({message: "Unauthorized Admin"});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized Admin"});
    }
}

module.exports = {adminauth, clientauth};