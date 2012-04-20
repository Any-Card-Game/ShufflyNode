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
        return .7;
    }
};


Array.prototype.foreach = (function (does) {
    for (var i = 0; i < this.length; i++) {
        does(this[i],i);
    }
});
Array.prototype.where = (function (does) {
    var jf = [];
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            jf.push(this[i]);
    }
    return jf;
});
Array.prototype.any = (function (does) {
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});

Array.prototype.sort = (function (sorter) {
    return this;
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});

Array.prototype.remove = (function (item) {
    this.splice(this.indexOf(item), 1);
    return true;
});