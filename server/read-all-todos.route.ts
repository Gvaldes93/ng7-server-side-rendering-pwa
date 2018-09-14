const db = require('./database');

module.exports = function readAllTodos(req, res) {
  res.status(200).json({lessons: db.readAllTodos()});

}
