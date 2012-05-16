window.EditorEngine = function (element) {
    var that = this;
    this.dragging = false;
    this.editing = false;
    this.element = element;
    this.points = [
        {
            x: 0,
            y: 0,
            size: 10,
            cursor: 'nw-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.height += y;
                that.element.x -= x;
                that.element.y -= y;
                that.element.clearCache();
            }
        },
        {
            x: 100,
            y: 0,
            size: 10,
            cursor: 'ne-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.height += y;
                that.element.y -= y;
                that.element.clearCache();
                dv.x = 0;

            }
        },
        {
            x: 100,
            y: 100,
            size: 10,
            cursor: 'se-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.height -= y;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;

            }
        },
        {
            x: 0,
            y: 100,
            size: 10,
            cursor: 'sw-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.height -= y;
                that.element.x -= x;
                that.element.clearCache(); dv.y = 0;
            }
        },
        {
            x: 50,
            y: 0,
            size: 5,
            cursor: 'n-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.height += y;
                that.element.y -= y;
                that.element.clearCache();

            }
        },
        {
            x: 100,
            y: 50,
            size: 5,
            cursor: 'e-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width -= x;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;

            }
        },
        {
            x: 50,
            y: 100,
            size: 5,
            cursor: 'n-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.height -= y;
                that.element.clearCache();
                dv.x = 0; dv.y = 0;


            }
        },
        {
            x: 0,
            y: 50,
            size: 5,
            cursor: 'e-resize',
            click: function (dv) {
                var x = dv.x;
                var y = dv.y;
                that.element.width += x;
                that.element.x -= x;
                that.element.clearCache();
            }
        }];
    this.maxSize = function () {
        return 10;
    };
    this.startDragging = null;
    this.dragg = false;
    this.click = function (e) {
        var x = 0;
        var y = 0;
        var w = this.element.width;
        var h = this.element.height;

        uiManager.propertyList.populate(this.element);


        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            j.editing = false;
        }

        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            var sz = j.size * 5;

            var rect = { x: x + (w * j.x / 100) - sz / 2, y: y + (h * j.y / 100) - sz / 2, width: sz, height: sz };

            if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {

                document.body.style.cursor = j.cursor;
                this.startDragging = { x: e.x, y: e.y };
                this.editing = true;
                j.editing = true;
                return true;

            }
        }

        if (e.x > x && e.x < x + w && e.y > y && e.y < y + h) {

            this.dragg = { x: e.x, y: e.y };
            document.body.style.cursor = 'move';
            this.dragging = true;
            return false;

        } else
            document.body.style.cursor = 'default';

    };
    this.mouseUp = function (e) {
        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            j.editing = false;
        }
        this.editing = false;
        this.dragging = false;
        this.startDragging = null;
        this.dragg = false;
    };
    this.mouseMove = function (e) {
        var x = 0;
        var y = 0;
        var w = this.element.width;
        var h = this.element.height;

        document.body.style.cursor = 'move';
        if (this.dragging) {
            if (this.element.childrenAreEditing()) {
                return false;
            }
            var jx = e.x - this.dragg.x;
            var jy = e.y - this.dragg.y;
            this.element.x += jx;
            this.element.y += jy;


            window.DEBUGLABELS[0] = "E: " + e.x + " " + e.y;
            window.DEBUGLABELS[1] = "Dragg: " + this.dragg.x + " " + this.dragg.y;
            window.DEBUGLABELS[2] = "Element: " + this.element.x + " " + this.element.y;
            window.DEBUGLABELS[3] = "Offset: " + jx + " " + jy;
            //this.dragg.x += jx;
            //this.dragg.y += jy;

            return false;
        }
        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            var sz = j.size * 5;

            if (j.editing) {
                document.body.style.cursor = j.cursor;
                var dv = { x: this.startDragging.x - e.x, y: this.startDragging.y - e.y };

                j.click(dv);
                this.startDragging = { x: e.x + dv.x, y: e.y + dv.y };
                return true;
            }

            var rect = { x: x + (w * j.x / 100) - sz / 2, y: y + (h * j.y / 100) - sz / 2, width: sz, height: sz };

            if (e.x > rect.x && e.x < rect.x + rect.width && e.y > rect.y && e.y < rect.y + rect.height) {
                document.body.style.cursor = j.cursor;

                if (j.editing) {
                    var dv = { x: this.startDragging.x - e.x, y: this.startDragging.y - e.y };

                    j.click(dv);
                    this.startDragging = { x: e.x + dv.x, y: e.y + dv.y };
                }
                return true;
            }
        }

        this.startDragging = { x: e.x, y: e.y };
        return this.editing;
    };
    this.draw = function (canv) {
        canv.save();
        var size = 0;
        canv.strokeStyle = canv.fillStyle = 'white';
        canv.lineWidth = 3;

        canv.dashedRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2, [2, 2]);
        //canv.strokeRect(this.element.totalX() - size, this.element.totalY() - size, this.element.width + size * 2, this.element.height + size * 2);

        var x = this.element.totalX();
        var y = this.element.totalY();
        var w = this.element.width;
        var h = this.element.height;

        for (var i = 0; i < this.points.length; i++) {
            var j = this.points[i];
            canv.fillRect(x + (w * j.x / 100) - j.size / 2, y + (h * j.y / 100) - j.size / 2, j.size, j.size);

        }


        canv.restore();

    };
};




