var Memcached = require('memcached');
var memcached = new Memcached('http://50.116.28.16:11211', function (err, conn) { 
    if (err) throw new Error(err);
    console.log(conn.server);

});
memcached.get("hello", function (err, result) {
    if (err) console.error(err);

    console.log(result);
    memcached.set("hello", 1, 10000, function (err, result) {
        if (err) console.error(err);

        console.log(result);
        memcached.get("hello", function (err, result) {
            if (err) console.error(err);

            console.log(result);


        });

    });

});




setInterval(function () {

    function tick() {

    }

    tick();
}, 1000);
