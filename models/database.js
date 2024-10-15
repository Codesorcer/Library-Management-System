const mysql = require('mysql2/promise')
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

// pool.query("CREATE TABLE books (book_id int AUTO_INCREMENT, book_name VARCHAR(255), author VARCHAR(255), field_of_study VARCHAR(255), pages int, PRIMARY KEY(book_id))", function (err, result){
//     if(err) throw err;
//     console.log("Books Table Created")
// })

// pool.query("CREATE TABLE clients (client_id int AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), email VARCHAR(100), mobile int(10), PRIMARY KEY(client_id))", function (err, result){
//     if(err) throw err;
//     console.log("Clients Table Created")
// })

// pool.query("CREATE TABLE admins (admin_id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(100), password VARCHAR(250), mobile int(10), PRIMARY KEY(admin_id))", function (err, result){
//     if(err) throw err;
//     console.log("Admins Table Created")
// })

// pool.query("INSERT INTO books (book_name, author, field_of_study, pages) VALUES('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', 1312),('Clean Code', 'Robert C. Martin', 'Software Engineering', 464),('Artificial Intelligence: A Modern Approach', 'Stuart Russell', 'Artificial Intelligence', 1152),('The Art of Computer Programming', 'Donald E. Knuth', 'Computer Science', 672),('Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma', 'Software Design', 395),('Database System Concepts', 'Abraham Silberschatz', 'Database Management', 1376),('Computer Networks', 'Andrew S. Tanenbaum', 'Networking', 960),('Operating System Concepts', 'Abraham Silberschatz', 'Operating Systems', 976),('Compilers: Principles, Techniques, and Tools', 'Alfred V. Aho', 'Compiler Design', 1009),('Modern Operating Systems', 'Andrew S. Tanenbaum', 'Operating Systems', 1136),('The Pragmatic Programmer', 'Andrew Hunt', 'Software Engineering', 352),('Introduction to the Theory of Computation', 'Michael Sipser', 'Theoretical Computer Science', 504),('Pattern Recognition and Machine Learning', 'Christopher M. Bishop', 'Machine Learning', 738),('Deep Learning', 'Ian Goodfellow', 'Deep Learning', 800),('Digital Image Processing', 'Rafael C. Gonzalez', 'Image Processing', 1000),('Computer Vision: Algorithms and Applications', 'Richard Szeliski', 'Computer Vision', 812),('Data Mining: Concepts and Techniques', 'Jiawei Han', 'Data Mining', 744),('Artificial Intelligence: Foundations of Computational Agents', 'David L. Poole', 'Artificial Intelligence', 820),('Introduction to Machine Learning with Python', 'Andreas C. Müller', 'Machine Learning', 400),('Probabilistic Graphical Models: Principles and Techniques', 'Daphne Koller', 'Machine Learning', 1270)", function (err, result) {
//     if(err) throw err;
//     console.log("20 Books Inserted")
// })

// pool.query("INSERT INTO clients (name, address, email, moblie) VALUES ('John Doe', '123 Maple Street', 'john.doe@example.com', 1234567890), ('Jane Smith', '456 Oak Avenue', 'jane.smith@example.com', 2345678901), ('Robert Brown', '789 Pine Road', 'robert.brown@example.com', 3456789012), ('Emily Davis', '101 Birch Lane', 'emily.davis@example.com', 4567890123), ('Michael Wilson', '202 Cedar Drive', 'michael.wilson@example.com', 5678901234), ('Jessica Johnson', '303 Elm Street', 'jessica.johnson@example.com', 6789012345), ('William Martinez', '404 Fir Boulevard', 'william.martinez@example.com', 7890123456), ('Sophia Anderson', '505 Spruce Court', 'sophia.anderson@example.com', 8901234567), ('James Lee', '606 Hemlock Way', 'james.lee@example.com', 9012345678), ('Olivia Hernandez', '707 Redwood Terrace', 'olivia.hernandez@example.com', 1234509876), ('Benjamin Clark', '808 Poplar Street', 'benjamin.clark@example.com', 2345609876), ('Ava Lewis', '909 Sequoia Place', 'ava.lewis@example.com', 3456709876), ('Henry Robinson', '1010 Juniper Lane', 'henry.robinson@example.com', 4567809876), ('Isabella Walker', '1111 Cypress Drive', 'isabella.walker@example.com', 5678909876), ('Lucas Hall', '1212 Sycamore Road', 'lucas.hall@example.com', 6789009876);", function (err, result) {
//     if(err) throw err;
//     console.log("15 Clients Inserted")
// })

// pool.query("INSERT INTO admins (name, email, password, mobile) VALUES ('Alice Green', 'alice.green@example.com', 'password123', 1234567890), ('Bob White', 'bob.white@example.com', 'securePass456', 2345678901), ('Carol Black', 'carol.black@example.com', 'adminPass789', 3456789012);", function (err, result) {
//     if(err) throw err;
//     console.log("3 Admins Inserted")
// })

// pool.query("ALTER TABLE admins ADD COLUMN address VARCHAR(255)", function (err, result) {
//     if (err) throw err;
//     console.log("Address column added to admins table");
    
//     pool.query("UPDATE admins SET address = CASE WHEN name = 'Alice Green' THEN '123 Green Street' WHEN name = 'Bob White' THEN '456 White Avenue' WHEN name = 'Carol Black' THEN '789 Black Road' END", function (err, result) {
//         if (err) throw err;
//         console.log("Admins' addresses updated");
//     });
// });