function Element() {
    this.init.apply(this, arguments);
}

Element.prototype.init = function () {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.depth = -1;
    this.visible = true;
    this.cachedDrawing = null;
    this.click = null;
    this.mouseUp = null;
    this.mouseOver = null;
    this.editMode = false;
    this.editorEngine = null;
    this.parent = null;
    this.editorEngine = new EditorEngine(this);


};
Element.prototype.isEditMode = function () {
    return this.editMode || (this.parent && this.parent.isEditMode && this.parent.isEditMode());
};
Element.prototype.childrenAreEditing = function () {
    var ch = this.controls;
    if (!ch)
        return;
    for (var k = 0; k < ch.length; k++) {
        if (ch[k].editorEngine.dragging || ch[k].editorEngine.editing)
            return true;
        if (ch[k].childrenAreEditing())
            return true;
    }
    return false;
};
Element.prototype.totalX = function () {
    return this.x + (this.parent && this.parent.totalX ? this.parent.totalX() : 0);
};
Element.prototype.totalY = function () {
    return this.y + (this.parent && this.parent.totalY ? this.parent.totalY() : 0);
};
Element.prototype.start = function (x, y, properties) {
    this.x = x;
    this.y = y;
    for (var prop in properties) {
        this[prop] = properties[prop];
    }
    if (this.construct) this.construct();
};
Element.prototype.forceDrawing = function () {
    return { redraw: false, clearCache: false };
};
Element.prototype.onKeyDown = function (e) {
};
Element.prototype.focus = function () {
};
Element.prototype.loseFocus = function () {
};
Element.prototype.onClick = function (e) {
    if (this.isEditMode() == true) {
        if (this.editorEngine.click(e))
            return true;
    }
    return false;
};
Element.prototype.onMouseUp = function (e) {
    if (this.isEditMode() == true) {
        if (this.editorEngine.mouseUp(e))
            return true;
    }
    return false;

};
Element.prototype.onMouseOver = function (e) {
    if (this.isEditMode() == true) {
        if (this.editorEngine.mouseMove(e))
            return true;
    }
    return false;

};
Element.prototype.draw = function (canv) {
    if (this.isEditMode() == true) {
        this.editorEngine.draw(canv);
    }
};
Element.prototype.clearCache = function () {
    this.cachedDrawing = null;
};

function UiArea() {
    this.init.apply(this, arguments);
}


UiArea.prototype.init = function () {
    this.manager = null;
    this.closable = null;
    this.dragging = false;
    this.controls = [];
    this.onMove = function () { };
    this.cachedDrawing = null;
    this.construct();
};


UiArea.prototype.construct = function () {
    if (this.closable) {
        this.addControl(new Button(this.width - 30, 4, 26, 23, "X", this.manager.buttonFont, "Green", function () {
            that.loseFocus();
            that.visible = false;
        }));
    }
};
UiArea.prototype.addControl = function (control) {
    control.parent = this;
    this.controls.push(control);
    return control;
};
UiArea.prototype.focus = function () {
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.focus();
    }
}
    ;
UiArea.prototype.loseFocus = function () {
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.loseFocus();
    }
};
UiArea.prototype.onClick = function (e) {
    if (!this.visible) return false;

    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.focused = false;
        if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
            e.x -= control.x;
            e.y -= control.y;
            control.onClick(e);
            return false;

        }
    }
    if (!this.isEditMode())
        this.dragging = { x: e.x, y: e.y };
};
UiArea.prototype.onKeyDown = function (e) {
    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.onKeyDown(e);
    }
};
UiArea.prototype.onMouseOver = function (e) {
    if (!this.visible) return;
    if (!this.dragging) {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
                e.x -= control.x;
                e.y -= control.y;
                control.onMouseOver(e);
                return;
            }
        }

        return;
    }

    this.x += e.x - this.dragging.x;
    this.y += e.y - this.dragging.y;
    this.onMove();
};
UiArea.prototype.onMouseUp = function (e) {


    if (!this.visible) return;

    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
    }
    this.dragging = false;
};
UiArea.prototype.onScroll = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.visible && ((control.editorEngine.editing) || (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x))) {
            if (control.onScroll) {
                e.x -= control.x;
                e.y -= control.y;
                control.onScroll(e);
                return false;
            }
        }
    }
};
UiArea.prototype.draw = function (canv) {

    if (!this.visible) return;
    var good;
    var t;
    var j;
    canv.save();

    if (!this.cachedDrawing) {

        var cg = document.createElement("canvas");
        cg.width = this.width;
        cg.height = this.height;

        var cv = cg.getContext('2d');

        var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
        lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
        lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


        cv.fillStyle = lingrad;
        cv.strokeStyle = "#333";
        var xy = [this.x, this.y];
        this.x = 0;
        this.y = 0;


        var rad = 30;
        roundRect(cv, this.x, this.y, this.width, this.height, rad, true, true);

        cv.beginPath();
        cv.moveTo(this.x, this.y + rad);
        cv.lineTo(this.x + this.width, this.y + rad);
        cv.lineWidth = 2;
        cv.strokeStyle = "#000000";
        cv.stroke();

        for (j = 0; j < this.controls.length; j++) {
            t = this.controls[j];
            good = t.forceDrawing();
            if (good.redraw)
                t.draw(cv);
        }


        this.x = xy[0];
        this.y = xy[1];

        this.cachedDrawing = cg;
    }

    canv.drawImage(this.cachedDrawing, cHelp.floor(this.x), cHelp.floor(this.y));
    if (this.cachedDrawing.width != this.width || this.cachedDrawing.height != this.height)
        this.cachedDrawing = null;

    for (j = 0; j < this.controls.length; j++) {
        t = this.controls[j];
        good = t.forceDrawing();
        if (!good.redraw)
            t.draw(canv);
        if (good.clearCache)
            this.cachedDrawing = null;
    }
    canv.restore();

};
Help.extend(Element, UiArea);


