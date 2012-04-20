function UIManager(mainCanvas) {
    this.UIAreas = [];
    this.debugMessages = [];
    window.UIManager = this;

    var textFont = this.textFont = "18pt Calibri ";
    this.smallTextFont = "12pt Calibri ";
    this.buttonFont = "13pt Arial bold";
    this.smallButtonFont = "11pt Arial bold";
    mainCanvas.font = textFont;

    this.indexes = { tpIndex: 0, modifyIndex: 0, modifyTPIndex: 0 };

    this.draw = function (canvas) {


        canvas.save();

        var cl = JSLINQ(this.UIAreas).OrderBy(function (f) {
            return f.depth;
        });

        for (var ij = 0; ij < cl.items.length; ij++) {
            var are = cl.items[ij];
            are.draw(canvas);
        }

        if (DEBUGs) {
            for (var i = 0; i < this.debugMessages.length; i++) {
                canvas.fillText(this.debugMessages[i], 10, 25 + i * 30);
            }
        }
        canvas.restore();

    };

    this.onMouseScroll = function (evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;


        for (var ij = 0; ij < this.UIAreas.length; ij++) {
            var are = this.UIAreas[ij];
            if (are.visible && are.y <= evt.y && are.y + are.height > evt.y && are.x <= evt.x && are.x + are.width > evt.x) {
                evt = {
                    x: evt.x - are.x - 10,
                    y: evt.y - are.y - 10,
                    delta: delta
                };
                return are.scroll(evt);
            }
        }
        return false;
    };
    this.onClick = function (e) {
        var cell = cHelp.getCursorPosition(e);
        cell.x -= 10;
        cell.y -= 10;
        var goodArea = null;
        var are;
        var ij;
        var cl = JSLINQ(this.UIAreas).OrderBy(function (f) {
            return -f.depth;
        });
        for (var ij = 0; ij < cl.items.length; ij++) {
            are = cl.items[ij];
            if (are.visible && are.y <= cell.y && are.y + are.height > cell.y && are.x <= cell.x && are.x + are.width > cell.x) {
                goodArea = are;
                var ec = { x: cell.x - are.x, y: cell.y - are.y };
                are.click(ec);
                break;
            }
        }

        if (goodArea) {
            for (ij = 0; ij < this.UIAreas.length; ij++) {
                are = this.UIAreas[ij];
                if (goodArea == are) {
                    are.depth = 1;
                    are.focus();
                } else {
                    if (are.visible) {
                        are.depth = 0;
                        are.loseFocus();
                    }
                }
            }

            return true;
        } else {
            for (ij = 0; ij < this.UIAreas.length; ij++) {
                are = this.UIAreas[ij];
                if (are.visible) {
                    are.depth = 0;
                    are.loseFocus();
                }
            }

        }
        return false;
    };

    this.onMouseMove = function (e) {
        var cell = cHelp.getCursorPosition(e);
        cell.x -= 10;
        cell.y -= 10;

        var cl = JSLINQ(this.UIAreas).OrderBy(function (f) {
            return -f.depth;
        });

        for (var ij = 0; ij < cl.items.length; ij++) {
            var are = cl.items[ij];
            if (are.dragging || (are.visible && are.y <= cell.y &&
                are.y + are.height > cell.y &&
                    are.x <= cell.x &&
                        are.x + are.width > cell.x)) {
                cell = { x: cell.x - are.x, y: cell.y - are.y };
                return are.mouseMove(cell);

            }
        }
        return false;

    };
    this.onMouseUp = function (e) {
        var cell = cHelp.getCursorPosition(e, true);
        cell.x -= 10;
        cell.y -= 10;

        for (var ij = 0; ij < this.UIAreas.length; ij++) {
            var are = this.UIAreas[ij];
            var ec = { x: cell.x - are.x, y: cell.y - are.y };
            are.mouseUp(ec);
        }
    };
    this.onKeyDown = function (e) {

        for (var ij = 0; ij < this.UIAreas.length; ij++) {
            var are = this.UIAreas[ij];
            are.onKeyDown(e);
        }
    };



    this.updateTitle = function (str) {
        document.title = str + " | Blockade";
    };

    //call for all the created windows
    window.genericArea();
}
