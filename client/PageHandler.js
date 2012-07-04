window.DEBUGs = true;
window.DEBUGLABELS = [];

function PageHandler(gatewayServer) {

    var self = this;
    window.PageHandler = this;




    window.PageHandler.gateway = new Gateway(gatewayServer);
    

    self.gameStuff = {
        roomID: -1
    };


    window.PageHandler.gateway.on('Area.Main.Login.Response', function (data) {
        alert(JSON.stringify(data));
    });
    window.PageHandler.gateway.on('Area.Lobby.ListCardGames.Response', function (question) {
    });
    window.PageHandler.gateway.on('Area.Lobby.ListRooms.Response', function (data) {
        console.log(data);
    });
    
    var randomName = '';
    var ra = Math.random() * 10;
    for (var i = 0; i < ra; i++) {
        randomName += String.fromCharCode(65 + (Math.random() * 26));
    }
     
    window.PageHandler.gateway.login(randomName);
    var startTime = new Date();
    var endTime;
    //window.PageHandler.gateway.emit('Area.Main.Login.Request', { user: 'dested' });
    window.PageHandler.startGameServer = function () {
        window.PageHandler.gateway.on('Area.Game.RoomInfo', function (data) {
            self.gameStuff.roomID = data.roomID;

            window.shuffUIManager.genericArea.loadRoomInfo(data);
            window.shuffUIManager.devArea.loadRoomInfo(data);
        });
        window.PageHandler.gateway.on('Area.Game.RoomInfos', function (data) {
            window.shuffUIManager.genericArea.loadRoomInfos(data);
        });

        window.PageHandler.gateway.on('Area.Debug.Log', function (data) {
            window.shuffUIManager.codeArea.console.setValue(window.shuffUIManager.codeArea.console.getValue() + "\n" + data.value);
            window.shuffUIManager.codeArea.console.setCursor(window.shuffUIManager.codeArea.console.lineCount(), 0);
        });

        window.PageHandler.gateway.on('Area.Debug.Break', function (data) {

            var cm = window.shuffUIManager.codeArea.codeEditor;

            cm.clearMarker(data.lineNumber);

            cm.setMarker(data.lineNumber, "<span style=\"color: #059\">●</span> %N%");


            cm.setCursor(data.lineNumber + 15, 0);
            cm.setCursor(data.lineNumber - 15, 0);
            cm.setCursor(data.lineNumber, 0);
        });
        window.PageHandler.gateway.on('Area.Debug.VariableLookup.Response', function (data) {
            alert(JSON.stringify(data));
        });


        window.PageHandler.gateway.on('Area.Game.AskQuestion', function (data) {
            window.shuffUIManager.questionArea.load(data);
            //alert(JSON.stringify(data));
            endTime = new Date();
            var time = endTime - startTime;
            window.shuffUIManager.devArea.lblHowFast.text("how long: " + time);
            setTimeout(function () {

                window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: 1, roomID: self.gameStuff.roomID }, window.shuffUIManager.devArea.gameServer);
                window.shuffUIManager.questionArea.visible(false);
                startTime = new Date();
            }, 2);
        });
        window.PageHandler.gateway.on('Area.Game.UpdateState', function (data) {
            self.gameContext.clearRect(0, 0, self.gameContext.canvas.width, self.gameContext.canvas.height);
            self.drawArea(data);
        });
        window.PageHandler.gateway.on('Area.Game.Started', function (data) {
            //alert(JSON.stringify(data));
        });
        window.PageHandler.gateway.on('Area.Game.GameOver', function (data) {

        });
    };
    var timevalue = 0;
    var numOfTimes = 0;


    window.PageHandler.gateway.on('Area.Debug.GetGameSource.Response', function (data) {
        var endTime = new Date();

        var time = (endTime - startTime);



        numOfTimes++;
        timevalue += time;
        window.shuffUIManager.devArea.lblHowFast.text('How Many: '+(timevalue / numOfTimes));

        false && setTimeout(function () {
            startTime = new Date();
            window.PageHandler.gateway.emit('Area.Debug2.GetGameSource.Request', { gameName: 'Sevens' });
        }, 10);

        window.shuffUIManager.codeArea.codeEditor.setValue(data);

        window.shuffUIManager.codeArea.codeEditor.setMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");
        window.shuffUIManager.codeArea.codeEditor.refresh();
    });

    var startTime;
    startTime = new Date();
    window.PageHandler.gateway.emit('Area.Debug2.GetGameSource.Request', { gameName: 'Sevens' });

    var cardImages = {};
    for (var i = 101; i < 153; i++) {
        var img = new Image();
        var domain = window.topLevel + 'client/assets';
        var src = domain + '/cards/' + i;
        var jm;
        img.src = jm = src + ".gif";
        cardImages[jm] = img;
    }
    this.lastMainArea = undefined;

    this.drawArea = function (mainArea) {
        var gameboard = self.gameContext;
        this.lastMainArea = mainArea;
        var scale = { x: self.gameContext.canvas.width / mainArea.size.width, y: self.gameContext.canvas.height / mainArea.size.height };

        gameboard.fillStyle = "rgba(0, 0, 200, 0.5)";

        var space;
        for (i = 0; i < mainArea.spaces.length; i++) {
            space = mainArea.spaces[i];
            var vertical = space.vertical;
            gameboard.fillRect(space.x * scale.x, space.y * scale.y, space.width * scale.x, space.height * scale.y);
            var spaceScale = { x: space.width / space.pile.cards.length, y: space.height / space.pile.cards.length };

            for (j = 0; j < space.pile.cards.length; j++) {
                var card = space.pile.cards[j];
                var xx = Math.floor((space.x) * scale.x) + (!vertical ? j * (spaceScale.x * scale.x) : 0);
                var yy = Math.floor((space.y) * scale.y) + (vertical ? j * (spaceScale.y * scale.y) : 0);

                var cardImage = cardImages[drawCard(card)];
                gameboard.drawImage(cardImage, xx + (vertical ? (space.width * scale.x / 2 - cardImage.width / 2) : 0), yy + (!vertical ? (space.height * scale.y / 2 - cardImage.height / 2) : 0));

            }
        }
        for (i = 0; i < mainArea.textAreas.length; i++) {
            var ta = mainArea.textAreas[i];
            gameboard.fillStyle = "rgba(200, 0, 200, 0.5)";
            gameboard.fillText(ta.text, ta.x * scale.x, ta.y * scale.y);
        }
    };


    function drawCard(card) {
        var src = '';
        var domain = window.topLevel + 'client/assets';


        src = domain + '/cards/' + (100 + (card.value + 1) + (card.type) * 13);

        return src + ".gif";
    }



    var gameCanvas;
    $('body').append(gameCanvas = document.createElement('canvas'));


    $(gameCanvas).css({ margin: '0px', position: 'absolute', top: '0px', left: ($(window).width() * .5) + 'px', 'z-index': -50 });


    self.gameContext = gameCanvas.getContext("2d");
    self.gameContext.canvas = gameCanvas;
    self.gameContext.$canvas = $(gameCanvas);

    self.gameContext.canvas.width = $(window).width() * .5;
    self.gameContext.canvas.height = $(window).height();

    this.lastMouseMove = false;

    gameCanvas.addEventListener('DOMMouseScroll', self.handleScroll.bind(self), false);
    gameCanvas.addEventListener('mousewheel', self.handleScroll.bind(self), false);

    gameCanvas.addEventListener('touchmove', self.canvasMouseMove.bind(self));
    gameCanvas.addEventListener('touchstart', self.canvasOnClick.bind(self));
    gameCanvas.addEventListener('touchend', self.canvasMouseUp.bind(self));

    gameCanvas.addEventListener('mousedown', self.canvasOnClick.bind(self));
    gameCanvas.addEventListener('mouseup', self.canvasMouseUp.bind(self));
    gameCanvas.addEventListener('mousemove', self.canvasMouseMove.bind(self));

    gameCanvas.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
        //special right click menu;
    }, false);

    $(window).resize(self.resizeCanvas.bind(self));

    self.resizeCanvas();

    window.setInterval(self.draw.bind(self), 1000 / 60);


    return this;
}

PageHandler.prototype.canvasOnClick = function (e) {
    e.preventDefault();

    return false;
};
PageHandler.prototype.canvasMouseMove = function (e) {
    e.preventDefault();
    document.body.style.cursor = "default";
    this.lastMouseMove = e;

    return false;
};
PageHandler.prototype.canvasMouseUp = function (e) {
    e.preventDefault();

    return false;
};
PageHandler.prototype.handleScroll = function (e) {
    e.preventDefault();

    return e.preventDefault() && false;
};


PageHandler.prototype.resizeCanvas = function () {
    if (window.PageHandler.gameContext.$canvas.attr("width") != $(window).width())
        window.PageHandler.gameContext.$canvas.attr("width", $(window).width() * .5);
    if (window.PageHandler.gameContext.$canvas.attr("height") != $(window).height())
        window.PageHandler.gameContext.$canvas.attr("height", $(window).height());
    if (this.drawArea && this.lastMainArea)
        this.drawArea(this.lastMainArea);
};

PageHandler.prototype.draw = function () {
    this.gameContext.canvas.width = this.gameContext.canvas.width;


    if (this.drawArea && this.lastMainArea)
        this.drawArea(this.lastMainArea);
};