function TextArea() {
    this.init.apply(this, arguments);
}


TextArea.prototype.init = function () {

    this.text = '';
    this.font = '18pt Calibri';
    this.color = 'black';
};


TextArea.prototype.forceDrawing = function () {
    var txt = (Help.isFunction(this.text) ? this.text() : this.text);
    if (txt == this.oldText) {
        return { redraw: true, clearCache: false };
    }
    this.oldText = txt;
    return { redraw: true, clearCache: true };
};
TextArea.prototype.draw = function (canv) {

    if (!this.visible) return;

    canv.save();
    var txt = Help.isFunction(this.text) ? this.text() : this.text;
    if (canv.font != this.font)
        canv.font = this.font;

    var w = canv.measureText(txt).width;
    var h = parseInt(canv.font.split('pt')[0]);
    this.width = w;
    this.height = h;

    //   canv.fillStyle = "rgba(255,255,255,0.78)";
    var pad = 3;
    //     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));

    canv.fillStyle = this.color;

    canv.fillText(txt, this.parent.x + this.x, this.parent.y + this.y + h);
    canv.restore();

};

Help.extend(Element, TextArea);

function ImageButton() {

    this.init.apply(this, arguments);
}


ImageButton.prototype.init = function () {

    this.text = '';
    this.toggle = false;
    this.toggled = false;
    this.font = '';
    this.clicking = false;
    this.image = null;
    this.created = false;
    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;
};


ImageButton.prototype.onClick = function (e) {

    if (!this.visible) return;
    this.clicking = true;
    if (this.toggle)
        this.toggled = !this.toggled;
};
ImageButton.prototype.onMouseUp = function (e) {

    if (!this.visible) return;
    if (this.clicking) {
        if (this.click) this.click();
    }
    this.clicking = false;
    if (this.mouseUp) this.mouseUp();
};
ImageButton.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    if (this.mouseOver) this.mouseOver();
};
ImageButton.prototype.draw = function (canv) {

    if (!this.visible) return;

    canv.save();

    if (!this.created) {
        this.created = true;
        this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);

        this.button1Grad.addColorStop(0, '#FFFFFF');
        this.button1Grad.addColorStop(1, '#A5A5A5');

        this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button2Grad.addColorStop(0, '#A5A5A5');
        this.button2Grad.addColorStop(1, '#FFFFFF');


        this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
        this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
        this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

    }

    canv.strokeStyle = this.buttonBorderGrad;
    if (this.toggle) {
        canv.fillStyle = (this.toggled ?
            this.button1Grad :
            this.button2Grad);

    } else {
        canv.fillStyle = (this.clicking ?
            this.button1Grad :
            this.button2Grad);

    }
    canv.lineWidth = 2;
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
    if (canv.font != this.font)
        canv.font = this.font;
    canv.fillStyle = "#000000";
    var txt = (Help.isFunction(this.text) ? this.text() : this.text);


    this.image(canv, this.parent.x + this.x, this.parent.y + this.y);

    canv.fillText(txt, this.parent.x + this.x + ((this.width / 2) - (canv.measureText(txt).width / 2)), this.parent.y + this.y + this.height - 3);

    canv.restore();

};
Help.extend(Element, ImageButton);


function Button() {
    this.init.apply(this, arguments);
}
Button.prototype.init = function () {
    this.text = '';
    this.toggle = false;
    this.toggled = false;
    this.font = '';
    this.clicking = false;
    this.image = null;
    this.created = false;
    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;
};
Button.prototype.onClick = function (e) {

    if (!this.visible) return;
    this.clicking = true;
    if (this.toggle)
        this.toggled = !this.toggled;
};
Button.prototype.onMouseUp = function (e) {

    if (!this.visible) return;
    if (this.clicking) {
        if (this.click) this.click();
    }
    this.clicking = false;
    if (this.mouseUp) this.mouseUp();
};
Button.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    if (this.mouseOver) this.mouseOver();
};

