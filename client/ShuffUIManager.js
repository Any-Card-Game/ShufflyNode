function ShuffUIManager() {
    this.UIAreas = [];
    window.$sui = this;
    this.draw = function () {
        var cl = JSLINQ(this.UIAreas).OrderBy(function (f) {
            return f.depth;
        });
    };

}
  