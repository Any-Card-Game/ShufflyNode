
var redis = require("redis");
redis.debug_mode = false;


var queuePusher = function (channel) {
    this.channel = channel;
    var client1 = redis.createClient(6379, '50.116.22.241');
    this.message = function(data) {
        client1.rpush(channel, JSON.stringify(data));
    };
    return this;
};
module.exports = queuePusher;