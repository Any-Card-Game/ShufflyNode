var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , s = require('./sHelp.js')
  , models = require('../models/Card.js');

app.listen(82);

function handler(req, res) {
    /*fs.readFile(__dirname + '/index.html',
    function (err, data) {
    if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
    }

    //res.writeHead(200);
    res.writeHead(200, { 'Content-Type': "text/html" });
    res.end(data);
    });*/
    res.end();
}

var cardGames = [];
cardGames.push(new CardGame('sevens'));
cardGames[0].addRoom('mamama', 3);

var players = [];

io.sockets.on('connection', function (socket) {
    var me;
    players.push(me = new Player());
    socket.on('Area.Main.Login.Request', function (data) {
        var verified = false;
        data.user = data.user.toLowerCase();
        if (data.user == "dested" || data.user == "kenny") {
            verified = true;

            me.userName = data.user;
            me._socket = socket;
            socket.player = me;
        }

        socket.emit('Area.Main.Login.Response', { access: verified });
    });

    socket.on('Area.Lobby.ListCardGames.Request', function (data) {
        socket.emit('Area.Lobby.ListCardGames.Response', cardGames.arrayExceptPrivate());
    });
    socket.on('Area.Lobby.ListRooms.Request', function (data) {sec
        var cardGame = cardGames.where(function (J) { return J.name == data.name; });
        socket.emit('Area.Lobby.ListRooms.Response', cardGame.rooms.arrayExceptPrivate());
    });
    

    socket.on('Area.Room.SendChat', function (data) {
        console.log(data);
    });
    socket.on('Area.Room.StartGame', function (data) {
        console.log(data);
    });
    socket.on('Area.Room.PlacePiece', function (data) {
        console.log(data);
    });
});