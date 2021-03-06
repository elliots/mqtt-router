# mqtt-router [![Build Status](https://drone.io/github.com/wolfeidau/mqtt-router/status.png)](https://drone.io/github.com/wolfeidau/mqtt-router/latest)

This module a router for use with MQTT subscriptions.

[![NPM](https://nodei.co/npm/mqtt-router.png)](https://nodei.co/npm/mqtt-router/)
[![NPM](https://nodei.co/npm-dl/mqtt-router.png)](https://nodei.co/npm/mqtt-router/)

## Installation

```
npm install mqtt-router
```

# TLDR

If you have just started with [MQTT](https://github.com/adamvr/MQTT.js) the first thing you will notice is there is only callback registered for on Message,
even though you can register multiple subscriptions.. It is therefore up to you the developer to route these to the
correct handler, which is why I wrote this library.

# usage

```javascript
var mqtt = require('mqtt')
  , mqttrouter = require('mqtt-router')
  , host = 'localhost'
  , port = '1883';

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clientId: 'client-1'
}

// client connection
var client = mqtt.createClient(port, host, settings);

// enable the subscription router
var router = mqttrouter.wrap(client);

// subscribe to messages for 'hello/me'
router.subscribe('hello/me', function(topic, message){
  console.log('received', topic, message);
});

// subscribe to messages for 'hello/you'
router.subscribe('hello/you', function(topic, message){
  console.log('received', topic, message);
});
```

*NOTE:* This currently just does simple subscriptions without wildcards, this is something I will work on next.

# TODO

* Work on wild cards using $ and # in the subscription.
* Look at using more of [houkou](https://github.com/deoxxa/houkou) to break up the the topic into params enabling more generic handlers.

## License
Copyright (c) 2013 Mark Wolfe
Licensed under the MIT license.