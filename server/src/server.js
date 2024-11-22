const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
const dbConnect = require('./database/connector');
require('dotenv').config()
const UserRoute = require('./routes/user')
const NewsRouter = require('./routes/news')

dbConnect()

app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(NewsRouter)

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})