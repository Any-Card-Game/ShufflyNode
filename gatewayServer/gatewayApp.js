require('../common/Help.js');

var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');
var guid = require("../common/guid.js");

var pubsub = require('../common/pubsub.js');
var queueManager = require('../common/queueManager.js');


var redis = require("redis");
var client2 = redis.createClient();
redis.debug_mode = false;

var port = 1880 + (Math.random() * 4000 | 0);

app.listen(port);
io.set("log level", 1);
function handler(req, res) {
    res.end();
}

var gatewayIndex = 'Gateway ' + guid();


var ps = new pubsub(function () {
    ps.subscribe("PUBSUB.GatewayServers.Ping", function (message) {
        //console.log('polled');
        ps.publish("PUBSUB.GatewayServers", "http://" + Common.GatewayIP + ":" + port);
    });
    ps.publish("PUBSUB.GatewayServers", "http://" + Common.GatewayIP + ":" + port);

});

var qManager = new queueManager(gatewayIndex, {
    watchers: [["GatewayServer", messageReceived], [gatewayIndex, messageReceived]],
    pushers: ["SiteServer", "GameServer", "GameServer*", "DebugServer", "ChatServer", "HeadServer"]
});



function messageReceived(gateway, user, eventChannel, content) {



    var u;
    //console.log('got message');
    if ((u = users[user.userName]) != null) {
        u.socket.emit("Client.Message", { user: user, channel: eventChannel, content: content });
    }
}

var users = [];

io.sockets.on('connection', function (socket) {

    socket.on('Gateway.Message', function (data) {
        //console.log('top message');

        var channel = 'BAD';
        switch (data.channel.split('.')[1]) {
            case 'Game':
                channel = 'GameServer';
                break;
            case 'Site':
                channel = 'SiteServer';
                break;
            case 'Debug':
                channel = 'GameServer';
                break;
            case 'Debug2':
                channel = 'DebugServer';
                break;
            case 'Chat':
                channel = 'ChatServer';
                break;
        }


        qManager.sendMessage(socket.user, data.gameServer || channel, data.channel, data.content);
        //console.log('afters message');

    });



    socket.on('Gateway.Login', function (data) {
        users[data.userName] = ({ socket: socket, userName: data.userName });
        socket.user = users[data.userName];
    });

    socket.on('disconnect', function (data) {
        console.log('discconectionsasdf');
        if (data && data.userName) {
            if (users[data.userName])
                delete users[data.userName];
        }
    });

    //  socket.emit('Client.Welcome', {});
});
