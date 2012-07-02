
var redis = require("redis");
redis.debug_mode = false;


var queuePusher = function (channel) {
    this.channel = channel;
    var client1 = redis.createClient(6379, '50.116.22.241');

    this.message = (function (chnl) {
        return function(name, user, eventChannel, data) {
            //console.log(JSON.stringify({ user: user, eventChannel: eventChannel, content: data }, sanitize));


            client1.rpush(chnl, JSON.stringify({ name: name, user: user, eventChannel: eventChannel, content: data }, sanitize));
        };
    })(channel);
    return this;
};
function sanitize(name, value) { if (name != 'socket' && name != 'fiber' && name != 'debuggingSocket') return value; }

module.exports = queuePusher;