'use strict';

const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

// credentials can also be added here.  keep them safe maybe in config folder or .env!!!
AWS.config.update({ region: 'us-east-2' });

const message = process.argv[2];

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-east-2:863363541205:rosales-messages';

const payload = {
  Message: message,
  TopicArn: topic,
}

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));



const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/863363541205/deliveredConfirmation.fifo',
  handleMessage: (data) => {
    let body = JSON.parse(data.Body);
    console.log('message Received: ', body);
  }
});

app.start();