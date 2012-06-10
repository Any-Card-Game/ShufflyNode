function ShuffUIManager() {
    var self = this;
    this.UIAreas = [];
    window.$ui = this;
    this.draw = function () {
        var cl = JSLINQ(this.UIAreas).OrderBy(function (f) {
            return f.depth;
        });

    };

    this.createWindow = function (options) {
        /**/
        var windowID = options.title;
        var outer = $("<div class='window-outer' style='background-color: #87B6D9;'></div>");
        outer.css('position', 'absolute');
        outer.css('padding', '2em 0.8em 0.8em 1.3em');
        outer.css('left', options.x + "px");
        outer.css('top', options.y + "px");
        outer.css('width', options.width + "px");
        outer.css('height', options.height + "px");
        outer.css('di', options.height + "px");

        outer.css('display', options.visible === false ? 'none' : 'block'); 

        var top = $("<div style='width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;  '></div>");
        outer.append(top);

        /*  var left = $("<div  style='width:20px;  height:100%; position:absolute; top:0px;left:3px; '></div>");
        outer.append(left);

        var leftInner = $("<div class='rounded'  style='width:15px; vertical-align:middle; position:absolute;top:0;bottom:0;margin:auto;  height:50%; background-color:white; text-align:center; font-size:25px; position:absolute; top:0px;left:3px; opacity:0.2;  '></div>");
        left.append(leftInner);
        leftInner.button();*/

        var title = $("<div class='rounded' style='margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;'>" + options.title + "</div>");
        top.append(title);

        var rightSideBar = $("<div style='width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;'></div>");
        top.append(rightSideBar);


        var x = $("<div class='rounded window-header-button window-close' style='height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>X</div> ");
        rightSideBar.append(x);
        var max = $("<div class='rounded window-header-button window-maximize' style='height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>[]</div>  ");
        rightSideBar.append(max);
        var min = $("<div class='rounded window-header-button window-minimize' style='height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;'>_</div>  ");
        rightSideBar.append(min);

        var inner = $("<div class='window-inner' id='window" + windowID + "' style='background-color: #FDFEFE;width:100%; height:100%; '> </div> ");
        outer.append(inner);

        this.UIAreas.push({ element: outer, inner: inner });



        x.click(function () {
            outer.css('display', 'none');
        });
        var toggleSize = false;
        max.click(function () {
            toggleSize = !toggleSize;
            if (toggleSize) {
                outer.css('width', '100%');
                outer.css('height', '100%');
                outer.css('left', '0px');
                outer.css('top', '0px');
            }
            else {
                outer.css('width', '100%');
                outer.css('height', '100%');
            }
        });
        $('.window-minimize').click(function () { alert('3'); });


        outer.mousedown(function () {
            for (var i = 0; i < self.UIAreas.length; i++) {
                self.UIAreas[i].element.css('z-index', 1800);
            }
            outer.css('z-index', 1900);
        });

        $('.window-header-button').button();

        if (!options.static) {
            outer.draggable({
                cancel: '.window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused',
                containment: "window",
                animate: true,
                start: function () {

                }
            });
            outer.resizable({
                handles: "n, e, s, w, ne, se, sw, nw",
                resize: function () {
                }
            });
        }
        $(document.body).append(outer);
        var shuf = new ShuffWindow($("#window" + windowID));

        shuf.visible = function (val) {
            outer.css('display', val ? 'block' : 'none');
        };

        return shuf;
    };
}

