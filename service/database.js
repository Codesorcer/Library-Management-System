const pool = require('../models/database');

const findUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await pool.query(query, [email]);

        // Return the user if found, otherwise return null
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log('Error finding user by email:', error);
        throw error; // Propagate the error
    }
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


const bookavailable = async (bookId) => {
    try {
        const query = 'SELECT quantity FROM books WHERE book_id = ?';
        const [rows] = await pool.query(query, [bookId]);

        if (rows.length > 0) {
            // Check if the book is available (quantity > 0)
            return rows[0].quantity > 0;
        } else {
            return false; // Book not found
        }
    } catch (error) {
        console.log('Error checking book availability:', error);
        throw error; // Return the error to be handled by the caller
    }
};

// Function to check if a pending issue request exists
const checkPendingIssueRequest = async (userId, bookId) => {
    try {
        const query = 'SELECT * FROM issue_requests WHERE user_id = ? AND book_id = ? AND status = "pending"';
        const [rows] = await pool.query(query, [userId, bookId]);

        return rows.length > 0; // Return true if a pending request exists
    } catch (error) {
        console.log('Error checking pending issue request:', error);
        throw error; // Propagate the error
    }
};

// Function to create an issue request in the database
const createIssueRequest = async (userId, bookId) => {
    try {
        const query = 'INSERT INTO issue_requests (user_id, book_id) VALUES (?, ?)';
        const [result] = await pool.query(query, [userId, bookId]);
        return result.insertId; // Return the ID of the inserted request
    } catch (error) {
        console.log('Error creating issue request:', error);
        throw error; // Propagate the error
    }
};

module.exports = { findUserByEmail , findAdminByEmail, checkPendingIssueRequest, bookavailable, createIssueRequest};