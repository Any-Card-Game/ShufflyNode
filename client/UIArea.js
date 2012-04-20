

function UiArea(x, y, w, h, manager, closable) {
    this.x = x;
    this.y = y;
    this.manager = manager;
    this.closable = closable;
    this.width = w;
    this.height = h;
    this.depth = -1;
    this.visible = true;
    this.dragging = false;
    this.controls = [];
    this.onMove = function () { };
    this.addControl = function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    };
    this.focus = function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focus();
        }
    };
    this.loseFocus = function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.loseFocus();
        }
    };

    var that = this;

    if (closable) {
        this.addControl(new Button(this.width - 30, 4, 26, 23, "X", this.manager.buttonFont, "Green", function () {
            that.loseFocus();
            that.visible = false;
        }));
    }

    this.click = function (e) {
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
        this.dragging = { x: e.x, y: e.y };


    };

    this.onKeyDown = function (e) {
        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onKeyDown(e);
        }
    };
    this.mouseMove = function (e) {
        if (!this.visible) return;
        if (!this.dragging) {
            for (var ij = 0; ij < this.controls.length; ij++) {
                var control = this.controls[ij];
                if (control.visible && control.y <= e.y && control.y + control.height > e.y && control.x <= e.x && control.x + control.width > e.x) {
                    e.x -= control.x;
                    e.y -= control.y;
                    control.onMouseOver(e);
                }
            }

            return;
        }

        this.x += e.x - this.dragging.x;
        this.y += e.y - this.dragging.y;
        this.onMove();
    };
    this.mouseUp = function (e) {
        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
        }
        this.dragging = false;
    };
    this.scroll = function (e) {
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
    this.cachedDrawing = null;
    this.draw = function (canv) {
        if (!this.visible) return;
        var good;
        var t;
        var j;
        if (!this.cachedDrawing) {

            var cg = document.createElement("canvas");
            cg.width = this.width + 20;
            cg.height = this.height + 20;

            var cv = cg.getContext('2d');

            var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
            lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
            lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


            cv.fillStyle = lingrad;
            cv.strokeStyle = "#333";

            var _x = this.x;
            var _y = this.y;
            this.x = 10;
            this.y = 10;
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

            this.x = _x;
            this.y = _y;

            this.cachedDrawing = cHelp.loadSprite(cg.toDataURL("image/png"));
        }

        if (this.cachedDrawing.loaded) {
            canv.drawImage(this.cachedDrawing, cHelp.floor(this.x), cHelp.floor(this.y));
            if (this.cachedDrawing.width != this.width + 20 || this.cachedDrawing.height != this.height + 20)
                this.cachedDrawing = null;

            canv.save();
            canv.translate(10, 10);
            for (j = 0; j < this.controls.length; j++) {
                t = this.controls[j];
                good = t.forceDrawing();
                if (!good.redraw)
                    t.draw(canv);
                if (good.clearCache)
                    this.cachedDrawing = null;
            }
            canv.restore();
        } else {
            cv = canv;
            canv.save();
            
            var lingrad = cv.createLinearGradient(0, 0, 0, this.height);
            lingrad.addColorStop(0, 'rgba(220,220,220,0.85)');
            lingrad.addColorStop(1, 'rgba(142,142,142,0.85)');


            cv.fillStyle = lingrad;
            cv.strokeStyle = "#333";

            var _x = this.x;
            var _y = this.y;
            this.x += 10;
            this.y += 10;
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
                t.draw(canv);
            }

            this.x = _x;
            this.y = _y;
            canv.restore();

        }

    };

    return this;
}


function TextArea(x, y, text, font, color) {
    this.forceDrawing = function () {
        var txt = (Help.isFunction(this.text) ? this.text() : this.text);
        if (txt == this.oldText) {
            return { redraw: true, clearCache: false };
        }
        this.oldText = txt;
        return { redraw: true, clearCache: true };
    };
    this.x = x;
    this.oldText = "";
    this.y = y;
    this.visible = true;
    this.text = text;
    this.font = font;
    this.color = color;
    this.parent = null;

    this.onKeyDown = function (e) {

    };
    this.focus = function () {

    };
    this.loseFocus = function () {

    };
    this.onClick = function (e) {
        return false;
    };
    this.onMouseUp = function (e) {
        if (this.mouseUp) this.mouseUp();
    };
    this.onMouseOver = function (e) {
        if (this.mouseOver) this.mouseOver();
    };

    this.draw = function (canv) {
        if (!this.visible) return;
        canv.save();

        var txt = Help.isFunction(this.text) ? this.text() : this.text;
        if (canv.font != this.font)
            canv.font = this.font;

        var w = canv.measureText(text).width;
        var h = parseInt(canv.font.split('pt')[0]);

        //   canv.fillStyle = "rgba(255,255,255,0.78)";
        var pad = 3;
        //     canv.fillRect(this.parent.x + this.x - pad, this.parent.y + this.y - h - pad, w + (pad * 2), h + (pad * 2));

        canv.fillStyle = this.color;

        canv.fillText(txt, this.parent.x + this.x, this.parent.y + this.y);
        canv.restore();

    };


    return this;
}


