
var redis = require("redis")
redis.debug_mode = false;


var pubsub = function (ready) {
    var self = this;
    var subclient = redis.createClient(6379, Common.RedisIP);
    var pubclient = redis.createClient(6379, Common.RedisIP);
    self.subbed = {};

    subclient.on("subscribe", function (channel, count) {
        //console.log('subscribed: ' + channel + " " + count);
    });
    subclient.on("unsubscribe", function (channel, count) {
        //console.log('unsubscribed: ' + channel + " " + count);

    });

    subclient.on("message", function (channel, message) {


        if (self.subbed[channel]) {
            self.subbed[channel].callback(message);
        }
    });
    var pready, sready;
    subclient.on("ready", function () {
        sready = true;
        if (sready && pready) {
            ready();
        }
    });

    pubclient.on("ready", function () {
        pready = true;
        if (sready && pready) {
            ready();
        }
    });


    self.publish = function (channel, content) {
        pubclient.publish(channel, content);
    }
    self.subscribe = function (channel, callback) {
        subclient.subscribe(channel);
        self.subbed[channel] = { callback: callback };
    }

    return self;
};

module.exports = pubsub;