const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3501

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
