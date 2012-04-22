
Array.prototype.foreach = (function (does) {
    for (var i = 0; i < this.length; i++) {
        does(this[i], i);
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