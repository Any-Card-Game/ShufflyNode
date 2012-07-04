
Common = {
    IP: '50.116.28.16'
};




Help = {
     extend: function (parent, child) {
        child.constructor.prototype = (function (pp, cp) {
            return function () {
                pp.constructor.apply(this, arguments);
                cp.apply(this, arguments);
                return this;
            };

        })(parent.prototype, child.constructor);

        for (var el in parent.prototype) {
            if (child.prototype[el]) {

                child.prototype[el] = (function (Pproto, Cproto, name) {

                    return function () {
                        var jm = Pproto[name].apply(this, arguments);
                        if (!jm) {
                            Cproto.apply(this, arguments);
                        }
                        if (name == 'init') {
                            this.start.call(this, arguments[0], arguments[1], Array.prototype.slice.call(arguments).slice(2, arguments.length)[0]);
                        }
                        return self;
                    };
                })(parent.prototype, child.prototype[el], el);

            } else {
                child.prototype[el] = parent.prototype[el];
            }
        }
    }
,
    isFunction: function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    } 
};

propUtils = {
    animateTo: function (obj, key, value, totalTime) {
        var cur = obj[key];
        var tot = value - cur;
        var size = 4;
        step = (tot / totalTime);
        var count = 0;
        var interval = setInterval(function() {
            count += size;
            if (count >= totalTime) {
                clearTimeout(interval);
            } else {
                obj[key] = cur + Math.floor(step * count);
            }
        }, size);
    }
};






