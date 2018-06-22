/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-message-broker
 * License: MIT, see file 'LICENSE'
 */

export class MessageBroker {

    constructor() {
        this.topics = []
    }

    subscribe(topic, subscriber) {
        if (this.topics[topic] === undefined) {
            this.topics[topic] = []
        }
        if (this.topics[topic].indexOf(subscriber) === -1) {
            this.topics[topic].push(subscriber)
        }
    }

    unsubscribe(topic = null, subscriber = null) {
        if(subscriber !== null && topic !== null) {
            this.topics[topic].splice(this.topics[topic].indexOf(subscriber), 1)
        } else if (subscriber === null && topic !== null) {
            this.topics[topic] = []
        } else if (topic === null && subscriber !== null) {
            for (const topicName in this.topics) {
                const topic = this.topics[topicName]
                for (const topicSubscriber of topic) {
                    if(topicSubscriber === subscriber) {
                        this.unsubscribe(topicName, subscriber)
                    }
                }
            }
        } else {
            this.topics = []
        }
        if(topic !== null) {
            if(this.topics[topic] && this.topics[topic].length === 0) {
                delete this.topics[topic]
            }
        }
    }

    publish(topic, data = null) {
        if (this.topics[topic]) {
            this.topics[topic].forEach(function (subscriber) {
                setTimeout(function () {
                    subscriber(data)
                })
            })
        }
    }

}
