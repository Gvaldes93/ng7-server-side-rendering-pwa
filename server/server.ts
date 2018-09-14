const express = require('express');
import {Application} from 'express';

const readAllTodos = require('./read-all-todos.route');

const bodyParser = require('body-parser');


const app: Application = express();


app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// REST API
app.route('/api/todos')
  .get(readAllTodos);


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});

