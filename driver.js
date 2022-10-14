'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
const Chance = require('chance');
const chance = new Chance();

const producer = Producer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/863363541205/deliveredConfirmation.fifo',
  region: 'us-east-2'
});

async function delivered(data){
  let message = '';
  try {
    let body = JSON.parse(data.Body)
    message = body.Message
    console.log(message);
  } catch (e){
    console.log('didn\'t work', e.message);
  }

  let stringifiedMessage = JSON.stringify(message)

  let payload = {
    id: "Id",
    body: stringifiedMessage,
    groupId: 'group18',
    deduplicationId: chance.postal(), 
  }
  
  try {
    let response = await producer.send(payload);
    console.log(response);
  } catch (e) {
    console.log(e)
  }

}


const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/863363541205/confirmed',
  handleMessage: delivered
});


app.start();
