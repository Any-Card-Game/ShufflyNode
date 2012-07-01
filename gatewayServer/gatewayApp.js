var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');

var qWatcher = require('../common/queueWatcher.js'), qItemCollection = require('../common/queueItemCollection.js'), qPusher = require('../common/queuePusher.js');

app.listen(1887);
io.set("log level", 1);


function handler(req, res) {
    res.end();
}

var qpCollection = new qItemCollection([new qPusher("SiteServer"), new qPusher("GameServer"), new qPusher("DebugServer"), new qPusher("ChatServer")]);
var qwCollection = new qItemCollection([new qWatcher("GatewayServer", messageReceived)]);

function messageReceived(message) {
    var user;
    //console.log('got message');
    if ((user = users[message.userName]) != null) {
        user.socket.emit("Client.Message", { channel: message.channel, content: message.data });
    }
}

var users = [];

io.sockets.on('connection', function (socket) {

    socket.on('Gateway.Message', function (data) {
        //console.log('top message');

        var channel;
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

        var qp = qpCollection.getByChannel(channel);
        if (!qp) {
            throw new Exception('bad channel');
        }
        //console.log('btot');

        qp.message({ userName: socket.user.userName, channel: data.channel, content: data.content });
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

    socket.emit('Client.Welcome', {});
});
