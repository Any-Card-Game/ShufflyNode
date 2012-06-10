

var app = require('http').createServer(function handler(req, res) { res.end(); });
var io = require('socket.io').listen(app);
app.listen(83);


var fs = require('fs');
var arrayUtils = require('../common/ArrayUtils.js');

//var cIO = require('socket.io-node-client'); 
//var client = cIO.createClient('127.0.0.1', { port: 81 });
//client.on('Area.Debug.GetGameSource', function (data) {

var rooms = [];

io.sockets.on('connection', function (socket) {
    socket.on('Area.Chat.JoinRoom.Request', function (data) {
        var room = arrayUtils.first.call(rooms, (function (j, ind) { return j.name == data.name; }));
        room.players.push({ socket: socket, name: socket.user });
        socket.emit('Area.Chat.JoinRoom.Response', room);
    });
    socket.on('Area.Chat.CreateRoom.Request', function (data) {
        var room;
        rooms.push(room = { name: data.name, players: [{ socket: socket}], log: [] });
        socket.emit('Area.Chat.CreateRoom.Response', room);
    });
    socket.on('Area.Chat.SendMessage', function (data) {
        room.log.push({ user: socket.name, content: data.value });
    });
    socket.on('Area.Chat.Login.Request', function (data) {
        socket.name = data.name;
    });
    socket.on('Area.Chat.GetInfo.Request', function (data) {
        //return users 
    });
});

 