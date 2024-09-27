// const pool = require('../models/database');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Function to promote a user to admin
// const promoteToAdmin = async (req, res) => {
//     const { email } = req.body;

//     try {
//         // Step 1: Fetch the user data from the users table
//         pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send('Error fetching user data');
//             }
//             if (results.length === 0) {
//                 return res.status(404).send('User not found');
//             }

//             const user = results[0];
//             const { name, password, mobile, address } = user;

//             // Step 2: Insert the fetched user data into the admin table
//             pool.query('INSERT INTO admin (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)', [name, email, password, mobile, address], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).send('Error inserting user into admin table');
//                 }

//                 // Step 3: Update the user_type of the user in the users table to admin
//                 pool.query('UPDATE users SET user_type = ? WHERE email = ?', ['admin', email], (err, result) => {
//                     if (err) {
//                         console.log(err);
//                         return res.status(500).send('Error updating user type');
//                     }

//                     res.status(200).send('User promoted to admin successfully');
//                 });
//             });
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Internal server error');
//     }
// };

// module.exports = { promoteToAdmin };