function HtmlBox(x, y, width, height, init, updatePosition, _focus, _hide) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
    this.parent = null;
    init();
    this.onKeyDown = function (e) {

    };
    this.focus = function () {
        _focus();
    };
    this.loseFocus = function () {
        _hide();
    };
    this.onClick = function (e) {
        return false;
    };
    this.onMouseUp = function (e) {
        if (this.mouseUp) this.mouseUp();
    };
    this.onMouseOver = function (e) {
        if (this.mouseOver) this.mouseOver();
    };

    this.draw = function (canv) {
        if (!this.visible) return;
        updatePosition(this.parent.x + this.x, this.parent.y + this.y);
    };


    return this;
}
function ImageButton(x, y, width, height, text, font, image, click, mouseUp, mouseOver) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.visible = true;
    this.width = width;
    this.height = height;
    this.text = text;
    this.toggle = false;
    this.toggled = false;
    this.font = font;
    this.clicking = false;
    this.click = click;
    this.mouseUp = mouseUp;
    this.mouseOver = mouseOver;
    this.image = image;
    this.parent = null;

    var created = false;

    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;
    this.focus = function () {

    };
    this.loseFocus = function () {

    };

    this.onClick = function (e) {
        if (!this.visible) return;
        this.clicking = true;
        if (this.toggle)
            this.toggled = !this.toggled;
    };
    this.onMouseUp = function (e) {
        if (!this.visible) return;
        if (this.clicking) {
            if (this.click) this.click();
        }
        this.clicking = false;
        if (this.mouseUp) this.mouseUp();
    };
    this.onMouseOver = function (e) {
        if (!this.visible) return;
        if (this.mouseOver) this.mouseOver();
    };
    this.onKeyDown = function (e) {

    };
    this.draw = function (canv) {
        if (!this.visible) return;

        if (!created) {
            created = true;
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
    };
    return this;
}


function Button(x, y, width, height, text, font, color, click, mouseUp, mouseOver) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.visible = true;
    this.width = width;
    this.height = height;
    this.text = text;
    this.toggle = false;
    this.toggled = false;
    this.font = font;
    this.clicking = false;
    this.click = click;
    this.mouseUp = mouseUp;
    this.mouseOver = mouseOver;
    this.color = color;
    this.parent = null;

    var created = false;

    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;
    this.focus = function () {

    };
    this.loseFocus = function () {

    };

    this.onClick = function (e) {
        if (!this.visible) return;
        this.clicking = true;
        if (this.toggle)
            this.toggled = !this.toggled;
    };
    this.onMouseUp = function (e) {
        if (!this.visible) return;
        if (this.clicking) {
            if (this.click) this.click();
        }
        this.clicking = false;
        if (this.mouseUp) this.mouseUp();
    };
    this.onMouseOver = function (e) {
        if (!this.visible) return;
        if (this.mouseOver) this.mouseOver();
    };
    this.onKeyDown = function (e) {

    };
    this.draw = function (canv) {
        if (!this.visible) return;

        if (!created) {
            created = true;
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
    };
    return this;
}



