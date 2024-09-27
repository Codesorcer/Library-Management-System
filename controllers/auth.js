const pool = require('../models/database');
const { findUserByEmail } = require('../service/database');
const express = require('express');
require('dotenv').config
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const clientloginfn = async (req, res) => {
    try{
        // get all data from frontend
        const {email, password} = req.body
        // validation
        if(!(email && password)){
            res.status(400).send('send all data')
        }
        // find user in DB
        const user = await findUserByEmail(email);
        // match the password
        if(user && (await bcrypt.compare(password, user.passwor))){
            const token = jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET,
                {
                    expiresIn : "2h"
                }
            )
            user.token = token
            user.passwor = undefined 
        }
        // send a token
        const options = {
            expires: new Data(Date.now() + 3 * 24 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            user
        })
    } catch(error){
        console.log(error);
    }
};

const adminloginfn = async (req, res) => {
    res.status(200).json({ msg: 'Admin Login' });
};

const signupfn = async (req, res) => {
    try {
        // get all data from body
        const { name, email, password, mobile, address } = req.body;
        
        // all the data should exist
        if (!(name && email && password && mobile && address)) {
            return res.status(400).send('All fields are compulsory');
        }

        // check if user already exists
        pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error checking user');
            }
            if (results.length > 0) {
                return res.status(401).send('User already exists with this email');
            }

            // encrypt the password
            const myEncPassword = await bcrypt.hash(password, 10);

            // save the user in database
            const user_type = 'client'; // default user type
            pool.query('INSERT INTO users (name, email, password, mobile, address, user_type) VALUES (?, ?, ?, ?, ?, ?)', [name, email, myEncPassword, mobile, address, user_type], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error registering user');
                }

                const userID = result.insertId;

                // generate a token for user and send it
                const token = jwt.sign(
                    { id: userID, email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "2h"
                    }
                );

                // store the token in the database
                pool.query('UPDATE users SET token = ? WHERE id = ?', [token, userID], (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error storing token');
                    }

                    // set the token in the response cookies
                    res.cookie('token', token, { httpOnly: true });

                    // send user data excluding the password
                    const user = { id: userID, name, email, mobile, address, user_type, token };
                    res.status(201).json(user);
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { clientloginfn, adminloginfn, signupfn };