Button.prototype.draw = function (canv) {

    if (!this.visible) return;
    canv.save();

    if (!this.created) {
        this.created = true;
        this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);

        this.button1Grad.addColorStop(0, '#FFFFFF');
        this.button1Grad.addColorStop(1, '#A5A5A5');

        this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button2Grad.addColorStop(0, '#A5A5A5');
        this.button2Grad.addColorStop(1, '#FFFFFF');


        this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
        this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
        this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

    }

    canv.strokeStyle = this.buttonBorderGrad;
    if (this.toggle) {
        canv.fillStyle = (this.toggled ?
            this.button1Grad :
            this.button2Grad);

    } else {
        canv.fillStyle = (this.clicking ?
            this.button1Grad :
            this.button2Grad);

    }
    canv.lineWidth = 2;
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
    if (canv.font != this.font)
        canv.font = this.font;
    canv.fillStyle = "#000000";
    var txt = (Help.isFunction(this.text) ? this.text() : this.text);
    canv.fillText(txt, this.parent.x + this.x + ((this.width / 2) - (canv.measureText(txt).width / 2)), this.parent.y + this.y + (this.height / 3) * 2);
    canv.restore();

};

Help.extend(Element, Button);





function PropertyButton() {
    this.init.apply(this, arguments);
}
PropertyButton.prototype.init = function (x, y, props) {
    this.button = new Button(0, 0, { text: props.name });
    this.textbox = new TextBox(0, 0, { text: props.object[props.name] + "" });
};
PropertyButton.prototype.onClick = function (e) {

    if (!this.visible) return;
    if (e.x < this.width / 2)
        this.button.onClick(e);
    if (e.x > this.width / 2)
        this.textbox.onClick(e);
};
PropertyButton.prototype.onMouseUp = function (e) {

    if (!this.visible) return;

    if (e.x < this.width / 2)
        this.button.onMouseUp(e);
    if (e.x > this.width / 2)
        this.textbox.onMouseUp(e);
};
PropertyButton.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    if (e.x < this.width / 2)
        this.button.onMouseOver(e);
    if (e.x > this.width / 2)
        this.textbox.onMouseOver(e);
};

PropertyButton.prototype.draw = function (canv) {

    if (!this.visible) return;
    canv.save();

    var w2 = Math.floor(this.width / 2);
    this.button.width = w2;
    this.textbox.width = w2;

    this.button.height = this.height;
    this.textbox.height = this.height;

    this.button.x = 0;
    this.button.y = 0;

    this.textbox.x = w2;
    this.textbox.y = 0;

    this.button.parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
    this.textbox.parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };

    this.button.draw(canv);
    this.textbox.draw(canv);
    canv.restore();
};

Help.extend(Element, PropertyButton);






function TextBox() {
    this.init.apply(this, arguments);
}


TextBox.prototype.init = function () {

    this.textChanged = null;
    this.text = '';
    this.font = '';
    this.clicking = false;
    this.color = null;
    this.parent = null;
    this.cursorPosition = 0;
    this.dragPosition = -1;
    this.drawTicks = 0;
    this.lastClickTick = 0;
    this.created = false;
    this.focused = false;
    this.blinked = false;
    this.blinkTick = 0;
    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;
    this.can = null;
};


