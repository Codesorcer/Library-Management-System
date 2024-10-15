const pool = require('../models/database');

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
        return res.status(500).send('Internal server error');
    }
};

module.exports = getbooks;