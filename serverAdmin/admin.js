var fs = require('fs');

var util = require('util'),
    exec = require('child_process').exec;



var __dirname = '/usr/local/src/';
var indexPageData;


/*fs.readFile(__dirname + '/index.html',
function(err, data) {

});*/
var head, sites, games, nodeInspector;

var debug = false;

function loop() {
    ask('?: ', '', onAsk);
}

process.on('exit', function () {
    console.log('exiting ');
    onAsk('k');
    runProcess('pkill', ['node']);
});


function onAsk(data) {
    var rest = data.substring(2);
    switch (data[0]) {
        case 'd':
            debug = !debug;
            console.log('Debug ' + (debug ? 'Enabled' : 'Disabled'));
            break;
        case 's':
            sites = [];
            games = [];

            head = runProcess('node', [__dirname + 'headServer/app.js'], 4100);
            console.log('Head Started');
            nodeInspector = runProcess('node-inspector', []);
            console.log('Head Started');
            sites.push(runProcess('node', [__dirname + 'siteServer/app.js'], 4101));
            console.log(sites.length + ' Sites Started');
            games.push(runProcess('node', [__dirname + 'gameServer/app.js'], 4102));
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
                if (!nodeInspector.killed)
                    nodeInspector.kill();
                console.log('All killed');
            } else {
                restartProcs(rest[0]);

            }
            break;
    }
    loop();
}

loop();


function restartProcs(letter) {
    switch (letter) {
        case 'h':
            console.log('Restarting head');
            if (head) {
                head.kill();
            }

            head = runProcess('node', [__dirname + 'headServer/app.js'], 4100);
            break;
        case 'g':
            console.log('Restarting games');
            for (var i = 0; i < games.length; i++) {
                games[i].kill();
            }

            games = [];

            games.push(runProcess('node', [__dirname + 'gameServer/app.js'], 4101));
            break;
        case 's':
            console.log('Restarting sites');
            for (var i = 0; i < sites.length; i++) {
                sites[i].kill();
            }

            sites = [];

            sites.push(runProcess('node', [__dirname + 'siteServer/app.js'], 4102));
            break;
    }

}

function ask(question, format, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        data = data.toString().trim();

        callback(data);

    });
}

function runProcess(process, args, debugPort) {
    console.log('start ' + process + ' ' + args.join());

    if (process != 'node-inspector' && debug) {
        args[0] = ' --debug=' + debugPort + " " + args[0];
        console.log('debugging ' + process + ' ' + args.join());
    }
    var dummy = exec(process + args.join());
    dummy.stdout.on('data', function (data) {
        util.print(process + ': ' + data);
    });
    dummy.stderr.on('data', function (data) {
        util.print(process + ': error:  ' + data);
    });
    dummy.stdout.on('data', function (data) {
        util.print(process + ': ' + data);
    });
    return dummy;
}