const express = require('express');
import {Application} from 'express';
const readAllTodos = require( './read-all-todos.route');

const bodyParser = require('body-parser');


const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/todos')
  .get(readAllTodos);


// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});

