var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var child_process = require('child_process');
var cJSON = require("./cJSON.js");
var guid = require("./guid.js");
var arrayUtils = require('../common/ArrayUtils.js');

//var agent = require('webkit-devtools-agent');

//var profiler = require('v8-profiler');
var ajj = 0;

require('fibers');


app.listen(81);
io.set('log level', 1);

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
    totalPlayers: 0,
    totalQuestionsAnswered: 0,
    toString: function () {
        return "Total: " + this.totalGames + "\n Running: " + this.runningGames() + "\n Total Players: " + this.totalPlayers + "\n Answered: " + this.totalQuestionsAnswered;
    },
    runningGames: function () {
        return this.totalGames - this.finishedGames;
    }
};

process.on('exit', function () {
    console.log('exiting ');
});

var rooms = [];
var startTime = new Date().getTime();

var cachedGames = [];


function sanitize(name, value) { if (name != 'socket' && name != 'fiber' && name != 'debuggingSocket') return value; }


require('./../gameFramework/gameUtils.js');
require('./../gameFramework/GameAPI.js');
var requiredShuff = require('./../gameFramework/shuff.js');

io.sockets.on('connection', function (socket) {
    socket.on('Area.Game.Create', function (data) {
        var room;
        rooms.push(room = { name: data.name, maxUsers: 6, debuggable: false, gameName: data.gameName, roomID: guid(), answers: [], players: [], started: false }); //make a model 
        room.players.push({ name: data.user.name, socket: socket }); //make a model
        var gameObject;
        //todo::: sanatize game name
        if (cachedGames[room.gameName]) {
            gameObject = cachedGames[room.gameName];

        } else {
            gameObject = require('./../games/' + room.gameName + '/app.js');
        }
        room.fiber = createFiber(room, gameObject, false);

        room.unwind = function (players) {
            gameData.finishedGames++;
            console.log('--game closed');
            for (var i = 0; i < players.length; i++) {
                players[i].socket.disconnect();
            }
        };
        socket.room = room;

        emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, sanitize)));
    });

    socket.on('Server.Head.Connect', function (data) {
        setInterval(function () {
            socket.emit('Server.Head.Ping', { rooms: rooms.length });

        }, 5000);
    });

    socket.on('Area.Debug.Create', function (data) {
        var room;
        rooms.push(room = { name: data.name, maxUsers: 6, debuggable: true, gameName: data.gameName, roomID: guid(), answers: [], players: [], started: false }); //make a model 
        room.players.push({ name: data.user.name, socket: socket }); //make a model
        socket.room = room;


        var module = {};
        eval(applyBreakpoints(data.source, data.breakPoints));
        var sevens = module.exports;

        room.fiber = createFiber(room, sevens, true);
        room.unwind = function (players) {
            gameData.finishedGames++;
            console.log('--game closed');
            for (var i = 0; i < players.length; i++) {
                players[i].socket.disconnect();
            }
        };
        socket.room = room;
        emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, sanitize)));

    });


    function createFiber(room, gameObject, emulating) {
        return Fiber(function (players) {
            if (!players || !players.length) return true;
            room.players = players;
            console.log('game started');
            var sev = new gameObject();
            sev.cardGame.emulating = emulating;
            room.game = sev;
            sev.shuff = requiredShuff;

            sev.cardGame.setAnswers(room.answers);
            sev.cardGame.setPlayers(players);
            gameData.totalGames++;
            gameData.totalPlayers += players.length;
            sev.cardGame.answerIndex = 0;
            sev.constructor();
            sev.runGame();

            room.unwind(players);
            //gameData.totalPlayers -= players.length;
        });
    }



    socket.on('Area.Game.Join', function (data) {

        var room = arrayUtils.first.call(rooms, (function (j, ind) { return j.roomID == data.roomID; }));
        if (!room) {
            return;
        }
        room.players.push(socket.player = { name: data.user.name, socket: socket }); //make a model
        socket.room = room;
        emitAll(room, 'Area.Game.RoomInfo', JSON.parse(JSON.stringify(room, sanitize)));

    });

    socket.on('disconnect', function (data) {
        if (socket.room == null)
            return;
        socket.room.players.splice(socket.room.players.indexOf(socket.player), 1);

        if (socket.room.players.length) {
            rooms.splice(rooms.indexOf(socket.room), 1);

        }
        socket.room.unwind(socket.room.players);

        socket.room = null;

    });

    socket.on('Area.Game.GetGames', function (data) {
        socket.emit('Area.Game.RoomInfos', JSON.parse(JSON.stringify(rooms, sanitize)));
    });

    socket.on('Area.Game.DebuggerJoin', function (data) {
        var room = arrayUtils.first.call(rooms, (function (j, ind) { return j.roomID == data.roomID; }));
        if (!room) {
            return;
        }
        if (!room.debuggable) {
            return;
        }
        socket.room = room;
        room.debuggingSocket = socket;
        console.log('debuggable');

    });


    socket.on('Area.Game.Start', function (data) {
        var room = arrayUtils.first.call(rooms, (function (j, ind) { return j.roomID == data.roomID; }));

        if (!room) {
            return;
        }
        if (!room.players || !room.players.length) {
            console.log('baaaaxxaaaaaaaaaaaaaaad');
            return true;
        }


        emitAll(room, 'Area.Game.Started', JSON.parse(JSON.stringify(room, sanitize)));
        room.started = true;
        //  profiler.takeSnapshot('game started ' + room.roomID);

        var answ = room.fiber.run(room.players);
        handleYield(room, answ);
    });



    socket.on('Area.Game.GetRooms', function (data) {
        socket.emit('Area.Game.GetRoomsResponse', JSON.parse(JSON.stringify(rooms, sanitize)));
    });
    socket.on('Area.Debug.Continue', function (data) {
        var room = socket.room;
        var answ = room.fiber.run(null);
        handleYield(room, answ);
    });


    socket.on('Area.Debug.PushNewSource', function (data) {
        var room = socket.room;

        var module = {};
        eval(applyBreakpoints(data.source, data.breakPoints));
        var sevens = module.exports;

        room.fiber = createFiber(room, sevens, true);
        var answ = room.fiber.run(room.players);
        handleYield(room, answ);

    });
    socket.on('Area.Debug.VariableLookup.Request', function (data) {
        var room = socket.room;
        var answ = room.fiber.run({ variableLookup: data.variableName });
        if (!answ.type == 'variableLookup')
            return;

        socket.emit('Area.Debug.VariableLookup.Response', { value: answ.value });

    });

    function applyBreakpoints(source, points) {
        source = source.split('\n');
        points.sort(function (a, b) { return b - a; });
        for (var i = 0; i < points.length; i++) {
            source.splice(points[i], 0, "self.shuff.break_(" + points[i] + ",self.cardGame, function (variable) { var goodVar; eval('goodVar=' + variable); return goodVar; });");
        }
        return source.join('\n');
    }

    socket.on('Area.Debug.ModifyBreakpoint.Request', function (data) {
        var room = socket.room;

        var module = {};
        eval(applyBreakpoints(data.source, data.breakPoints));
        var sevens = module.exports;

        room.fiber = createFiber(room, sevens, true);
        var answ = room.fiber.run(room.players);
        handleYield(room, answ);


        socket.emit('Area.Debug.ModifyBreakpoint.Response', { value: answ.value });
    });

    var now;

    socket.on('Area.Game.AnswerQuestion', function (data) {
        now = new Date().getMilliseconds();

        var room = arrayUtils.first.call(rooms, (function (j, ind) { return j.roomID == data.roomID; }));

        if (!room) {
            return;
        }

        room.answers.push({ value: data.answer });
        //        console.log('----game question asked');
        var answ = room.fiber.run({ value: data.answer });
        //        console.log('----game question answered');


        gameData.totalQuestionsAnswered++;
        if (!answ) {
            emitAll(room, 'Area.Game.GameOver', '');
            room.fiber.run();
            //var snapshot = profiler.takeSnapshot('vava' + (ajj++));
            //     profiler.takeSnapshot('game over ' + room.roomID);
            return;
        }
        handleYield(room, answ);

        //        console.log('----game question before sent');

        //        console.log('----game question sent');

    });

    function handleYield(room, obj) {
        switch (obj.type) {
            case 'askQuestion':
                var answ = obj.question;

                if (!answ) {
                    emitAll(room, 'Area.Game.GameOver', '');
                    room.fiber.run();
                    //     profiler.takeSnapshot('game over ' + room.roomID);
                    return;
                }
                askQuestion(answ, room);
                console.log(gameData.toString());

                var dt = new Date();
                var then = dt.getMilliseconds();
                console.log(then - now + " Milliseconds");
                console.log(gameData.totalQuestionsAnswered / ((dt.getTime() - startTime) / 1000) + " Answers per seconds");

                break;
            case 'gameOver':


                break;
            case 'log':
                if (!room.game.cardGame.emulating && room.debuggable) {
                    console.log(gameData.toString());
                    room.debuggingSocket.emit('Area.Debug.Log', { value: obj.contents });
                }
                var answ = room.fiber.run();
                handleYield(room, answ);


                break;

            case 'break':
                if (!room.debuggable) {
                    var answ = room.fiber.run();
                    handleYield(room, answ);
                    return;
                }
                if (!room.game.cardGame.emulating) {
                    room.debuggingSocket.emit('Area.Debug.Break', { lineNumber: obj.lineNumber + 2 });
                }
                break;
        }
    }


});


function deflate(str) {
    return str;
}

function inflate(str) {
    return str;
}



function askQuestion(answ, room) {
    if (!room.players || !room.players.length || !answ.user) return;

    var user = arrayUtils.first.call(room.players, (function (u) {

        if (!u) return;

        return u.name == answ.user.name;
    }));

    user.socket.emit('Area.Game.AskQuestion',
        JSON.parse(JSON.stringify({ question: answ.question, answers: answ.answers }, sanitize)));

    emitAll(room, 'Area.Game.UpdateState', JSON.parse(JSON.stringify(answ.cardGame, sanitize)));


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
