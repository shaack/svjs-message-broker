# svjs-message-broker

ES6 component to provide a subscriber and publish pattern for in app communication with loose bindung.

It's just a simple message broker and it works.

## MessageBroker

- A `Subscriber` (callback) can subscribe to a `message type` (topic)
- The `MessageBroker` can publish asynchronous messages with data to `Subscribers`

## Usage

### Subscribe and publish

```javascript
import {MessageBroker} from "./src/svjs-message-broker/MessageBroker.js"

const messageBroker = new MessageBroker()

const testMessage = function(data) {
    this.data = data
}
const subscriber = function(message) {
    console.log(message.data)
}

// subscribe to message type/topic 'testMessage'
messageBroker.subscribe(testMessage, subscriber)

// publish a message of type 'testMessage'
messageBroker.publish(new testMessage("Hello"))
```

### Unsubscribe

Unsubscribe a subscriber for a message type
```javascript
messageBroker.unsubscribe(testMessage, subscriber)
```

Unsubscribe all subscribers for a message type
```javascript
messageBroker.unsubscribe(testMessage)
```

Unsubscribe all topic for a subscriber
```javascript
messageBroker.subscribe(null, subscriber)
```

## Test

Run Mocha tests with

```bash
npm test
```