TextBox.prototype.onKeyDown = function (e) {

    if (e.altKey) return;
    if (this.focused) {

        if (e.ctrlKey) {
            if (e.keyCode == 65) {
                this.dragPosition = 0;
                this.cursorPosition = this.text.length;
            } else if (e.keyCode == 67) {
                // _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));
            } else if (e.keyCode == 88) {
                //  _H.copy_to_clipboard(this.text.substring(Math.min(this.cursorPosition, this.dragPosition), Math.max(this.cursorPosition, this.dragPosition)));


                this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);

                this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                this.dragPosition = -1;
            }
        } else if (e.keyCode == 37) {
            if (e.shiftKey) {
                if (this.dragPosition == -1) {
                    this.dragPosition = this.cursorPosition;
                }
                this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
            } else {
                this.dragPosition = -1;
                this.cursorPosition = Math.max(this.cursorPosition - 1, 0);
            }
        } else if (e.keyCode == 39) {
            if (e.shiftKey) {
                if (this.dragPosition == -1) {
                    this.dragPosition = this.cursorPosition;
                }
                this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
            } else {
                this.dragPosition = -1;
                this.cursorPosition = Math.min(this.cursorPosition + 1, this.text.length);
            }
        } else {
            if (e.keyCode == 8) {
                if (this.dragPosition == -1) {
                    this.text = this.text.substring(0, this.cursorPosition - 1) + this.text.substring(this.cursorPosition, this.text.length);
                } else {
                    this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
                }
                if (this.dragPosition == -1) {
                    if (this.cursorPosition > 0)
                        this.cursorPosition--;
                } else {
                    this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                }

            } else if (e.keyCode == 46) {
                if (this.dragPosition == -1) {
                    this.text = this.text.substring(0, this.cursorPosition) + this.text.substring(Math.min(this.cursorPosition + 1, this.text.length), this.text.length);
                } else {
                    this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);
                }
                if (this.dragPosition == -1) {

                } else {
                    this.cursorPosition = Math.min(this.cursorPosition, this.dragPosition);
                }

            } else {
                var t = String.fromCharCode(e.keyCode);
                if (this.dragPosition == -1) {
                    this.text = this.text.substring(0, this.cursorPosition) + t + this.text.substring(this.cursorPosition, this.text.length);
                } else {
                    this.text = this.text.substring(0, Math.min(this.cursorPosition, this.dragPosition)) + t + this.text.substring(Math.max(this.cursorPosition, this.dragPosition), this.text.length);

                }
                if (this.dragPosition == -1) {
                    this.cursorPosition++;
                } else {
                    this.cursorPosition = Math.max(this.cursorPosition, this.dragPosition);
                }
            }
            this.dragPosition = -1;
        }

        if (this.textChanged)
            this.textChanged();

        e.preventDefault();
    }
};
TextBox.prototype.onClick = function (e) {

    if (!this.visible) return;
    this.clicking = true;
    this.focused = true;
    can.save();
    if (can.font != this.font)
        can.font = this.font;
    for (var i = 0; i < this.text.length; i++) {
        this.dragPosition = -1;
        var w = can.measureText(this.text.substring(0, i)).width;
        if (w > e.x - 14) {
            this.cursorPosition = i;
            if (this.drawTicks - this.lastClickTick < 15) {
                this.selectWord();
            }
            this.lastClickTick = this.drawTicks;
            return;
        }
    }
    this.cursorPosition = this.text.length;
    if (this.drawTicks - this.lastClickTick < 20) {
        this.selectWord();
    }
    this.lastClickTick = this.drawTicks;
    can.restore();

};
TextBox.prototype.selectWord = function () {
    var j = this.text.split(' ');

    var pos = 0;
    for (var i = 0; i < j.length; i++) {
        if (this.cursorPosition < j[i].length + pos) {
            this.dragPosition = pos;
            this.cursorPosition = j[i].length + pos;
            return;
        } else {
            pos += j[i].length + 1;
        }
    }

    this.dragPosition = pos - j[j.length - 1].length;
    this.cursorPosition = this.text.length;
};
TextBox.prototype.onMouseUp = function (e) {

    if (!this.visible) return;
    if (this.clicking) {

    }
    this.clicking = false;
    if (this.mouseUp) this.mouseUp();
};
TextBox.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    document.body.style.cursor = "text";
    if (this.clicking) {
        if (this.dragPosition == -1) {
            this.dragPosition = this.cursorPosition;
        }
        can.save();

        if (can.font != this.font)
            can.font = this.font;
        for (var i = 0; i < this.text.length; i++) {
            var w = can.measureText(this.text.substring(0, i)).width;
            if (w > e.x - 14) {
                this.cursorPosition = i;
                return;
            }
        }
        can.restore();

        this.cursorPosition = this.text.length;
    }
    if (this.mouseOver) this.mouseOver();
};
TextBox.prototype.draw = function (canv) {

    if (!this.visible) return;
    canv.save();
    if (!this.focused) {
        this.cursorPosition = -1;
        this.dragPosition = -1;
    }
    this.drawTicks++;
    can = canv;
    if (!this.created) {
        this.created = true;
        this.button1Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button1Grad.addColorStop(0, '#FFFFFF');
        this.button1Grad.addColorStop(1, '#A5A5A5');

        this.button2Grad = canv.createLinearGradient(0, 0, 0, 1);
        this.button2Grad.addColorStop(0, '#A5A5A5');
        this.button2Grad.addColorStop(1, '#FFFFFF');


        this.buttonBorderGrad = canv.createLinearGradient(0, 0, 0, 1);
        this.buttonBorderGrad.addColorStop(0, '#AFAFAF');
        this.buttonBorderGrad.addColorStop(1, '#7a7a7a');

    }

    canv.strokeStyle = this.buttonBorderGrad;
    canv.fillStyle = this.clicking ? this.button1Grad : this.button2Grad;
    canv.lineWidth = 2;
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.width, this.height, 2, true, true);
    if (canv.font != this.font)
        canv.font = this.font;

    if (this.dragPosition != -1) {
        canv.fillStyle = "#598AFF";

        var w1 = canv.measureText(this.text.substring(0, Math.min(this.dragPosition, this.cursorPosition))).width;
        var w2 = canv.measureText(this.text.substring(0, Math.max(this.dragPosition, this.cursorPosition))).width;
        canv.fillRect(this.parent.x + this.x + 8 + w1, this.parent.y + this.y + 3,
            w2 - w1, (this.height - 7));
    }
    canv.fillStyle = "#000000";

    var hc;
    if (canv.font.indexOf('pt') != -1)
        hc = parseInt(canv.font.substr(0, canv.font.indexOf('pt')));
    else
        hc = parseInt(canv.font.substr(0, canv.font.indexOf('px')));
    canv.fillText(this.text, this.parent.x + this.x + 8, this.parent.y + this.y + ((this.height - hc) / 2) + this.height / 2);

    if (this.focused && ((this.blinkTick++ % 35) == 0)) {
        this.blinked = !this.blinked;
    }
    if (this.focused && this.blinked) {
        canv.strokeStyle = "#000000";
        var w = canv.measureText(this.text.substring(0, this.cursorPosition)).width;
        canv.beginPath();
        canv.moveTo(this.parent.x + this.x + 8 + w, this.parent.y + this.y + 3);
        canv.lineTo(this.parent.x + this.x + 8 + w, this.parent.y + this.y + (this.height - 7));
        canv.lineWidth = 2;
        canv.stroke();
    }
    canv.restore();

};

