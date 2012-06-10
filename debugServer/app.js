

var app = require('http').createServer(function handler(req, res) { res.end(); });
var io = require('socket.io').listen(app);
app.listen(83);


var fs = require('fs');
var arrayUtils = require('../common/ArrayUtils.js');

//var cIO = require('socket.io-node-client'); 
//var client = cIO.createClient('127.0.0.1', { port: 81 });
//client.on('Area.Debug.GetGameSource', function (data) {

io.sockets.on('connection', function (socket) {
    socket.on('Area.Debug.GetGameSource.Request', function (data) {
        fs.readFile('/usr/local/src/games/' + data.gameName + '/app.js', function (err, data2) {
            socket.emit('Area.Debug.GetGameSource.Response', { value: data2.toString() });
        });
    });
});

 