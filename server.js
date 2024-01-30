require('dotenv').config() //to be able to use environment variables through all our files
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 3505

console.log(process.env.NODE_ENV);

connectDB()

app.use(logger) // use logger middleware

app.use(cors(corsOptions)) // use cors middleware (allows cross origin requests

app.use(express.json()) // for parsing requests in json format

app.use(cookieParser()) // for parsing cookies

app.use('/', express.static(path.join(__dirname, 'public'))); // serve static files from public folder when hitting / route

app.use('/', require('./routes/root')); // use routes/root.js for / route

app.all('*', (req,res) =>{ // catch all routes that are not defined
  res.status(404)
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if(req.accepts('json')){
    res.json({message: '404 Not Found'})
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler) // use error handler middleware

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.once('error', (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

