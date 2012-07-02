

var Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;


var client = new Db('test', new Server("127.0.0.1", 27017, {}));

client.open(function (err, p_client) {
    //client.collection('test_insert', test);
});



var dataManager = function () {
    this.gameData = {
        insert: function (gameName, answerIndex) {
            client.collection('gameInfo', function (err, collection) {
                collection.insert({ gameName: gameName, answerIndex: answerIndex });
            });
        }
    }
    return this;
};

module.exports = dataManager;