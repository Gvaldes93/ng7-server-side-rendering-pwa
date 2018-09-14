import {send} from 'q';

const express = require('express');
import {Application} from 'express';

const readAllNewsletters = require('./read-all-newsletters.route');
const addPushSubscriber = require('./add-push-subscriber.route');
const sendNewsletter = require('./send-newsletter.route');

const bodyParser = require('body-parser');
const app: Application = express();
const webpush = require('web-push');

const vapidKeys = {
  publicKey: 'BP8e-Ieji2LmjEznvXFUt0_ck457L8mH4wS0Wes7_ER5dgWfLl3mwH6UW5XasADxzCNKLhnajzNO2oFoUIUNbuE',
  privateKey: '872cUOzYr8Q81-quxiaSG4pFq7LZf0UOBe3dRCKQTXw'
};

webpush.setVapidDetails('mailto:germanvs93@hotmail.com', vapidKeys.publicKey, vapidKeys.privateKey);

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// REST API
app.route('/api/newsletters')
  .get(readAllNewsletters);

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);

// launch an HTTP Server
const httpServer = app.listen(9000, () => {
  console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
});

