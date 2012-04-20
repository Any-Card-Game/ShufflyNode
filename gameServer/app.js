var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , gts = require('./gameTest.js')
  , fs = require('fs');

console.log('aaa');

global.askQuestion = function (user, question, answers, cardGame) {
    console.log(user.name + ": " + question + "  ");
    for (var i = 0; i < answers.length; i++) {
        var answ = answers[i];
        console.log(answ + " \r\n");
    }
    return 1;
};

var d = gts.Sevens();
d.constructor();
d.runGame();

app.listen(1337);

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

var rooms = [];
rooms.push({ name: "main room", maxUsers: 10, roomID: 0, players: [] }); //make a model

io.sockets.on('connection', function (socket) {
    socket.on('Area.Main.Login', function (data) {
        var verified = false;
        data.user = data.user.toLowerCase();
        if (data.user == "dested" || data.user == "kenny") {
            verified = true;
            socket.player = { name: data.user }; //to model
        }
        socket.emit('Area.Main.LoginResult', { access: verified });
    });
    socket.on('Area.Lobby.ListRooms', function (data) {
        socket.emit('Area.Lobby.ListRoomsResult', rooms);
    });
    socket.on('Area.Lobby.JoinRoom', function (data) {
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].name == data.name) {
                if (rooms[i].players.length >= rooms[i].maxUsers) {
                    socket.emit('Area.Lobby.JoinRoomResult', { error: "full" }); //to model
                }
                rooms[i].players.push(socket.player);

                socket.emit('Area.Lobby.JoinRoomResult', rooms[i]); //to model
            }
        }
        socket.emit('Area.Lobby.JoinRoomResult', { error: "not found" }); //to model
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