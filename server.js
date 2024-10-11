const express = require('express');
const app = express();
const dotenv = require('dotenv');
const auth_routes = require('./routes/auth');
const pages_routes = require('./routes/pages')
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Library!</h1>');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser())

app.use('/auth', auth_routes);
app.use('/auth', pages_routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