Help.extend(Element, TextBox);


function Panel() {
    this.init.apply(this, arguments);
}


Panel.prototype.init = function () {

    this.area = null;
    this.cachedDrawing = null;
    this.outline = true;
    this.controls = [];
};


Panel.prototype.addControl = function (control) {
    control.parent = this;
    this.controls.push(control);
    return control;
};
Panel.prototype.focus = function () {
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.focus();
    }
};
Panel.prototype.loseFocus = function () {
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.loseFocus();
    }
};
Panel.prototype.empty = function () {

    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.parent = null;
    }

    this.controls = [];
};
Panel.prototype.onClick = function (e) {

    if (!this.visible) return;

    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.focused = false;
        if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onClick(e);
            return false;

        }
    }

};

Panel.prototype.onKeyDown = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.onKeyDown(e);
    }
};
Panel.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onMouseOver(e);
        }
    }
};
Panel.prototype.onMouseUp = function (e) {

    if (!this.visible) return;

    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
    }
};
Panel.prototype.onScroll = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            if (control.onScroll) {
                e.x -= control.x;
                e.y -= control.y;
                control.onScroll(e);
                return false;
            }
        }
    }
};
Panel.prototype.draw = function (canv) {

    if (!this.visible) return;
    var t;
    var j;
    var _x = this.x;
    var _y = this.y;
    canv.save();

    this.x += this.parent.x;
    this.y += this.parent.y;

    if (this.outline) {
        var lingrad = canv.createLinearGradient(0, 0, 0, this.height);
        lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
        lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


        canv.fillStyle = lingrad;
        canv.strokeStyle = "#333";


        var rad = 5;
        roundRect(canv, this.x, this.y, this.width, this.height, rad, true, true);
    }

    for (j = 0; j < this.controls.length; j++) {
        t = this.controls[j];
        t.draw(canv);
    }
    this.x = _x;
    this.y = _y;
    canv.restore();

};
Help.extend(Element, Panel);



function HScrollBox() {
    this.init.apply(this, arguments);
}


HScrollBox.prototype.init = function () {

    this.itemWidth = 0;
    this.scrollWidth = 14;
    this.jWidth = 5;
    this.visibleItems = 5;
    this.itemHeight = 10;
    this.backColor = '';
    this.scrollOffset = 0;
    this.scrollPosition = 0;
    this.dragging = false;
    this.controls = [];
};


HScrollBox.prototype.construct = function () {

    this.width = this.visibleItems * (this.itemWidth + this.jWidth);
    this.height = this.itemHeight + this.scrollWidth;
    this.scrolling = false;

};
HScrollBox.prototype.addControl = function (control) {
    control.parent = this;
    this.controls.push(control);
    return control;
};
HScrollBox.prototype.onClick = function (e) {

    if (!this.visible) return;
    for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onClick(e);
            return false;

        }
    }


    if (e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {

        var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
        this.scrollOffset = cHelp.floor((e.x / width) * (this.controls.length - this.visibleItems));

        this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

    }
    this.dragging = true;

    return false;
};
HScrollBox.prototype.onMouseUp = function (e) {

    if (!this.visible) return;
    this.dragging = false;

    for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x + 2 && control.x + control.width + 2 > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onMouseUp(e);
            return false;

        }
    }

    if (this.mouseUp) this.mouseUp();
};
HScrollBox.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x + 2 <= e.x && control.x + control.width + 2 > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onMouseOver(e);
            break;

        }
    }
    if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + this.scrollWidth) {
        var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;
        this.scrollOffset = cHelp.floor((e.x / width) * (this.controls.length - this.visibleItems));

        this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

    }
    if (this.mouseOver) this.mouseOver();
};
HScrollBox.prototype.onScroll = function (e) {

    if (!this.visible) return;
    if (e.delta > 0) {
        if (this.scrollOffset > 0) {
            this.scrollOffset--;
        }
    } else {
        if (this.scrollOffset < this.controls.length - this.visibleItems) {
            this.scrollOffset++;
        }
    }
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            if (control.onScroll)
                control.onScroll(e);
            return false;

        }
    }
    if (this.scroll) this.scroll();
};

