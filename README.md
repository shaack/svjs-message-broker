# svjs-message-broker

ES6 component to provide a subscriber and publish pattern for in app communication with loose bindung.

It's a simple message broker.

## MessageBroker

- Has `Topics`
- A `Subscriber` (callback) can subscribe to a `Topic`
- Can publish asynchronous messages (data) to `Subscribers`

## Usage

### Subscribe and publish

```javascript
import {MessageBroker} from "./src/svjs-message-broker/MessageBroker.js"

const messageBroker = new MessageBroker()

const subscriber = function(data) {
    // asynchronously called on publish()  
}

// subscribe to 'testTopic'
messageBroker.subscribe("testTopic", subscriber)

// publish a message in 'testTopic'
messageBroker.publish("testTopic", { /* data */ })
```

### Unsubscribe

Unsubscribe one subscriber for a topic
```javascript
messageBroker.unsubscribe("testTopic", subscriber)
```

Unsubscribe all subscriber for a topic
```javascript
messageBroker.unsubscribe("testTopic")
```

Unsubscribe all topic for a subscriber
```javascript
messageBroker.subscribe(null, subscriber)
```

## Test

```bash
npm test
```
