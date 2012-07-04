
var qItemCollection = require('./queueItemCollection.js'), qPusher = require('./queuePusher.js'), qWatcher = require('./queueWatcher.js');


var queueManager = function (name, options) {
    this.name = name;
    var channels = {};
    this.addChannel = function (channel, callback) {
        channels[channel] = callback;
    };
    this.sendMessage = function (user, channel, eventChannel, data) {

        if (!this.qpCollection.getByChannel(channel)) {
            console.log(channel +" No existy");
        }

        this.qpCollection.getByChannel(channel).message(channel, this.name, user, eventChannel, data);
    };


    var messageReceived = function (name, user, eventChannel, content) {
        if (channels[eventChannel]) {
            channels[eventChannel]({ gateway: name, user: user }, content);
        }
    };

    var qw = [];
    var qp = [];
    for (var i = 0; i < options.watchers.length; i++) {
        if (options.watchers[i][2])
            qw.push(new qWatcher(options.watchers[i], messageReceived));
        else
            qw.push(new qWatcher(options.watchers[i][0], options.watchers[i][1]));
    }

    for (var i = 0; i < options.pushers.length; i++) {
        qp.push(new qPusher(options.pushers[i]));
    }
     
    this.qwCollection = new qItemCollection(qw);
    this.qpCollection = new qItemCollection(qp);
    return this;
};

module.exports = queueManager;