HScrollBox.prototype.draw = function (canv) {

    if (!this.visible) return;

    canv.save();

    canv.fillStyle = this.backColor;

    var i;
    var width = this.visibleItems * (this.itemWidth + this.jWidth) - 2;

    canv.fillStyle = this.backColor;
    canv.lineWidth = 1;
    canv.strokeStyle = "#333";
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.visibleItems * (this.itemWidth + this.jWidth) + 2, this.itemHeight + this.scrollWidth + 6, 3, true, true);

    canv.fillStyle = "grey";
    canv.lineWidth = 1;
    canv.strokeStyle = "#444";
    canv.fillRect(this.parent.x + this.x + 2, this.parent.y + this.y + this.itemHeight + 6, this.visibleItems * (this.itemWidth + this.jWidth), this.scrollWidth);

    canv.fillStyle = "FFDDFF";
    canv.lineWidth = 1;
    canv.strokeStyle = "#FFDDFF";
    this.scrollPosition = width * this.scrollOffset / (this.controls.length - this.visibleItems);

    canv.fillRect(this.parent.x + this.x + (this.scrollPosition) + 2, this.parent.y + this.y + this.itemHeight + 6, 5, this.scrollWidth - 2);


    var curX = 3;
    for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
        this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
        this.controls[i].x = curX;
        this.controls[i].y = 2;
        this.controls[i].height = this.itemHeight;
        this.controls[i].width = this.itemWidth;

        curX += this.itemWidth + this.jWidth;
        this.controls[i].draw(canv);
    }

    canv.restore();



};
Help.extend(Element, HScrollBox);



function PaletteArea() {
    this.init.apply(this, arguments);
}


PaletteArea.prototype.init = function () {
    this.showCurrent = null;
    this.scale = { x: 1, y: 1 };
    this.clicking = false;
    this.selectedIndex = 0;
    this.parent = null;
    this.wide = false;
    this.clickHandled = false;
};

PaletteArea.prototype.init = function (palette, wide) {
    this.wide = wide;
    if (!wide) {
        this.width = this.scale.x * 2;
        this.height = this.scale.y * palette.length / 2;
    } else {
        this.width = this.scale.x * palette.length / 2;
        this.height = this.scale.y * 2;
    }
    this.palette = palette;

};
PaletteArea.prototype.onClick = function (e) {

    if (!this.visible) return;
    this.clicking = true;
    this.clickHandled = false;

    var _x = cHelp.floor(e.x / scale.x);
    var _y = cHelp.floor(e.y / scale.y);

    if (this.wide) {
        this.selectedIndex = _y * palette.length / 2 + _x;
    } else {
        this.selectedIndex = _y * 2 + _x;
    }

};
PaletteArea.prototype.onMouseUp = function (e) {

    if (!this.visible) return;

    this.clickHandled = false;
    this.clicking = false;
};
PaletteArea.prototype.onMouseOver = function (e) {

    if (this.clicking) {

        var _x = cHelp.floor(e.x / scale.x);
        var _y = cHelp.floor(e.y / scale.y);

        if (this.wide) {
            this.selectedIndex = _y * palette.length / 2 + _x;
        } else {
            this.selectedIndex = _y * 2 + _x;
        }
    }
};
PaletteArea.prototype.draw = function (canv) {

    if (!this.visible) return;
    if (!this.palette) return;
    canv.save();


    canv.strokeStyle = "#000";
    canv.lineWidth = 1;
    var pos = { x: this.parent.x + this.x, y: this.parent.y + this.y };

    if (this.wide) {
        var f = cHelp.floor(this.palette.length / 2);
        for (var h = 0; h < 2; h++) {
            for (var w = 0; w < f; w++) {
                canv.fillStyle = this.palette[w + h * f];
                canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
            }
        }
        if (this.showCurrent) {
            canv.fillStyle = this.palette[this.selectedIndex];
            canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
            canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
        }
    } else {

        var f = cHelp.floor(this.palette.length / 2);
        for (var h = 0; h < f; h++) {
            for (var w = 0; w < 2; w++) {
                canv.fillStyle = this.palette[w + h * 2];
                canv.fillRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
                canv.strokeRect(pos.x + w * this.scale.x, pos.y + h * this.scale.y, this.scale.x, this.scale.y);
            }
        }
        if (this.showCurrent) {
            canv.fillStyle = this.palette[this.selectedIndex];
            canv.fillRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
            canv.strokeRect(pos.x, pos.y + f * this.scale.y, this.scale.x * 2, this.scale.y * 2);
        }
    }

    canv.restore();


};