// pool.query("ALTER TABLE clients ADD COLUMN password VARCHAR(250)", function (err, result) {
//     if (err) throw err;
//     console.log("Password column added to clients table");
    
//     pool.query("UPDATE clients SET password = CASE WHEN name = 'John Doe' THEN 'password1' WHEN name = 'Jane Smith' THEN 'password2' WHEN name = 'Robert Brown' THEN 'password3' WHEN name = 'Emily Davis' THEN 'password4' WHEN name = 'Michael Wilson' THEN 'password5' WHEN name = 'Jessica Johnson' THEN 'password6' WHEN name = 'William Martinez' THEN 'password7' WHEN name = 'Sophia Anderson' THEN 'password8' WHEN name = 'James Lee' THEN 'password9' WHEN name = 'Olivia Hernandez' THEN 'password10' WHEN name = 'Benjamin Clark' THEN 'password11' WHEN name = 'Ava Lewis' THEN 'password12' WHEN name = 'Henry Robinson' THEN 'password13' WHEN name = 'Isabella Walker' THEN 'password14' WHEN name = 'Lucas Hall' THEN 'password15' END", function (err, result) {
//         if (err) throw err;
//         console.log("Clients' passwords updated");
//     });
// });

// pool.query("ALTER TABLE clients CHANGE COLUMN moblie mobile INT(10)", function (err, result) {
//     if (err) throw err;
//     console.log("Column 'moblie' renamed to 'mobile'");
// });

// Create the users table
// pool.query(`
//     CREATE TABLE users (
//         user_id INT AUTO_INCREMENT,
//         name VARCHAR(255),
//         email VARCHAR(100),
//         password VARCHAR(250),
//         mobile INT(10),
//         address VARCHAR(255),
//         user_type VARCHAR(50),
//         PRIMARY KEY(user_id)
//     )
// `, function (err, result) {
//     if (err) throw err;
//     console.log("Users Table Created");

//     // Insert data from clients table into users table
//     pool.query(`
//         INSERT INTO users (name, email, password, mobile, address, user_type)
//         SELECT name, email, password, mobile, address, 'client' FROM clients
//     `, function (err, result) {
//         if (err) throw err;
//         console.log("Clients data inserted into Users Table");

//         // Insert data from admins table into users table
//         pool.query(`
//             INSERT INTO users (name, email, password, mobile, address, user_type)
//             SELECT name, email, password, mobile, address, 'admin' FROM admins
//         `, function (err, result) {
//             if (err) throw err;
//             console.log("Admins data inserted into Users Table");
//         });
//     });
// });

// pool.query("ALTER TABLE users ADD COLUMN token VARCHAR(255)", function (err,result){
//     if (err) throw err;
//     console.log("token column added to users");
// });


// pool.query('SELECT * FROM users WHERE email = ?', ["aintahii@example.com"], (err, results) => {
//     if (err) {
//         console.log(err);
//         return res.status(500).send('Error fetching user data');
//     }
//     if (results.length === 0) {
//         return res.status(404).send('User not found');
//     }

//     const user = results[0];
//     const { name, email, password, mobile, address } = user;

//     // Step 2: Insert the fetched user data into the admin table
//     pool.query('INSERT INTO admins (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)', [name, email, password, mobile, address], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('Error inserting user into admin table');
//         }

//         // Step 3: Update the user_type of the user in the users table to admin
//         pool.query('UPDATE users SET user_type = ? WHERE email = ?', ['admin', email], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).send('Error updating user type');
//             }

//             res.status(200).send('User promoted to admin successfully');
//         });
//     });
// });

// pool.query('ALTER TABLE admins ADD COLUMN token VARCHAR(255)', (err, result) => {
//     if (err) {
//         console.log(err);
//         return res.status(500).send('Error adding token column to admins table');
//     }
//     res.status(200).send('Token column added to admins table successfully');
// });

// const createIssueRequestsTable = async () => {
//     const query = `
//     CREATE TABLE IF NOT EXISTS issue_requests (
//         issue_id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT,
//         book_id INT,
//         request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
//         admin_response VARCHAR(255),
//         FOREIGN KEY (user_id) REFERENCES users(user_id),
//         FOREIGN KEY (book_id) REFERENCES books(book_id)
//     );
//     `;

//     pool.query(query, (err, result) => {
//         if (err) {
//             console.log("Error creating issue_requests table:", err);
//         } else {
//             console.log("issue_requests table created successfully");
//         }
//     });
// };

// createIssueRequestsTable(); 

// const ensureUniqueEmail = async () => {
//     const query = 'ALTER TABLE users ADD UNIQUE (email)';
//     try {
//         await pool.query(query);
//         console.log('Unique constraint added to users(email)');
//     } catch (error) {
//         console.error('Error ensuring unique email in users:', error);
//     }
// };

// ensureUniqueEmail();

// const admin_requests = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS admin_request (
//             request_id INT AUTO_INCREMENT PRIMARY KEY,
//             user_id INT,
//             email VARCHAR(100),
//             request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
//             admin_response VARCHAR(255),
//             FOREIGN KEY (user_id) REFERENCES users(user_id),
//             FOREIGN KEY (email) REFERENCES users(email)
//         );
//     `;

//     try {
//         const [result] = await pool.query(query);
//         console.log("admin_request table created", result);
//     } catch (err) {
//         console.error("Error creating admin_request table:", err);
//     }
// };

// admin_requests();

module.exports = pool;