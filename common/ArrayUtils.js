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

ar.last = Array.prototype.last = (function () {
    return this[this.length - 1];
});

ar.any = Array.prototype.any = (function (does) {
    for (var i = 0; i < this.length; i++) {
        if (does(this[i]))
            return true;
    }
    return false;
});

ar.groupBy = Array.prototype.groupBy = (function (does) {
    var items = [];

    for (var i = 0; i < this.length; i++) {
        var f = does(this[i]);
        var first = items.first(function (a) { return a.key == f; });
        if (!first) {
            items.push({ key: f, items: [this[i]] });
        } else {
            first.items.push(this[i]);
        }

    }
    return items;
});

ar.select = Array.prototype.select = (function (does) {
    var items = [];
    for (var i = 0; i < this.length; i++) {
        items.push(does(this[i]));
    }
    return items;
});

ar.sortCards = Array.prototype.sortCards = (function () {
    var ij = this.groupBy(function (a) { return a.type; }).select(function (a) {
        a.items.sort(function (b, c) { return b.value - c.value; });
        return a.items;
    });
    var items = [];

    for (var j = 0; j < ij.length; j++) {

        for (var k = 0; k < ij[j].length; k++) {
            items.push(ij[j][k]);
        }
    }
    for (var i = 0; i < this.length; i++) {
        this[i] = items[i];
    }

    return this;
});

/*
var oldSort = Array.prototype.sort;
ar.sort = Array.prototype.sort = (function (does) {
oldSort(does);
oldSort(does);
return oldSort(does);
});*/


ar.remove = Array.prototype.remove = (function (item) {
    this.splice(this.indexOf(item), 1);
    return true;
});

module.exports = ar;