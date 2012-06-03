var ar = {};
ar.foreach = Array.prototype.foreach = (function (does) {
    for (var i = 0; i < this.length; i++) {
        var df;
        if (df = does(this[i], i)) {
            return df;
        }
    }
    return false;
});
ar.where = Array.prototype.where = (function (does) {
    var jf = [];
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            jf.push(this[i]);
    }
    return jf;
});
ar.first = Array.prototype.first = (function (does) {
    for (var i = 0; i < this.length; i++) {
        if (does(this[i], i))
            return this[i];
    }
    return undefined;
});
ar.any = Array.prototype.any = (function (does) {
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});

ar.sort = Array.prototype.sort = (function (sorter) {
    return this;
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});

ar.remove = Array.prototype.remove = (function (item) {
    this.splice(this.indexOf(item), 1);
    return true;
});

module.exports = ar;