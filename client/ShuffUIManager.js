function ShuffUIManager() {
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

        var title = $("<div class='rounded' style='margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;'>"+options.title+"</div>");
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




        $('.window-close').click(function () { alert('1'); });
        $('.window-maximize').click(function () { alert('2'); });
        $('.window-minimize').click(function () { alert('3'); });


        $('.window-header-button').button();

        outer.draggable({
            cancel: '.window-inner',
            containment: "window", animate: true
        });
        outer.resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
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
            var lbl = $("<span></span>");
            lbl.text(options.label);
            item.append(lbl);

            lbl.css('position', 'absolute');
            lbl.css('left', options.x - lbl.width() - 35);
            lbl.css('font-size', 22);
            lbl.css('top', options.y + 2);
            lbl.disableSelection();
        }

        return but;
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
   