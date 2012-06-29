var fs = require('fs');
var fs = require('./../common/ArrayUtils.js');

var __dirname = '/usr/local/src/headServer';
var indexPageData;


var siteServer = ['http://li428-241.members.linode.com:82'];
var gameServer = 'http://li428-241.members.linode.com:81';
var debugServer = 'http://li428-241.members.linode.com:83';




var indexForSites = [];

fs.readFile(__dirname + '/index.html', ready);

function ready(err, content) {
    indexPageData = content;

    var siteSockets = [];

    var rooms = [];

    for (var i = 0; i < siteServer.length; i++) {
        indexForSites.push(indexPageData.toString().replace('{{siteServer}}', siteServer[i]).replace('{{gameServer}}', gameServer).replace('{{debugServer}}', debugServer));



        var cIO = require('socket.io-node-client');
        var client = cIO.createClient('127.0.0.1', { port: 81 });
        (function (ind) {
            client.on('Server.Head.Ping', function (data) {
                rooms[ind] = data.rooms;


                rooms.aggregate(0, function (old, piece) { return old + piece; });
            });
        })(i);
        client.emit('Server.Head.Connect', {});
        
        siteSockets.push(cIO);


 
    }

  
    require('http').createServer(handler).listen(80);
}

function handler(req, res) {
    res.writeHead(200, { 'Content-Type': "text/html" });
    res.end(indexForSites[0]);
}