function TextBox(x, y, width, height, text, font, color, textChanged) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.visible = true;
    this.width = width;
    this.textChanged = textChanged;
    this.height = height;
    this.text = text;
    this.font = font;
    this.clicking = false;
    this.color = color;
    this.parent = null;
    this.cursorPosition = 0;
    this.dragPosition = -1;
    this.drawTicks = 0;
    this.lastClickTick = 0;
    var created = false;
    this.focused = false;
    this.blinked = false;
    this.blinkTick = 0;
    this.button1Grad = null;
    this.button2Grad = null;
    this.buttonBorderGrad = null;

    this.focus = function () {

    };
    this.loseFocus = function () {

    };

    this.onKeyDown = function (e) {
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
            }
            else
                if (e.keyCode == 37) {
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
    var can;
    this.onClick = function (e) {
        if (!this.visible) return;
        this.clicking = true;
        this.focused = true;
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
    };
    this.selectWord = function () {
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
    this.onMouseUp = function (e) {
        if (!this.visible) return;
        if (this.clicking) {

        }
        this.clicking = false;
        if (this.mouseUp) this.mouseUp();
    };
    this.onMouseOver = function (e) {
        if (!this.visible) return;
        document.body.style.cursor = "text";
        if (this.clicking) {
            if (this.dragPosition == -1) {
                this.dragPosition = this.cursorPosition;
            }
            if (can.font != this.font)
                can.font = this.font;
            for (var i = 0; i < this.text.length; i++) {
                var w = can.measureText(this.text.substring(0, i)).width;
                if (w > e.x - 14) {
                    this.cursorPosition = i;
                    return;
                }
            }
            this.cursorPosition = this.text.length;
        }
        if (this.mouseOver) this.mouseOver();
    };
    this.draw = function (canv) {
        if (!this.visible) return;
        if (!this.focused) {
            this.cursorPosition = -1;
            this.dragPosition = -1;
        }
        this.drawTicks++
        can = canv;
        if (!created) {
            created = true;
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
        canv.fillText(this.text, this.parent.x + this.x + 8, this.parent.y + this.y + (this.height / 3) * 2);

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
    };
    return this;
}


function Panel(x, y, w, h, area) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.area = area;
    this.width = w;
    this.height = h;
    this.parent = null;
    this.visible = true;
    this.controls = [];
    this.addControl = function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    };
    this.outline = true;
    this.focus = function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.focus();
        }
    };
    this.loseFocus = function () {
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.loseFocus();
        }
    };
    this.empty = function () {

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.parent = null;
        }

        this.controls = [];
    };

    this.onClick = function (e) {
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

    this.onKeyDown = function (e) {
        if (!this.visible) return;
        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onKeyDown(e);
        }
    };
    this.onMouseOver = function (e) {
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
    this.onMouseUp = function (e) {
        if (!this.visible) return;

        for (var ij = 0; ij < this.controls.length; ij++) {
            var control = this.controls[ij];
            control.onMouseUp({ x: e.x - control.x, y: e.y - control.y });
        }
    };
    this.onScroll = function (e) {
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
    this.cachedDrawing = null;
    this.draw = function (canv) {
        if (!this.visible) return;
        var t;
        var j;
        var _x = this.x;
        var _y = this.y;

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
    };

    return this;
}

function HScrollBox(x, y, itemHeight, visibleItems, itemWidth, backColor, controls) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.visible = true;
    var scrollWidth = 14;
    var jWidth = 5;

    this.width = visibleItems * (itemWidth + jWidth);
    this.visibleItems = visibleItems;
    this.itemHeight = itemHeight;
    this.backColor = backColor;

    this.height = itemHeight + scrollWidth;
    this.parent = null;
    this.scrollOffset = 0;
    this.scrollPosition = 0;
    this.dragging = false;
    this.focus = function () {

    };
    this.loseFocus = function () {

    };
    if (controls)
        this.controls = controls;
    else
        this.controls = [];

    this.scrolling = false;
    this.addControl = function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    };



    this.onClick = function (e) {
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


        if (e.y > this.itemHeight && e.y < this.itemHeight + scrollWidth) {

            var width = this.visibleItems * (this.itemWidth + jWidth) - 2;
            this.scrollOffset = cHelp.floor((e.x / width) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        this.dragging = true;

        return false;
    };
    this.onKeyDown = function (e) {

    };
    this.onMouseUp = function (e) {
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
    this.onMouseOver = function (e) {
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
        if (this.dragging && e.y > this.itemHeight && e.y < this.itemHeight + scrollWidth) {
            var width = this.visibleItems * (this.itemWidth + jWidth) - 2;
            this.scrollOffset = cHelp.floor((e.x / width) * (this.controls.length - this.visibleItems));

            this.scrollOffset = Math.min(Math.max(this.scrollOffset, 0), this.controls.length);

        }
        if (this.mouseOver) this.mouseOver();
    };
    this.onScroll = function (e) {
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

    this.draw = function (canv) {
        if (!this.visible) return;
        canv.fillStyle = this.backColor;

        var i;
        var width = this.visibleItems * (this.itemWidth + jWidth) - 2;

        canv.fillStyle = this.backColor;
        canv.lineWidth = 1;
        canv.strokeStyle = "#333";
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.visibleItems * (this.itemWidth + jWidth) + 2, this.itemHeight + scrollWidth + 6, 3, true, true);

        canv.fillStyle = "grey";
        canv.lineWidth = 1;
        canv.strokeStyle = "#444";
        canv.fillRect(this.parent.x + this.x + 2, this.parent.y + this.y + this.itemHeight + 6, this.visibleItems * (this.itemWidth + jWidth), scrollWidth);

        canv.fillStyle = "FFDDFF";
        canv.lineWidth = 1;
        canv.strokeStyle = "#FFDDFF";
        this.scrollPosition = width * this.scrollOffset / (this.controls.length - this.visibleItems);

        canv.fillRect(this.parent.x + this.x + (this.scrollPosition) + 2, this.parent.y + this.y + this.itemHeight + 6, 5, scrollWidth - 2);




        var curX = 3;
        for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
            this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
            this.controls[i].x = curX;
            this.controls[i].y = 2;
            this.controls[i].height = this.itemHeight;
            this.controls[i].width = this.itemWidth;

            curX += this.itemWidth + jWidth;
            this.controls[i].draw(canv);
        }



    };
    return this;
}
function ScrollBox(x, y, itemHeight, visibleItems, itemWidth, backColor, controls) {
    this.forceDrawing = function () {
        return { redraw: false, clearCache: false };
    };
    this.x = x;
    this.y = y;
    this.itemWidth = itemWidth;
    this.visible = true;
    var scrollWidth = 14;
    this.width = itemWidth + scrollWidth;
    this.visibleItems = visibleItems;
    this.itemHeight = itemHeight;
    this.backColor = backColor;

    var jHeight = 5;
    this.height = visibleItems * (itemHeight + jHeight);
    this.parent = null;
    this.scrollOffset = 0;
    this.scrollPosition = 0;
    this.dragging = false;
    this.focus = function () {

    };
    this.loseFocus = function () {

    };
    if (controls)
        this.controls = controls;
    else
        this.controls = [];

    this.scrolling = false;
    this.addControl = function (control) {
        control.parent = this;
        this.controls.push(control);
        return control;
    };



    this.onClick = function (e) {
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
    this.onKeyDown = function (e) {

    };
    this.onMouseUp = function (e) {
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
    this.onMouseOver = function (e) {
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
    this.onScroll = function (e) {
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

    this.draw = function (canv) {
        if (!this.visible) return;
        canv.fillStyle = this.backColor;

        var i;
        var height = this.visibleItems * (this.itemHeight + jHeight) - 2;

        canv.fillStyle = this.backColor;
        canv.lineWidth = 1;
        canv.strokeStyle = "#333";
        roundRect(canv, this.parent.x + this.x, this.parent.y + this.y, this.itemWidth + scrollWidth + 6, this.visibleItems * (this.itemHeight + jHeight), 3, true, true);

        canv.fillStyle = "grey";
        canv.lineWidth = 1;
        canv.strokeStyle = "#444";
        canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2, this.parent.y + this.y + 2, scrollWidth, height);

        canv.fillStyle = "FFDDFF";
        canv.lineWidth = 1;
        canv.strokeStyle = "#FFDDFF";
        this.scrollPosition = height * this.scrollOffset / (this.controls.length - this.visibleItems);

        canv.fillRect(this.parent.x + this.x + this.itemWidth + 2 + 2 + 2, this.parent.y + this.y + 2 + (this.scrollPosition), scrollWidth - 2, 5);




        var curY = 3;
        for (i = this.scrollOffset; i < Math.min(this.controls.length, this.scrollOffset + this.visibleItems); i++) {
            this.controls[i].parent = { x: this.parent.x + this.x, y: this.parent.y + this.y };
            this.controls[i].x = 2;
            this.controls[i].y = curY;
            this.controls[i].height = this.itemHeight;
            this.controls[i].width = this.itemWidth;

            curY += this.itemHeight + jHeight;
            this.controls[i].draw(canv);
        }



    };
    return this;
};




function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
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
}