var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , child_process = require('child_process');




require('fibers');

    var shuf = { };

    var jm=Fiber(function() {
        console.log('wait... ' + new Date);
require('./gameTest.js');
        
        var sev = Sevens();
        sev.constructor();
        sev.runGame();

        console.log('gameover ' + new Date);


    });
    jm.run();

   
  
console.log('setup'); 

/*var d = gts.Sevens();
d.constructor();
d.runGame();
*/

app.listen(80);

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
        console.log('aa')
        var answ;
        var anw = { value: 1 };
        answ = jm.run(anw);
        console.log(JSON.stringify(answ));


        console.log(answ.user.userName + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }



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