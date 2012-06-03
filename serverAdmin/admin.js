var fs = require('fs');

var util = require('util'),
    spawn = require('child_process').spawn;
    


var __dirname = '/usr/local/src/';
var indexPageData;


/*fs.readFile(__dirname + '/index.html',
    function(err, data) {

    });*/
var head, sites, games, nodeInspector;

var debug = false;

function loop() {
    ask('?: ', '', function (data) {
        var rest = data.substring(2);
        switch (data[0]) {
            case 'd':
                debug = !debug;
                console.log('Debug ' + (debug ? 'Enabled' : 'Disabled'));
                break;
            case 's':
                sites = [];
                games = [];

                head = runProcess('node', [__dirname + 'headServer/app.js']);
                console.log('Head Started');
                nodeInspector = runProcess('node-inspector', []);
                console.log('Head Started');
                sites.push(runProcess('node', [__dirname + 'siteServer/app.js']));
                console.log(sites.length + ' Sites Started');
                games.push(runProcess('node', [__dirname + 'gameServer/app.js']));
                console.log(games.length + ' Games Started');

                break;
            case 'r':

                if (rest.length == 0) {
                    restartProcs('h');
                    restartProcs('g');
                    restartProcs('s');
                } else {
                    restartProcs(rest[0]);

                }
                break;
            case 'k':
                if (rest.length == 0) {
                    if (head) {
                        head.kill();
                    }
                    for (var i = 0; i < games.length; i++) {
                        games[i].kill();
                    }
                    for (var i = 0; i < sites.length; i++) {
                        sites[i].kill();
                    }
                    if(!nodeInspector.killed)
                        nodeInspector.kill();
                    console.log('All killed');
                } else {
                    restartProcs(rest[0]);

                }
                break;
        }
        loop();
    });
}

loop();

function restartProcs(letter) {
    switch (letter) {
        case 'h':
            console.log('Restarting head');
            if (head) {
                head.kill();
            }

            head = runProcess('node', [__dirname + 'headServer/app.js']);
            break;
        case 'g':
            console.log('Restarting games');
            for (var i = 0; i < games.length; i++) {
                games[i].kill();
            }

            games = [];

            games.push(runProcess('node', [__dirname + 'gameServer/app.js']));
            break;
        case 's':
            console.log('Restarting sites');
            for (var i = 0; i < sites.length; i++) {
                sites[i].kill();
            }

            sites = [];

            sites.push(runProcess('node', [__dirname + 'siteServer/app.js']));
            break;
    }

}

function ask(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function (data) {
        data = data.toString().trim();
         
            callback(data);
      
    });
}

function runProcess(process, args) {
    if(debug) {
        var args2 = [];
        args2.push('--debug-port=3838');
        for (var i = 0; i < args.length; i++) {
            args2.push(args[i]);
        }
    }
    var dummy = spawn(process, args);
    dummy.stdout.on('data', function (data) {
        util.print(process + ': ' + data);
    });
    return dummy;
}