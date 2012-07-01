var fs = require('fs');
var arrayUtils = require('./../common/arrayUtils.js');

var __dirname = '/usr/local/src/headServer';


var gatewayServer = ['http://50.116.28.16:1887']; 
  
var indexForSites = []; 
fs.readFile(__dirname + '/index.html', ready);

function ready(err, content) {
    indexPageData = content;
     
     
    for (var i = 0; i < gatewayServer.length; i++) {
        indexForSites.push(indexPageData.toString().replace('{{gateway}}', gatewayServer[i])); 
    }

  
    require('http').createServer(handler).listen(80);
}

function handler(req, res) {
    res.writeHead(200, { 'Content-Type': "text/html" });
    res.end(indexForSites[0]);
}

