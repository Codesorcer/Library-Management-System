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

const findAdminByEmail = async (email) => {
    try {
        const [results] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);

        if (results.length === 0) {
            throw { status: 401, message: 'You do not have admin access!!' };
        }

        return results[0]; // Return the first admin object
    } catch (err) {
        if (err.status) {
            throw err; // Propagate known error
        }
        throw { status: 500, message: 'Error checking admin' }; // General error
    }
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

const checkifadmin = async (email) => {
    try {
        const query = 'SELECT email FROM admins WHERE email = ?'
        const [rows] = await pool.query(query, [email]);
        
        if(rows.length > 0){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.log('Error checking if user already Admin:', error);
        throw error;
    }
}

const checkPendingAdminRequest = async (userID, email) => {
    try {
        const query = 'SELECT * FROM admin_request WHERE user_id = ? AND email = ? and status = "pending"';
        const [rows] = await pool.query(query, [userID, email]);

        return rows.length > 0;
    } catch (error) {
        console.log('Error checking pending admin requests:', error);
        throw error;
    }
}

const createAdminRequest = async (userID, email) => {
    try {
        const query = 'INSERT INTO admin_request (user_id, email) VALUES (?, ?)';
        const [result] = await pool.query(query, [userID, email]);
        return result.insertId;
    } catch (error) {
        console.log('Error creating admin request:', error);
        throw error;
    }
}

module.exports = { findUserByEmail , findAdminByEmail, checkPendingIssueRequest, bookavailable, createIssueRequest, checkifadmin, checkPendingAdminRequest, createAdminRequest};