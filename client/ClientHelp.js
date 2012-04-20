


/**
*
*  Chainable external javascript file loading
*  http://www.webtoolkit.info/
*
**/
var scriptLoader = {
    _loadScript: function (url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url; // +"?" + (Math.floor(Math.random() * 10000)); //caching
        if (callback) {
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded') callback();
            };
            script.onload = callback;
        }
        head.appendChild(script);
    },

    load: function (items, done) {
        var counter = 0;
        for (var i = 0; i < items.length; i++) {
            scriptLoader._loadScript(items[i], function () {
                counter++;
                if (counter >= items.length) {
                    done();
                }
            });
        }
    }
};


window.requestAnimFrame = (function (ff) {
    if (window.requestAnimationFrame)
        return window.requestAnimationFrame(ff);
    if (window.webkitRequestAnimationFrame)
        return window.webkitRequestAnimationFrame(ff);
    if (window.mozRequestAnimationFrame)
        return window.mozRequestAnimationFrame(ff);
    if (window.oRequestAnimationFrame)
        return window.oRequestAnimationFrame(ff);
    if (window.msRequestAnimationFrame)
        return window.msRequestAnimationFrame(ff);
    return window.setTimeout(ff, 1000 / 60);
});


window.cHelp = {
    clearCanvas: function (canvas) {
        canvas.width = canvas.width;
    },
    getCursorPosition: function (event) {
        if (event.targetTouches && event.targetTouches.length > 0) event = event.targetTouches[0];

        if (event.pageX != null && event.pageY != null) {

            return { x: event.pageX, y: event.pageY };
        }
        if (event.x != null && event.y != null) return { x: event.x, y: event.y };
        return { x: event.clientX, y: event.clientY };
    },
    floor: function (f) {
        return Math.floor(f);
    },
    loadSprite: function (src, complete) {

        var sprite1 = new Image();

        sprite1.onload = function () {
            sprite1.loaded = true;
            if (complete) complete(sprite1);
        };
        sprite1.src = src;
        return sprite1;
    }
};
