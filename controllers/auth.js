const pool = require('../models/database');

const clientloginfn = async (req, res) => {
    res.status(200).json({ msg: 'Client Login' });
};

const adminloginfn = async (req, res) => {
    res.status(200).json({ msg: 'Admin Login' });
};

const signupfn = async (req, res) => {
    const { name, email, password, mobile, address } = req.body;
    const user_type = 'client'; // default user type

    pool.query('INSERT INTO users (name, email, password, mobile, address, user_type) VALUES (?, ?, ?, ?, ?, ?)', [name, email, password, mobile, address, user_type], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error registering user');
        } else {
            res.send('User Registered');
        }
    });
};

module.exports = { clientloginfn, adminloginfn, signupfn };