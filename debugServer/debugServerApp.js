var fs = require('fs');
require('../common/Help.js');

var queueManager = require('../common/queueManager.js');
var qManager = new queueManager('Debug1', { watchers: ["DebugServer"], pushers: ["GatewayServer", "Gateway*"] });

qManager.addChannel('Area.Debug2.GetGameSource.Request', function (sender, data) { 
    fs.readFile('/usr/local/src/games/' + data.gameName + '/app.js', function (err, data2) {
        qManager.sendMessage(sender.user, sender.gateway, "Area.Debug.GetGameSource.Response", data2.toString());
    });
});


