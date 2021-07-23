const express = require('express');
const { createServer } = require('http');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());

// 404 error handler
app.use((req, res, next) => {
  if (res.body == null && res.json == null) {
    res.status(404).json({
      error: 'Not found'
    });
  } else {
    next();
  }
});

app.use('/', indexRouter);


createServer(app).listen(8080, () => {
  console.log('Server listening on port 8080');
});
module.exports = app;