Array.prototype.except = function (except) {
    var md = {};
    for (var ik in this) {
        if (except.indexOf(except) == -1)
            md[ik] = this[ik];
    }
    return md;
};
Array.prototype.arrayExcept = function (except) {
    var al = [];
    for (var i = 0; i < this.length; i++) {
        var md = {};
        for (var ik in this[i]) {
            if (except.indexOf(except) == -1)
                md[ik] = this[i][ik];
        }
        al.push(md);
    }
    return al;
};

Array.prototype.exceptPrivate = function (except) {
    var md = {};
    for (var ik in this) {
        if (ik[0] == '_')
            md[ik] = this[ik];
    }
    return md;
};
Array.prototype.arrayExceptPrivate = function (except) {
    var al = [];
    for (var i = 0; i < this.length; i++) {
        var md = {};
        for (var ik in this[i]) {
            if (ik[0] == '_')
                md[ik] = this[i][ik];
        }
        al.push(md);
    }
    return al;
};

