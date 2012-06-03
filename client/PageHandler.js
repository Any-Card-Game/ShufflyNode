window.DEBUGs = true;
window.DEBUGLABELS = [];

function PageHandler(siteServer,gameServer) {

    var self = this;
    window.PageHandler = this;




    window.PageHandler.siteSocket = io.connect(siteServer);
    window.PageHandler.gameSocket = io.connect(gameServer);
    self.gameStuff = {
        roomID: -1
    };


    window.PageHandler.siteSocket.on('Area.Main.Login.Response', function (data) {
        alert(JSON.stringify(data));

    });
    window.PageHandler.siteSocket.on('Area.Lobby.ListCardGames.Response', function (question) {
    });
    window.PageHandler.siteSocket.on('Area.Lobby.ListRooms.Response', function (data) {
        console.log(data);
    });

    //window.PageHandler.siteSocket.emit('Area.Main.Login.Request', { user: 'dested' });


    window.PageHandler.gameSocket.on('Area.Game.RoomInfo', function (data) {
        self.gameStuff.roomID = data.roomID;

        window.shuffUIManager.genericArea.loadRoomInfo(data);
    });
    window.PageHandler.gameSocket.on('Area.Game.RoomInfos', function (data) {
        window.shuffUIManager.genericArea.loadRoomInfos(data);
    });

    window.PageHandler.gameSocket.on('Area.Game.AskQuestion', function (data) {
        window.shuffUIManager.questionArea.load(data);
        //alert(JSON.stringify(data));
        //  socket.Emit("Area.Game.AnswerQuestion", { answer: 1, roomID: self.gameStuff.roomID });
    });
    window.PageHandler.gameSocket.on('Area.Game.UpdateState', function (data) {
        if (data.mainArea) {
            self.gameContext.clearRect(0, 0, self.gameContext.canvas.width, self.gameContext.canvas.height);

            var mainArea = data.mainArea;
            drawArea(mainArea);

            for (var a = 0; a < data.userAreas.length; a++) {
                drawArea(data.userAreas[a]);
            }
        }
    });


    var cardImages = {};
    for (var i = 101; i < 153; i++) {
        var img = new Image();
        var domain = window.topLevel+'client/assets';
        var src = domain + '/cards/' + i;
        var jm;
        img.src = jm = src + ".gif";
        cardImages[jm] = img;
    }

    function drawArea(mainArea) {
        var gameboard = self.gameContext;
        var dim = mainArea.dimensions;
        gameboard.fillStyle = "rgba(0, 0, 200, 0.5)";
        gameboard.fillRect(dim.x, dim.y, dim.width, dim.height);
        var cardCount = 0;
        var space;
        var i;
        for (i = 0; i < mainArea.spaces.length; i++) {
            space = mainArea.spaces[i];
            cardCount += space.pile.cards.length;
        }


        var xMultiply = dim.width / (mainArea.numberOfCardsHorizontal == -1 ? cardCount : mainArea.numberOfCardsHorizontal);
        var yMultiply = dim.height / (mainArea.numberOfCardsVertical == -1 ? cardCount : mainArea.numberOfCardsVertical);

        for (i = 0; i < mainArea.spaces.length; i++) {
            space = mainArea.spaces[i];
            var xOff = 0;
            var yOff = 0;
            for (j = 0; j < space.pile.cards.length; j++) {
                var card = space.pile.cards[j];

                var xx = Math.floor((space.xPosition + xOff) * xMultiply + dim.x);
                var yy = Math.floor((space.yPosition + yOff) * yMultiply + dim.y);
                   

                gameboard.drawImage(cardImages[drawCard(card)], xx, yy);

                xOff++;
                if (xOff > (space.width == -1 ? space.pile.cards.length : space.width)) {
                    xOff = 0;
                    yOff++;
                }
                if (yOff > (space.height == -1 ? space.pile.cards.length : space.height)) {
                    alert('error');
                }
            }
        }
        for (i = 0; i < mainArea.textAreas.length; i++) {
            var ta = mainArea.textAreas[i];
            gameboard.fillStyle = "rgba(200, 0, 200, 0.5)";
            gameboard.fillText(ta.text, Math.floor((ta.x) * xMultiply + dim.x), Math.floor((ta.y) * yMultiply + dim.y));
        }
    }


    function drawCard(card) {
        var src = '';
        var domain = window.topLevel+'client/assets';


        src = domain + '/cards/' + (100+(card.value + 1) + (card.type) * 13);

        return src + ".gif";
    }
    window.PageHandler.gameSocket.on('Area.Game.Started', function (data) {
        //alert(JSON.stringify(data));
    });
    window.PageHandler.gameSocket.on('Area.Game.GameOver', function (data) {
        alert(JSON.stringify(data));
    });


    var gameCanvas;
    $('body').append(gameCanvas = document.createElement('canvas'));

    
    $(gameCanvas).css({ margin: '0px', position: 'absolute', top: '0px', left: '0px', 'z-index': -50 }); 


    self.gameContext = gameCanvas.getContext("2d");
    self.gameContext.canvas = gameCanvas;
    self.gameContext.$canvas = $(gameCanvas);
         
    self.gameContext.canvas.width = $(window).width();
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

    $(window).resize(self.resizeCanvas);
    
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
    this.gameContext.$canvas.attr("width", $(window).width());
    this.gameContext.$canvas.attr("height", $(window).height());
};

PageHandler.prototype.draw = function () {
   // cHelp.clearCanvas(this.gameContext.canvas); 
      
};