const pool = require('../models/database');

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject({ status: 500, message: 'Error checking user' });
            }

            if (results.length === 0) {
                return reject({ status: 401, message: 'User not found. Please sign up.' });
            }

            const user = results[0];
            resolve(user);
        });
    });
};

const findAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM admins WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject({ status: 500, message: 'Error checking admin' });
            }

            if (results.length === 0) {
                return reject({ status: 401, message: 'You do not have admin access!!' });
            }

            const admin = results[0];
            resolve(admin);
        });
    });
};

module.exports = { findUserByEmail , findAdminByEmail};