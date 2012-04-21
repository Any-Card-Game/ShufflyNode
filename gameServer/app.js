var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  child_process = require('child_process'),
  _und = require("underscore");

global._und = _und;

require('fibers');

var shuf = {};

shuf.jm = Fiber(function () {
    console.log('wait... ' + new Date);
    require('./gameTest.js');
    var sev = Sevens();
    sev.constructor();
    sev.runGame();
    console.log('gameover ' + new Date);
});



console.log('setup');

/*var d = gts.Sevens();
d.constructor();
d.runGame();
*/

app.listen(81);

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
    socket.on('Area.Game.StartGame', function (data) {
        socket.emit('Area.Game.GameStarted');
        console.log('start');

        var answ = shuf.jm.run();


        socket.emit('Area.Game.AskQuestion.' + answ.user.userName, answ); //write new emit to send to specific user
        console.log(JSON.stringify(answ));
        console.log(answ.user.userName + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }
    });


    socket.on('Area.Game.AnswerQuestion', function (data) {
        console.log('aa')
        var answ;
        var anw = { value: data.value };
        answ = shuf.jm.run(anw);
        socket.emit('Area.Game.AskQuestion', { user: answ.user, question: answ }); //write new emit to send to specific user
        console.log(JSON.stringify(answ));
        console.log(answ.user.userName + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }
    });
});