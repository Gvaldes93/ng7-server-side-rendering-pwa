// @ts-ignore
const USER_SUBSCRIPTIONS = require('./in-memory-db');

module.exports = function addPushsubscriber(req, res) {

  const sub = req.body;
  console.log('Received Subscription on the server:', sub);

  USER_SUBSCRIPTIONS.push(sub);

  res.status(200).json({message: 'Subscription added  successfully'});

};