Help.extend(Element, PaletteArea);

function HtmlBox() {
    this.init.apply(this, arguments);
}


HtmlBox.prototype.init = function () {
};

HtmlBox.prototype.construct = function (e) {
    this.init();
};
HtmlBox.prototype.focus = function () {
    this._focus();
};
HtmlBox.prototype.loseFocus = function () {
    this._hide();
};
HtmlBox.prototype.draw = function (canv) {

    if (!this.visible) return;
    this.updatePosition(this.parent.x + this.x, this.parent.y + this.y);
};
Help.extend(Element, HtmlBox);

function ScrollBox() {
    this.init.apply(this, arguments);
}


ScrollBox.prototype.init = function () {
    this.itemWidth = 10;
    this.visible = true;
    this.scrollWidth = 14;
    this.visibleItems = 3;
    this.itemHeight = 10;
    this.backColor = '';

    this.jHeight = 5;
    this.parent = null;
    this.scrollOffset = 0;
    this.scrollPosition = 0;
    this.controls = [];

    this.scrolling = false;
};

ScrollBox.prototype.construct = function () {

    this.height = this.visibleItems * (this.itemHeight + this.jHeight);
    this.width = this.itemWidth + this.scrollWidth + 5;

};
ScrollBox.prototype.addControl = function (control) {
    control.parent = this;
    this.controls.push(control);
    return control;
};
ScrollBox.prototype.clearControls = function () {
    for (var i = 0; i < this.controls.length; i++) {
        this.controls[i].parent = null; //maybe list of parents?
    }
    this.controls.length = 0;
};
ScrollBox.prototype.onClick = function (e) {

    if (!this.visible) return;
    for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onClick(e);
            return false;

        }
    }


    if (e.x > this.itemWidth && e.x < this.itemWidth + scrollWidth) {

        var height = this.visibleItems * (this.itemHeight + jHeight) - 2;
        this.scrollOffset = cHelp.floor((e.y / height) * (this.controls.length - this.visibleItems));

        this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

    }
    this.dragging = true;

    return false;
};
ScrollBox.prototype.onMouseUp = function (e) {

    if (!this.visible) return;
    this.dragging = false;

    for (var ij = this.scrollOffset; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onMouseUp(e);
            return false;

        }
    }

    if (this.mouseUp) this.mouseUp();
};
ScrollBox.prototype.onMouseOver = function (e) {

    if (!this.visible) return;
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            control.onMouseOver(e);
            break;

        }
    }
    if (this.dragging && e.x > this.itemWidth && e.x < this.itemWidth + scrollWidth) {
        var height = this.visibleItems * (this.itemHeight + jHeight) - 2;
        this.scrollOffset = cHelp.floor((e.y / height) * (this.controls.length - this.visibleItems));

        this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

    }
    if (this.mouseOver) this.mouseOver();
};
ScrollBox.prototype.onScroll = function (e) {

    if (!this.visible) return;
    if (e.delta > 0) {
        if (this.scrollOffset > 0) {
            this.scrollOffset--;
        }
    } else {
        if (this.scrollOffset < this.controls.length - this.visibleItems) {
            this.scrollOffset++;
        }
    }
    for (var ij = 0; ij < this.controls.length; ij++) {
        var control = this.controls[ij];
        if (control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
            e.x -= control.x;
            e.y -= control.y;
            if (control.onScroll)
                control.onScroll(e);
            return false;

        }
    }
    if (this.scroll) this.scroll();
};
ScrollBox.prototype.draw = function (canv) {


    if (!this.visible) return;

    canv.save();

    canv.fillStyle = this.backColor;

    var i;
    var height = this.visibleItems * (this.itemHeight + this.jHeight) - 2;

    canv.fillStyle = this.backColor;
    canv.lineWidth = 1;
    canv.strokeStyle = "#333";
    roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.itemWidth + this.scrollWidth + 6, this.visibleItems * (this.itemHeight + this.jHeight), 3, true, true);

    canv.fillStyle = "grey";
    canv.lineWidth = 1;
    canv.strokeStyle = "#444";
    canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2, this.parent.y + this.y + 2, this.scrollWidth, this.height);

    canv.fillStyle = "FFDDFF";
    canv.lineWidth = 1;
    canv.strokeStyle = "#FFDDFF";
    this.scrollPosition = height * this.scrollOffset / (this.controls.length - this.visibleItems);

    canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2 + 2, this.parent.y + this.y + 2 + (this.scrollPosition), this.scrollWidth - 2, 5);


    var curY = 3;
    for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
        this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
        this.controls[i].x = 2;
        this.controls[i].y = curY;
        this.controls[i].height = this.itemHeight;
        this.controls[i].width = this.itemWidth;

        curY += this.itemHeight + this.jHeight;
        this.controls[i].draw(canv);
    }
    canv.restore();

};

Help.extend(Element, ScrollBox);



function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.save();
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width, y);
    //ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x, y + height);
    // ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
    ctx.restore();
}





