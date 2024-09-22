const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms'
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

pool.query("INSERT INTO clients (name, address, email, moblie) VALUES ('John Doe', '123 Maple Street', 'john.doe@example.com', 1234567890), ('Jane Smith', '456 Oak Avenue', 'jane.smith@example.com', 2345678901), ('Robert Brown', '789 Pine Road', 'robert.brown@example.com', 3456789012), ('Emily Davis', '101 Birch Lane', 'emily.davis@example.com', 4567890123), ('Michael Wilson', '202 Cedar Drive', 'michael.wilson@example.com', 5678901234), ('Jessica Johnson', '303 Elm Street', 'jessica.johnson@example.com', 6789012345), ('William Martinez', '404 Fir Boulevard', 'william.martinez@example.com', 7890123456), ('Sophia Anderson', '505 Spruce Court', 'sophia.anderson@example.com', 8901234567), ('James Lee', '606 Hemlock Way', 'james.lee@example.com', 9012345678), ('Olivia Hernandez', '707 Redwood Terrace', 'olivia.hernandez@example.com', 1234509876), ('Benjamin Clark', '808 Poplar Street', 'benjamin.clark@example.com', 2345609876), ('Ava Lewis', '909 Sequoia Place', 'ava.lewis@example.com', 3456709876), ('Henry Robinson', '1010 Juniper Lane', 'henry.robinson@example.com', 4567809876), ('Isabella Walker', '1111 Cypress Drive', 'isabella.walker@example.com', 5678909876), ('Lucas Hall', '1212 Sycamore Road', 'lucas.hall@example.com', 6789009876);", function (err, result) {
    if(err) throw err;
    console.log("15 Clients Inserted")
})

// pool.query("INSERT INTO admins (name, email, password, mobile) VALUES ('Alice Green', 'alice.green@example.com', 'password123', 1234567890), ('Bob White', 'bob.white@example.com', 'securePass456', 2345678901), ('Carol Black', 'carol.black@example.com', 'adminPass789', 3456789012);", function (err, result) {
//     if(err) throw err;
//     console.log("3 Admins Inserted")
// })