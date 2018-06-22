/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/svjs-message-broker
 * License: MIT, see file 'LICENSE'
 */
import {MessageBroker} from "../src/svjs-message-broker/MessageBroker.js"
import assert from 'assert';

describe("MessageBroker", function() {

    it("should allow subscription for a topic", function (done) {
        const messageBroker = new MessageBroker()
        const callbackFunction = function() {
        }
        messageBroker.subscribe("test1", callbackFunction)
        assert.equal(messageBroker.topics["test1"][0], callbackFunction)
        done()
    })

    it("should publish a message to a subscriber", function (done) {
        const messageBroker = new MessageBroker()
        const callbackFunction = function() {
            done()
        }
        messageBroker.subscribe("test1", callbackFunction)
        assert.equal(messageBroker.topics["test1"][0], callbackFunction)
        messageBroker.publish("test1")
    })

    it("should subscribe multiple subscribers and unsubscribe one for a topic", function (done) {
        const messageBroker = new MessageBroker()

        const callbackFunction1 = function() {
            assert.fail()
        }
        const callbackFunction2 = function() {
            done()
        }
        const callbackFunction3 = function() {
            assert.fail()
        }

        messageBroker.subscribe("test1", callbackFunction1)
        messageBroker.subscribe("test1", callbackFunction2)
        messageBroker.subscribe("test2", callbackFunction3)
        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(2, messageBroker.topics["test1"].length)
        assert.equal(1, messageBroker.topics["test2"].length)

        messageBroker.unsubscribe("test1", callbackFunction1)

        assert.equal(2, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics["test1"].length)
        assert.equal(1, messageBroker.topics["test2"].length)

        assert.equal(messageBroker.topics["test1"][0], callbackFunction2)
        assert.equal(messageBroker.topics["test2"][0], callbackFunction3)

        messageBroker.publish("test1")
    })

    it("should unsubscribe all callbacks for a topic", function(done) {
        const messageBroker = new MessageBroker()

        const callbackFunction1 = function() {
            assert.fail()
        }
        const callbackFunction2 = function() {
            assert.fail()
        }
        const callbackFunction3 = function() {
            done()
        }

        messageBroker.subscribe("test1", callbackFunction1)
        messageBroker.subscribe("test1", callbackFunction2)
        messageBroker.subscribe("test2", callbackFunction3)

        messageBroker.unsubscribe("test1")

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(undefined, messageBroker.topics["test1"])
        assert.equal(1, messageBroker.topics["test2"].length)

        assert.equal(messageBroker.topics["test2"][0], callbackFunction3)

        messageBroker.publish("test1")
        messageBroker.publish("test2")
    })

    it("should unsubscribe all topics for a callback", function(done) {
        const messageBroker = new MessageBroker()

        const callbackFunction1 = function() {
            assert.fail()
        }
        const callbackFunction2 = function() {
            done()
        }

        messageBroker.subscribe("test1", callbackFunction1)
        messageBroker.subscribe("test1", callbackFunction2)
        messageBroker.subscribe("test2", callbackFunction1)

        messageBroker.unsubscribe(null, callbackFunction1)

        assert.equal(1, Object.keys(messageBroker.topics).length)
        assert.equal(1, messageBroker.topics["test1"].length)
        assert.equal(undefined, messageBroker.topics["test2"])

        assert.equal(messageBroker.topics["test1"][0], callbackFunction2)

        messageBroker.publish("test1")
        messageBroker.publish("test2")
    })

    it("should publish data", function(done) {
        const messageBroker = new MessageBroker()

        const dataMock = {
            text: "lorem ipsum"
        }
        const callbackFunction = function(data) {
            assert.equal(dataMock, data)
            done()
        }

        messageBroker.subscribe("test1", callbackFunction)
        messageBroker.publish("test1", dataMock)
    })

})