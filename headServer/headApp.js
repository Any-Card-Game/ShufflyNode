var fs = require('fs');
var arrayUtils = require('./../common/arrayUtils.js');

var __dirname = '/usr/local/src/headServer';

var queueManager = require('../common/queueManager.js');

var indexPageData;

var qManager = new queueManager('Head1', {
    watchers: ["HeadServer", "Head1"],
    pushers: ["GatewayServer"]
});

var indexForSites = [];
fs.readFile(__dirname + '/index.html', ready);

function ready(err, content) {
    indexPageData = content;

    require('http').createServer(handler).listen(80);
}

qManager.addChannel("Head.GatewayUpdate", function (user, data) {
    console.log('dadada   ' + data);
    indexForSites.push(indexPageData.toString().replace('{{gateway}}', data));

});
var oldIndex = [];
setInterval(function () {
    qManager.sendMessage('', 'GatewayServer', "Gateway.HeadUpdate", 1);
    if (indexForSites.length > 0)
        oldIndex = indexForSites;
    indexForSites = [];

}, 5000);

function handler(req, res) {

    if (oldIndex.length > 0) {
        res.writeHead(200, { 'Content-Type': "text/html" });
        res.end(oldIndex[0]);
        return;
    }
    setTimeout(function () {

        if (oldIndex.length > 0) {
            res.writeHead(200, { 'Content-Type': "text/html" });
            res.end(oldIndex[0]);
        } else {
            res.writeHead(200, { 'Content-Type': "text/html" });
            res.end();
        }
    }, 1000);
}

