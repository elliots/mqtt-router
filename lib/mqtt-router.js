'use strict';
/*
 * mqtt-router
 * https://github.com/wolfeidau/mqtt-router
 *
 * Copyright (c) 2013 Mark Wolfe
 * Licensed under the MIT license.
 */
var mqtt = require('mqtt');
var Endpoint = require('./endpoint.js');
var log = require('debug')('mqtt-router:router');

var Router = function (mqttclient) {

  this.mqttclient = mqttclient || mqtt.createClient();

  this.endpoints = [];

  var self = this;

  this.mqttclient.on('message', function(topic, message){
    log('message', topic, message);

    self.endpoints.forEach(function(endpoint){
      log('endpoint', endpoint.topic, topic);
      if(endpoint.route.match(topic)){
        endpoint.handlers.forEach(function(handler){
          handler(topic, message);
        });
      }
    });

  });

  this.subscribe = function(topic, handler){

    log('endpoint', topic);

    var endpoint = self._endpointMatches(topic)[0];

    if (endpoint) {
      endpoint.handlers.push(handler);
    } else {
      self.endpoints.push(new Endpoint(topic, handler));
    }
    log('subscribe', topic);
    self.mqttclient.subscribe(topic);

  };

  this._endpointMatches = function (topic) {
    return self.endpoints.map(function (endpoint) {
      if (endpoint.topic === topic) {
        return endpoint;
      }
    });
  };

};


module.exports = Router;
