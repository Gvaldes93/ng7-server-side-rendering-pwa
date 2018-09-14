const db = require('./database');

module.exports = function readAllNewsletters(req, res) {
  res.status(200).json(db.readAllTodos());

}
