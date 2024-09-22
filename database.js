const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lms'
})

pool.query("CREATE TABLE books (book_id int AUTO_INCREMENT, book_name VARCHAR(255), author VARCHAR(255), field_of_study VARCHAR(255), pages int, PRIMARY KEY(book_id))", function (err, result){
    if(err) throw err;
    console.log("Books Table Created")
})

pool.query("CREATE TABLE clients (client_id int AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), email VARCHAR(100),moblie int(10), PRIMARY KEY(client_id))", function (err, result){
    if(err) throw err;
    console.log("Clients Table Created")
})

pool.query("CREATE TABLE admins (admin_id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(100), password VARCHAR(250), mobile int(10), PRIMARY KEY(admin_id))", function (err, result){
    if(err) throw err;
    console.log("Admins Table Created")
})