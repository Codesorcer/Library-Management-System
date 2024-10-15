const pool = require('../models/database');
const { bookavailable, checkPendingIssueRequest, createIssueRequest} = require('../service/database');

const getbooks = async (req, res) => {
    try {
        const books = await new Promise((resolve, reject) => {
            pool.query('SELECT * FROM books', (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

// Function to handle the issue book request
const issuebook = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;

        // Await the results of the async functions
        const isBookAvailable = await bookavailable(book_id);
        const isPendingRequest = await checkPendingIssueRequest(user_id, book_id);

        if (isBookAvailable && !isPendingRequest) {
            // Create the issue request in the database
            const requestId = await createIssueRequest(user_id, book_id);
            return res.status(201).json({ message: 'Issue request submitted successfully', requestId });
        } else if (isPendingRequest) {
            return res.status(400).send('Pending request already exists for this book');
        } else {
            return res.status(400).send('Book unavailable');
        }
    } catch (error) {
        console.log('Error issuing book:', error);
        return res.status(500).send('Internal Server Error');
    }
};

// const promotetoadmin = async (req, res) => {
//     try {
//         const { user_id } = req.body;
//     } catch (error) {
        
//     }
// }

module.exports = {getbooks, issuebook};