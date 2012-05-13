var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var child_process = require('child_process');
var _und = require("underscore");
var cJSON = require("./cJSON.js");
var guid = require("./guid.js");
var arrayUtils = require('../ArrayUtils.js');


var zlib = require('zlib');

global._und = _und;

require('fibers');



/*var d = gts.Sevens();
d.constructor();
d.runGame();
*/

app.listen(81);
io.set('log level', 1);
io.set('browser client gzip', true);

var verbose = false;
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

var gameData = {
    totalGames: 0,
    finishedGames: 0,
    totalPlayers:0,
    totalQuestionsAnswered: 0,
    toString: function () {
        return "Total: " + this.totalGames + "\n Running: " + this.runningGames() + "\n Total Players: " + this.totalPlayers + "\n Answered: " + this.totalQuestionsAnswered;
    },
    runningGames: function () {
        return this.totalGames - this.finishedGames;
    }
};


var rooms = [];

function askQuestion(answ, room) {

    var user = arrayUtils.first.call(room.players, (function (u) { return u.name == answ.user.name; }));
    user.socket.emit('Area.Game.AskQuestion', cJSON.stringify({ question: answ.question, answers: answ.answers }, ['socket']));

    emitAll(room, 'Area.Game.UpdateState', cJSON.stringify(answ.cardGame, ['socket']));


    if (verbose) {
        console.log(answ.user.name + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }
    }
}
function emitAll(room, message, value) {


    for (var j = 0; j < room.players.length; j++) {
        room.players[j].socket.emit(message, value);
    }

}

io.sockets.on('connection', function (socket) {


    socket.on('Area.Game.Create', function (data) {
        var room;
        rooms.push(room = { name: "main room", maxUsers: 6, roomID: guid(), players: [], started: false }); //make a model 
        room.players.push({ name: data.user.name, socket: socket }); //make a model
        room.fiber = Fiber(function (players) {
            var Sevens = require('./Sevens.js');
            var sev = new Sevens();
            sev.cardGame.setPlayers(players);

            gameData.totalGames++;
            gameData.totalPlayers += players.length;
            room.fiber.sevens = sev;
            sev.constructor();
            sev.runGame();
            gameData.finishedGames++;
            //gameData.totalPlayers -= players.length;
        });

        emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, function (name, value) { if (name != 'socket') return value; })));
    });

    socket.on('Area.Game.Join', function (data) {

        var room = arrayUtils.first.call(rooms, (function (j, ind) { return ind == data.roomID; }))
        if (!room) {
            return;
        }
        room.players.push({ name: data.user.name, socket: socket }); //make a model

        emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, function (name, value) { if (name != 'socket') return value; })));

    });

    socket.on('Area.Game.Start', function (data) {
        var room = arrayUtils.first.call(rooms, (function (j, ind) { return ind == data.roomID; }))

        if (!room) {
            return;
        }

        emitAll(room, 'Area.Game.Started', cJSON.stringify(room, ['socket']));


        var answ = room.fiber.run(room.players);
        askQuestion(answ, room);
        console.log(gameData.toString());
    });


    socket.on('Area.Game.AnswerQuestion', function (data) {
        var room = arrayUtils.first.call(rooms, (function (j, ind) { return ind == data.roomID; }))

        if (!room) {
            return;
        }
        var answ = room.fiber.run({ value: data.answer });


        gameData.totalQuestionsAnswered++;
        if (!answ) {
            room.fiber.run();
            emitAll(room, 'Area.Game.GameOver', '');
            return;
        }
        askQuestion(answ, room);
        console.log(gameData.toString());
    });
});


function deflate(str) {
    return str;
}

function inflate(str) {
    return str;
}