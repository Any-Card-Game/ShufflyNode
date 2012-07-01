
var qItemCollection = require('../common/queueItemCollection.js'), qPusher = require('../common/queuePusher.js'), qWatcher = require('../common/queueWatcher.js');

var channels = {};
function addChannel(channel, callback) {
    channels[channel] = callback;
}



function messageReceived(message) { 
    if (channels[message.channel]) {
        channels[message.channel](message.content,message.userName);
    }
}
 

var fs = require('fs');
var arrayUtils = require('../common/arrayUtils.js');
var qpCollection = new qItemCollection(new qPusher("GatewayServer"));

addChannel('Area.Debug2.GetGameSource.Request', function (data, userName) {

    fs.readFile('/usr/local/src/games/' + data.gameName + '/app.js', function (err, data2) {
        qpCollection.getByChannel("GatewayServer").message({ userName: userName,data: { userName: userName, channel: 'Area.Debug.GetGameSource.Response', content: { value: data2.toString()}} });
    });
});

var qwCollection = new qItemCollection(new qWatcher("DebugServer", messageReceived));
