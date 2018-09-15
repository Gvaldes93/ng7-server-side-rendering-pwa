// @ts-ignore
const USER_SUBSCRIPTIONS = require('./in-memory-db');

const webpush = require('web-push');

module.exports = function sendNewsletter(req, res) {

  console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

  const notificationPayload = {
    'notification': {
      'title': 'Angular news',
      'body': 'Nesletter available!',
      'icon': 'assets/images/todo.png',
      'vibrate': [100, 50, 100],
      'data': {
        'dateOfArrival': Date.now(),
        'primaryKey': 1
      },
      'actions': [{
        'action': 'explore',
        'title': ' Go to the site'
      }]

    }
  };


  Promise.all(USER_SUBSCRIPTIONS.map(sub => {
    webpush.sendNotification(sub, JSON.stringify(notificationPayload));
  }));

  res.status(200).json({message: 'Newsletter sent successfully'});

};
