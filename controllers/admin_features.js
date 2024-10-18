const pool = require('../models/database');

const get_issue_requests = async (req, res) => {
    try {
        const [issue_requests] = await pool.query('SELECT * FROM issue_requests WHERE status="pending"');
        res.status(200).json(issue_requests);
    } catch (error) {
        console.log('Error getting books issue requests:', error);
        res.status(500).send('Internal Server Error');
    }
}

const bookrequest_action = async (req, res) => {
    try {
        const issue_id = req.params.issue_id;
        const action = req.params.action;
        const admin_id = req.admin_id;

        if(action == "approve"){
            //update issue_db status to approved
            const [issue_request] = await pool.query('SELECT * FROM issue_requests WHERE issue_id = ? AND status="pending"', [issue_id]);
            
            if(!issue_request){
                return res.status(404).send('Book issue request not found or already processed');
            }

            // request approved by admin undefined is coming
            await pool.query(
                'UPDATE issue_requests SET status = "approved", admin_response = ? WHERE issue_id = ?', 
                [`Request approved by admin ${admin_id}`, issue_id]
            );

            //add book to users issued db
            //const user_id = issue_request[0].user_id;
            //add book to user history db
            return res.status(200).send('Issue request approved successfully');
        }
        else if(action == "reject"){
            //update issue_db status to rejected
            const [issue_request] = await pool.query('SELECT * FROM issue_requests WHERE issue_id = ? AND status="pending"', [issue_id]);
            
            if(!issue_request){
                return res.status(404).send('Book issue request not found or already processed');
            }
            
            // request rejected by admin undefined is coming
            await pool.query(
                'UPDATE issue_requests SET status = "rejected", admin_response = ? WHERE issue_id = ?', 
                [`Request rejected by admin ${admin_id}`, issue_id]
            );
            // increase book quantity by 1
            const issuedbook_id = issue_request[0].book_id;
            const [book] = await pool.query('SELECT * from books WHERE book_id = ?', [issuedbook_id]);
            await pool.query('UPDATE books SET quantity = ? WHERE book_id=?', [book[0].quantity+1, issuedbook_id]);
            return res.status(200).send('Issue request rejected');
        }
    } catch (error) {
        console.log('Error in Book Issue Request Action: ', error);
        res.status(500).send('Internal Server Error');
    }
}

const get_admin_requests = async (req, res) => {
    try {
        const [admin_requests] = await pool.query('SELECT * FROM admin_request WHERE status="pending"');
        res.status(200).json(admin_requests);
    } catch (error) {
        console.log('Error getting admin rights requests:', error);
        res.status(500).send('Internal Server Error');
    }
}

const adminrequest_action = async (req, res) => {
    try {
        const request_id = req.params.request_id;
        const action = req.params.action;
        const admin_id = req.admin_id;

        if (action=="approve") {
            // update admin_request db
            const [admin_request] = await pool.query('SELECT * FROM admin_request WHERE request_id = ? AND status = "pending"', [request_id]);
            if(!admin_request){
                return res.status(404).send('Admin Rights request not found or already processed');
            }

            await pool.query(
                'UPDATE admin_request SET status = "approved", admin_response = ? WHERE request_id = ?', 
                [`Request approved by admin ${admin_id}`, request_id]
            );

            // Add user in admin db
            const user_id = admin_request[0].user_id;
            const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
            await pool.query('INSERT INTO admins (name, email, password, mobile, address, token) VALUES (?, ?, ?, ?, ?, ?)', [user[0].name, user[0].email, user[0].password, user[0].mobile, user[0].address, user[0].token]);       

            // Update users db
            await pool.query('UPDATE users SET user_type = "admin" WHERE user_id = ?', [user_id]);

            return res.status(200).send('Admin Rights request approved successfully');
        } else if(action == "reject"){
            //update issue_db status to rejected
            const [admin_request] = await pool.query('SELECT * FROM admin_request WHERE request_id = ? AND status="pending"', [request_id]);
            
            if(!admin_request){
                return res.status(404).send('Admin Right request not found or already processed');
            }
 
            await pool.query(
                'UPDATE admin_request SET status = "rejected", admin_response = ? WHERE request_id = ?', 
                [`Request rejected by admin ${admin_id}`, request_id_]
            );

            return res.status(200).send('Admin Right request rejected');
        }
    } catch (error) {
        console.log('Error in admin rights request action:', error);
        res.status(500).send('Internal Server Error');
    }
}

const add_new_book = async (req, res) => {
    const {book_name, author, field_of_study, pages, book_quantity} = req.body;

    // if book already exists then increase its quantity
    const [avail_books] = await pool.query('SELECT * FROM books WHERE book_name = ? & author = ?', [book_name, author]);
    if(avail_books.length > 0){
        const quant = avail_books[0].quantity + book_quantity;
        await pool.query('UPDATE books SET quantity = ? WHERE book_id = ?', [quant, avail_books[0].book_id]);
        return res.status(200).send('Book Quantity Updated');
    }
    else{
        // if book not in db then add it in db
        await pool.query('INSERT INTO books (book_name, author, field_of_study, pages, quantity) VALUES (?, ?, ?, ?, ?)', [book_name, author, field_of_study, pages, book_quantity]);
        return res.status(200).send('Book added to Library');
    }
}

const remove_book = async (req, res) => {
    const {book_id} = req.params.bookid;

    // if book not available
    const [avail_books]= await pool.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
    if(avail_books.length == 0){
        return res.status(200).send('Book not in Library');
    }
    else{
        await pool.query('DELETE FROM books WHERE book_id = ?', [book_id]);
        return res.status(200).send('Book Removed!!');
    }
}

module.exports = {get_issue_requests, bookrequest_action, get_admin_requests, adminrequest_action, add_new_book, remove_book};