const express = require('express')
const app = express()
const dotenv = require('dotenv')
const auth_routes = require("./routes/auth")

dotenv.config({path: './.env'})

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('<h1>Hello from Library!</h1>')
})

app.use("/auth", auth_routes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})