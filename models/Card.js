function Card(number, type) {
    this.number = number;
    this.type = type;
    return this;
};

Card.prototype.getName = function () {
    return this.number + " " + this.type;
};