'use strict';

var chai = require('chai');
var sinon = require('sinon');
var mqtt = require('mqtt');
var log = require('debug')('test:mqtt-router');
var expect = chai.expect;
var mqttrouter = require('../index.js');

describe('client', function () {

  it('should route one message to the handler', function (done) {

    var mqttclient = mqtt.createClient();

    var firstTopic = 'TEST/localtime/request';
    var secondTopic = 'TEST/localtime/reply';

    function check(){
      expect(callback.calledOnce).to.be.true;
      expect(callback.getCall(0).args[0]).to.equal(firstTopic);
      done();
    }

    var callback = sinon.spy(function(topic, message){
      log('msg', topic, message);
      check();
    });

    var router = mqttrouter.wrap(mqttclient);
    router.subscribe(firstTopic, callback);

    log('publish', firstTopic);
    mqttclient.publish(firstTopic, 'hello firstTopic!');

    log('publish', secondTopic);
    mqttclient.publish(secondTopic, 'hello secondTopic!');


  });
});
