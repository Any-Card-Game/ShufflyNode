var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');

var queueManager = require('../common/queueManager.js');

app.listen(1888);
io.set("log level", 1);
function handler(req, res) {
    res.end();
}

var qManager = new queueManager('Gateway1', {
    watchers: [["GatewayServer", messageReceived], ["Gateway1", messageReceived],"HeadServer"],
    pushers: ["SiteServer", "GameServer", "DebugServer", "ChatServer", "HeadServer"]
});

function messageReceived(gateway, user, eventChannel, content) {

    if (eventChannel == "Gateway.HeadUpdate") {
        console.log('head   ' );
        
        qManager.sendMessage('', "HeadServer", "Head.GatewayUpdate", "http://50.116.28.16:1888");

        return;
    }

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

        qManager.sendMessage(socket.user, channel, data.channel, data.content);
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
