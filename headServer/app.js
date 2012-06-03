var fs = require('fs');

var __dirname = '/usr/local/src/headServer';
var indexPageData;


var siteServer = ['http://li428-241.members.linode.com:82'];
var gameServer = 'http://li428-241.members.linode.com:81';


var indexForSites = [];

fs.readFile(__dirname + '/index.html',
    function (err, data) {
        indexPageData = data;

        for (var i = 0; i < siteServer.length; i++) {
            indexForSites.push(indexPageData.toString().replace('{{siteServer}}', siteServer[i]).replace('{{gameServer}}', gameServer));
        }

        require('http').createServer(handler).listen(80);
    });

function handler(req, res) {
    res.writeHead(200, { 'Content-Type': "text/html" });
    res.end(indexForSites[0]);
}

