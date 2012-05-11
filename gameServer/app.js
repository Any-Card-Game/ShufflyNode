var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  child_process = require('child_process'),
  _und = require("underscore");

global._und = _und;

require('fibers');
 


/*var d = gts.Sevens();
d.constructor();
d.runGame();
*/

app.listen(81);
io.set('log level', 1);
verbose = false;
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

var games = 0;
io.sockets.on('connection', function (socket) {
    var rooms = [];
    rooms.push({ name: "main room", maxUsers: 10, roomID: 0, players: [] }); //make a model


    var jm = Fiber(function () {
        console.log('wait... ' + new Date);
        require('./gameTest.js');
        var sev = Sevens();
        sev.constructor();
        sev.runGame();
        console.log('gameover ' + new Date);
    });



    console.log('setup');



    socket.on('Area.Game.StartGame', function (data) {
        socket.emit('Area.Game.GameStarted');
        games++;
        console.log('start '+games);
        var answ = jm.run();


        socket.emit('Area.Game.AskQuestion.' + answ.user.userName, answ); //write new emit to send to specific user
        if (verbose) {
            console.log(JSON.stringify(answ));
        }
        console.log(answ.user.userName + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }
    });


    socket.on('Area.Game.AnswerQuestion', function (data) {
        console.log('aa')
        var answ;
        var anw = { value: data.value };
        answ = jm.run(anw);
        if (!answ) {
            socket.emit('Area.Game.GameOver'); //write new emit to send to specific user

            return;

        }
        socket.emit('Area.Game.AskQuestion', { user: answ.user, question: answ }); //write new emit to send to specific user
        if (verbose) {
            console.log(JSON.stringify(answ));
        }
        console.log(answ.user.userName + ": " + answ.question + "   ");
        for (var i = 0; i < answ.answers.length; i++) {
            console.log("     " + i + ": " + answ.answers[i]);
        }
    });
});