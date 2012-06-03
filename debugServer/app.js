var fs = require('fs'); 
var arrayUtils = require('../common/ArrayUtils.js');

var cIO = require('socket.io-node-client');


var client = cIO.createClient('127.0.0.1', { port: 81 });

client.on('Area.Game.RoomInfo', function (data) {

});