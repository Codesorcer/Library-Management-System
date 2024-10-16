const express = require('express');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const auth_routes = require('./routes/auth');
const pages_routes = require('./routes/auth_pages')
const client_features = require('./routes/client_features')
const admin_features = require('./routes/admin_features')
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Library!, Admin Login, Client Login, Signup</h1>');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser())

app.use((req, res, next) => {
  console.log("HTTP Method - " + req.method + " , URL - " + req.url);
  next();
})

app.use('/auth', auth_routes);
app.use('/auth', pages_routes);
app.use('/home', client_features);
app.use('/admin', admin_features);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
