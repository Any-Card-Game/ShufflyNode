require('../common/ArrayUtils.js');

global._ = {
    numbers: function (start, finish) {
        var arr = [];
        for (var i = start; i <= finish; i++) {
            arr.push(i);
        }
        return arr;
    },
    clone: function (obj) {
        if (obj == null || typeof (obj) != 'object')
            return obj;

        var temp;
        if (Object.prototype.toString.call(obj) === '[object Array]') temp = [];
        else temp = {};


        for (var key in obj)
            temp[key] = this.clone(obj[key]);
        return temp;
    }, floor: function (j) {
        return ~ ~j;
    },
    random: function () {
        return Math.random();
    }
};

