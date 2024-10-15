const pool = require('../models/database');
const { findUserByEmail , findAdminByEmail} = require('../service/database');
const express = require('express');
require('dotenv').config
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const clientloginfn = async (req, res) => {
    try {
        // Get all data from frontend
        const { email, password } = req.body;

        // Validation
        if (!(email && password)) {
            return res.status(400).send('Send all data');
        }

        // Find user in DB
        const user = await findUserByEmail(email);

        // Match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user.user_id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );

            // Update the token in the database
            await pool.query('UPDATE users SET token = ? WHERE user_id = ?', [token, user.user_id]);

            user.token = token;
            user.password = undefined; // Remove password from user object

            // Send a token
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true
            };

            return res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            });
        } else {
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const adminloginfn = async (req, res) => {
    try {
        // Get all data from frontend
        const { email, password } = req.body;

        // Validation
        if (!(email && password)) {
            return res.status(400).send('Send all data');
        }

        // Find user in DB
        const admin = await findAdminByEmail(email);

        // Match the password
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign(
                { id: admin.admin_id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            // Update the token in the database
            await pool.query('UPDATE admins SET token = ? WHERE admin_id = ?', [token, admin.admin_id]);

            // Set the token in the admin object and remove password
            admin.token = token;
            admin.password = undefined;

            // Send a token
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true
            };

            return res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                admin
            });
        } else {
            return res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.log(error);
        return res.status(error.status || 500).send(error.message || 'Internal server error');
    }
};

const signupfn = async (req, res) => {
    try {
        // Get all data from body
        const { name, email, password, mobile, address } = req.body;

        // All the data should exist
        if (!(name && email && password && mobile && address)) {
            return res.status(400).send('All fields are compulsory');
        }

        // Check if user already exists
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length > 0) {
            return res.status(401).send('User already exists with this email');
        }

        // Encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10);

        // Save the user in database
        const user_type = 'client'; // Default user type
        const [insertResult] = await pool.query(
            'INSERT INTO users (name, email, password, mobile, address, user_type) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, email, myEncPassword, mobile, address, user_type]
        );

        const userID = insertResult.insertId;

        // Generate a token for user and send it
        const token = jwt.sign(
            { id: userID, email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // Store the token in the database
        await pool.query('UPDATE users SET token = ? WHERE user_id = ?', [token, userID]);

        // Set the token in the response cookies
        res.cookie('token', token, { httpOnly: true });

        // Send user data excluding the password
        const user = { id: userID, name, email, mobile, address, user_type, token };
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { clientloginfn, adminloginfn, signupfn };