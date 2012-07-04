require('../common/Help.js');


var fs = require('fs');

console.log("Shuffly Admin V0.27"); 
var nonDebuggable = ['node-inspector', 'pkill'];

var util = require('util'),
    exec = require('child_process').exec; 

var __dirname = '/usr/local/src/';
var indexPageData;



/*fs.readFile(__dirname + '/index.html',
function(err, data) {
   
});*/
var head, sites, games,debugs, nodeInspector;

var debug = false;

function loop() {               
    ask('?: ', '', onAsk);
}

setInterval(function() {
    console.log('keep alive ' + new Date().toString().substring(17, 24) );

},10*1000);

nodeInspector = runProcess('node-inspector', []);
console.log('node-inspector Started');

process.on('exit', function () {
    console.log('exiting ');
    onAsk('k');
    runProcess('pkill', ['node']);
});


function onAsk(data, ignore) {
    var rest = data.substring(2);
    switch (data[0]) {
        case 'd':
            debug = !debug;
            console.log('Debug ' + (debug ? 'Enabled' : 'Disabled'));
            break;
        case 's':
            sites = [];
            games = [];
            debugs = [];
            gateways = [];

            head = runProcess('node', [__dirname + 'headServer/headApp.js'], 4000);
            console.log('Head Server Started');

            sites.push(runProcess('node', [__dirname + 'siteServer/siteApp.js'], 4101));
            console.log(sites.length + ' Sites Servers Started');

            gateways.push(runProcess('node', [__dirname + 'gatewayServer/gatewayApp.js'], 4400));
            gateways.push(runProcess('node', [__dirname + 'gatewayServer/gatewayApp.js'], 4401));
            console.log(gateways.length + ' Gateway Servers Starte  d');

            games.push(runProcess('node', [__dirname + 'gameServer/gameApp.js'], 4200));
            games.push(runProcess('node', [__dirname + 'gameServer/gameApp.js'], 4201));
            console.log(games.length + ' Games Servers Started');

            debugs.push(runProcess('node', [__dirname + 'debugServer/debugServerApp.js'], 4300));
            console.log(debugs.length + ' Debug Servers Started');

            break;
        case 'q':
            process.exit();
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

                for (var i = 0; i < debugs.length; i++) {
                    debugs[i].kill();
                }
                if (!nodeInspector.killed)
                    nodeInspector.kill();      
                console.log('All killed');
            } else {
                restartProcs(rest[0]);

            }
            break;
    }
    if(!ignore)
    loop();
}

onAsk('d', true);
onAsk('s');
//loop();  


function restartProcs(letter) {
    switch (letter) {
        case 'h':
            console.log('Restarting head');
            if (head) {
                head.kill();
            }

            head = runProcess('node', [__dirname + 'headServer/headApp.js'], 4100);
            break;
        case 'g':
            console.log('Restarting games');
            for (var i = 0; i < games.length; i++) {
                games[i].kill();
            }

            games = [];

            games.push(runProcess('node', [__dirname + 'gameServer/gameApp.js'], 4101));
            break;
        case 's':
            console.log('Restarting sites');
            for (var i = 0; i < sites.length; i++) {
                sites[i].kill();
            }

            sites = [];

            sites.push(runProcess('node', [__dirname + 'siteServer/siteServerApp.js'], 4102));
            break;
        case 'd':
            console.log('Restarting debugs');
            for (var i = 0; i < debugs.length; i++) {
                debugs[i].kill();
            }

            debugs = [];

            debugs.push(runProcess('node', [__dirname + 'debugServer/debugServerApp.js'], 4103));
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


function runProcess(process, args, debugPort, appArgs) {
    if (nonDebuggable.indexOf(process) == -1 && debug) {
        args[0] = ' --debug=' + debugPort + " " + args[0];
    }
    var dummy = exec(process + " " + args.join() + " " + (appArgs?appArgs:''));

    if (nonDebuggable.indexOf(process) == -1) {
        dummy.stdout.on('data', function (data) {
            if (data.indexOf('debug: ') == -1) {
                util.print("    " + new Date().toString().substring(17,24) + "     " + data);
 
                util.print("?: ");
            }
        });
        dummy.stderr.on('data', function (data) {
            util.print("    " +   new Date().toString().substring(17, 24) + "     " + data);
            util.print("?: ");
        });

    }
    return dummy;
}