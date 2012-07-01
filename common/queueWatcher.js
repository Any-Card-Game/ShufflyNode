
var redis = require("redis");
    redis.debug_mode = false;


    var queueWatcher = function (channel, callback) {
        var client1 = redis.createClient(6379, '50.116.22.241');

        function cycle() {
            client1.blpop([channel, 10], function (caller, data) {
                if (data) {
                    var dt=null;
                    try {
                        dt = JSON.parse(data[1]);
                    }catch(e) {
                        
                    }

                    callback(dt);
                }
                cycle();
            });
        }

        cycle();
    };
module.exports = queueWatcher;

//http://www.youtube.com/watch?v=tOu-LTsk1WI