function ShuffWindow(item) {
    var self = this;
    self.element = item;

    self.addButton = function (options) {
        var but = $("<div></div>");

        item.append(but);
        but.text(options.text);
        but.css('position', 'absolute');
        but.css('left', options.x + "px");
        but.css('top', options.y + "px");
        but.css('width', options.width + "px");
        but.css('height', options.height + "px");

        but.button();
        but.click(options.click);
        but.disableSelection();
        but.css('display', options.visible === false ? 'none' : 'block');

        but.visible = function (val) {
            but.css('display', val ? 'block' : none);
        };
        return but;
    };
    self.addLabel = function (options) {
        var but = $("<span></span>");

        item.append(but);
        but.text(options.text);
        but.css('position', 'absolute');
        but.css('left', options.x + "px");
        but.css('top', options.y + "px");
        but.disableSelection();
        return but;
    };

    self.addTextbox = function (options) {

        var but = $("<input value='" + (!options.text ? '' : options.text) + "' />");
        item.append(but);
        but.text(options.text);
        but.css('position', 'absolute');
        but.css('left', options.x);
        but.css('top', options.y);
        but.css('width', options.width);
        but.css('height', options.height);

        if (options.label) {
            var lbl = $("<span style='" + options.labelStyle + "'></span>");
            lbl.text(options.label);
            item.append(lbl);

            lbl.css('position', 'absolute');
            lbl.css('left', options.x - lbl.width());
            lbl.css('top', options.y + 2);
            lbl.disableSelection();
        }

        return but;
    };
    function objMerge(obj1, obj2) {
        if (!obj2) return obj1;
        for (var ij in obj2) {
            obj1[ij] = obj2[ij];
        }
        return obj1;
    }
    self.addCodeEditor = function (options) {

        options = objMerge({ width: '100%', height: '100%' }, options);
        var divs = $('<div style="width:' + options.width + '; height:' + options.height + ';"> </div>');
        self.element.append(divs);

        divs.append('<textarea id="code" name="code" class="CodeMirror-fullscreen " style=""></textarea>');


        var codeMirror = document.getElementById("code");
        codeMirror.value = '';
        var editor = CodeMirror.fromTextArea(codeMirror, {
            lineNumbers: options.lineNumbers,
            lineWrapping: true,
            matchBrackets: true,
            onGutterClick: function (cm, n) {
                var info = cm.lineInfo(n);
                if (info.markerText) {
                    window.shuffUIManager.codeArea.breakPoints.splice(window.shuffUIManager.codeArea.breakPoints.indexOf(n-1), 0);
                    cm.clearMarker(n);
                } else {
                    window.shuffUIManager.codeArea.breakPoints.push(n-1);
                    cm.setMarker(n, "<span style=\"color: #900\">●</span> %N%");
                }
            },
            extraKeys: {
                "Ctrl-Space": function (cm) {
                    CodeMirror.simpleHint(cm, CodeMirror.javascriptHint);
                },
                "Ctrl-I": function (cm) {
                    var pos = cm.getCursor();
                    cm.setValue(window.fjs.format(cm.getValue()));
                    cm.setCursor(pos);

                }
            },

            onCursorActivity: function () {
                editor.setLineClass(hlLine, null);
                hlLine = editor.setLineClass(editor.getCursor().line, "activeline");
            },
            onFocus: function (editor) {

            },
            onBlur: function (editor) {
            }
        });

        var hlLine = editor.setLineClass(0, "activeline");

        var scroller = editor.getScrollerElement();
        scroller.style.height = divs[0].offsetHeight + "px";
        scroller.style.width = divs[0].offsetWidth + "px";
        editor.refresh();
        editor.setOption("theme", "night");
        (function (divs) {

            $(".window-outer").resizable({
                handles: "n, e, s, w, ne, se, sw, nw",
                resize: function () {
                    scroller.style.height = divs[0].offsetHeight + "px";
                    scroller.style.width = divs[0].offsetWidth + "px";

                }
            });
        })(divs);

        editor.codeElement = codeMirror;
        return editor;

    };
    self.addListBox = function (options) {

        var but = $("<div></div>");
        item.append(but);
        but.text(options.text);
        but.css('position', 'absolute');
        but.css('left', options.x);
        but.css('top', options.y);

        var theme = getTheme();
        but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
        but.bind('select', function (event) {
            var item = event.args.item;
            if (options.click)
                options.click(item);
        });
        return but;
    };

    return self;
}
   