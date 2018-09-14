const _ = require('lodash');
const TODOS = require('./database-data');


class InMemoryDatabase {

  readAllTodos() {
    return _.values(TODOS);
  }

}

module.exports =  new InMemoryDatabase();
