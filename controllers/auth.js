const pool = require('../models/database')

const clientloginfn = async(req, res) => {
    res.status(200).json({msg : "Client Login"});
}

const adminloginfn = async(req, res) => {
    res.status(200).json({msg : "Admin Login"});
}

const signupfn = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const user_type = 'client'; // default user type

    pool.query('INSERT INTO users (name, email, password, mobile, address, user_type) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password, mobile, address, user_type], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering user");
        } else {
            res.send("User Registered");
        }
    });
}


module.exports = {clientloginfn, adminloginfn, signupfn};