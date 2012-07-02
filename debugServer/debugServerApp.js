var fs = require('fs');

var queueManager = require('../common/queueManager.js');
var qManager = new queueManager('Debug1',{ watchers: ["DebugServer"], pushers: ["GatewayServer"] });

qManager.addChannel('Area.Debug2.GetGameSource.Request', function (sender, data) { 
    fs.readFile('/usr/local/src/games/' + data.gameName + '/app.js', function (err, data2) {
        qManager.sendMessage(sender.user, "GatewayServer", "Area.Debug.GetGameSource.Response", data2.toString());
    });
});


