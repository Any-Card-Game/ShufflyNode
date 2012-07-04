require('../common/Help.js');

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

var queueManager = require('../common/queueManager.js');
var pubsub = require('../common/pubsub.js');


var ps = new pubsub(function () {
    ps.subscribe("PUBSUB.GatewayServers", function (message) {
        indexForSites.push(indexPageData.toString().replace('{{gateway}}', message));
        gateways.push(message);
        //console.log(indexForSites.length);
    });
})


require('http').createServer(handlerWS).listen(8844);

function ready(err, content) {
    indexPageData = content;

    require('http').createServer(handler).listen(80);
}
var siteIndex = 0;

var oldGateways = [];
var gateways = [];

qManager.addChannel("Head.GatewayUpdate", function (user, data) {
    // console.log('got poll   ' + data);
    indexForSites.push(indexPageData.toString().replace('{{gateway}}', data));
    gateways.push(data);

});
var oldIndex = [];
setInterval(pollGateways, 5000);
function pollGateways() {
    //console.log('polling');
    ps.publish("PUBSUB.GatewayServers.Ping", '');

    //    qManager.sendMessage('', 'GatewayServer', "Gateway.HeadUpdate", 1);
    if (indexForSites.length > 0)
        oldIndex = indexForSites;
    if (gateways.length > 0)
        oldGateways = gateways;

    indexForSites = [];
    gateways = [];
    siteIndex = 0;
}

pollGateways();
function handler(req, res) {

    if (oldIndex.length > 0) {
        res.writeHead(200, { 'Content-Type': "text/html" });
        var inj = (siteIndex++) % oldIndex.length;
        res.end(oldIndex[inj]);
        console.log('serving' + oldGateways[inj]);
        return;
    }
    setTimeout(function () {

        if (oldIndex.length > 0) {
            res.writeHead(200, { 'Content-Type': "text/html" });
            var inj = (siteIndex++) % oldIndex.length;
            res.end(oldIndex[inj]);
            //console.log('serving' + oldGateways[inj]);
            
        } else {
            res.writeHead(200, { 'Content-Type': "text/html" });
            res.end();
        }
    }, 1000);
}

function handlerWS(req, res) {
    if (oldGateways.length > 0) {
        res.end(oldGateways[(siteIndex++) % oldGateways.length]);
        return;
    }
    setTimeout(function () {

        if (oldGateways.length > 0) {
            res.end(oldGateways[(siteIndex++) % oldGateways.length]);
        } else {
            res.end('bad');
        }
    }, 1000);
}

