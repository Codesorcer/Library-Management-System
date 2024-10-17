const pool = require('../models/database');
const { bookavailable, checkPendingIssueRequest, createIssueRequest, checkifadmin, checkPendingAdminRequest, createAdminRequest} = require('../service/database');

const getbooks = async (req, res) => {
    try {
        const [books] = await pool.query('SELECT * FROM books');    
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Function to handle the issue book request
const issuebook = async (req, res) => {
    try {
        const { book_id } = req.body;
        const user_id = req.user.id
        // Await the results of the async functions
        const isBookAvailable = await bookavailable(book_id);
        const isPendingRequest = await checkPendingIssueRequest(user_id, book_id);

        // also add that if user has issued that book and not returned that book then he cannot again request same book check

        if (isBookAvailable && !isPendingRequest) {
            // Create the issue request in the database
            const requestId = await createIssueRequest(user_id, book_id);
            const [book] = await pool.query('SELECT * FROM books WHERE book_id = ?', [book_id]);
            await pool.query('UPDATE books SET quantity= ? where book_id = ?', [book[0].quantity-1 , book_id]);
            return res.status(201).json({ message: 'Issue request submitted successfully', requestId });
        } else if (isPendingRequest) {
            return res.status(400).send('Pending request already exists for this book');
        } else {
            return res.status(400).send('Book unavailable');
        }
    } catch (error) {
        console.log('Error Issuing Book:', error);
        return res.status(500).send('Internal Server Error');
    }
};

const promotetoadmin = async (req, res) => {
    try {
        const user_id = req.user.id;
        const email = req.user.email;

        const isadmin = await checkifadmin(email);
        if(isadmin){
            return res.status(400).send('User Already Admin');
        } else{
            const isPendingAdminRequest = await checkPendingAdminRequest(user_id, email);
            if(isPendingAdminRequest){
                return res.status(400).send('Pending Request already exists');
            } else{
                // Create Admin Request in the Admin Request DB;
                const request_id = await createAdminRequest(user_id, email);
                return res.status(200).json({ message: 'Admin Request Submitted Successfully', request_id });
            }
        }
    } catch (error) {
        console.log('Error Requesting Admin Access:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {getbooks, issuebook, promotetoadmin};