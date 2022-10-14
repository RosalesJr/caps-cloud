# AWS: AWS: Events

## Author

Luis Rosales

## Deployed Link

![uml](/img/whiteboard19.png)

## How it Works

- SNS Topic: pickup which will receive all pickup requests from vendors(terminal)
- SQS Queue (FIFO): packages which will contain all delivery requests from vendors, in order of receipt.
- Subscribe this queue to the pickup topic so all pickups are ordered
- SQS Queue (Standard) for each vendor (named for the vendor) which will contain all delivery notifications from the drivers

## Credits and Collaborators

Demo code, Stephanie Hill, Brandon Pitts, Tyler main

## Issues Encountered

Most of my issues were solved when I finally was able to correctly subscribe my queue and lambda function to my sns. The second issue I ran into was my terminal yelling at me when trying to push a message using a fifo sqs. But when I finally read that my terminal was yelling at me to add a group id all functionality started working.

## Args / Params

- aws-sdk
- Events
- Payloads
- sqs-consumer
- sqs-producer

## Testing

- Ran test in Lambda tests
- Executed commands in terminal
- Checked Logs in Cloudwatch
- Checked messages in sns queue
- Watched terminal for proper messages sent and received

## Vendors

- Vendors will post “pickup” messages containing delivery information into the SNS pickup topic

- Pickup requests should be moved into a FIFO queue called packages for the drivers automatically

- Vendors should separately subscribe to their personal SQS queue and periodically poll the queue to see delivery notifications

### Drivers

- Drivers will poll the SQS packages queue and retrieve only the next delivery order (message)

- After a time (e.g. 5 seconds), drivers will post a message to the Vendor specific SQS Queue using the queueArn specified in the order object