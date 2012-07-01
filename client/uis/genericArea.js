window.genericArea = function () {
    uiManager.genericArea = new UiArea(100, 100, { width: 420, height: 450, manager: uiManager, closable: true });
    uiManager.UIAreas.push(uiManager.genericArea);

    uiManager.genericArea.addControl(new TextArea(20, 5, { text: "Card Game", font: uiManager.textFont, color: "Blue" }));
    //    uiManager.genericArea.addControl(new TextArea(20, 50, { text: "Username:", font: cHelp.makeText(11, 'arial'), color: "Black" }));

    uiManager.genericArea.addControl(new Button(280, 54, {
        width: 120,
        height: 25,
        text: "Update Game List",
        font: uiManager.buttonFont,
        color: "red",
        click: function (e) {
            window.PageHandler.gateway.emit('Area.Game.GetGames'); //NO EMIT'ING OUTSIDE OF PageHandler

        }
    })); uiManager.genericArea.addControl(new Button(280, 84, {
        width: 120,
        height: 25,
        text: "Create Game",
        font: uiManager.buttonFont,
        color: "red",
        click: function (e) {
            //propUtils.animateTo(uiManager.genericArea, 'height', uiManager.genericArea.height + 200, 200);
            window.PageHandler.gateway.emit('Area.Game.Create', { user: { name: uiManager.genericArea.txtUserName.text} }); //NO EMIT'ING OUTSIDE OF PageHandler
        }
    }));


    uiManager.genericArea.loadRoomInfo = function (room) {
        uiManager.genericArea.userList.clearControls();
        uiManager.genericArea.btnStartGame.visible = true;
        for (var i = 0; i < room.players.length; i++) {
            uiManager.genericArea.userList.addControl(new Button(0, 0, {
                text: room.players[i].name
            }));
        }

    };

    uiManager.genericArea.loadRoomInfos = function (room) {
        uiManager.genericArea.gameList.clearControls();
        for (var i = 0; i < room.length; i++) {
            uiManager.genericArea.gameList.addControl(new Button(0, 0, {
                text: room[i].name,
                click: (function (id) {
                    return function () {
                        window.PageHandler.gateway.emit('Area.Game.Join', { roomID: id, user: { name: uiManager.genericArea.txtUserName.text} }); //NO EMIT'ING OUTSIDE OF PageHandler
                    };
                })(room[i].roomID)
            }));
        }
    };

    //propUtils.animateTo(uiManager.genericArea, 'height', uiManager.genericArea.height + 200, 200);

    uiManager.genericArea.addControl(uiManager.genericArea.btnStartGame = new Button(280, 164, {
        width: 120,
        height: 25,
        text: "Start Game",
        font: uiManager.buttonFont,
        color: "red",
        click: function (e) {
            window.PageHandler.gateway.emit('Area.Game.Start',
                { roomID: window.PageHandler.gameStuff.roomID }); //NO EMIT'ING OUTSIDE OF PageHandler
        }
    }));


    uiManager.genericArea.addControl(uiManager.genericArea.txtUserName = new TextBox(130, 43, { width: 130, height: 20, text: "dested", font: cHelp.makeText(11, 'arial'), color: "Blue" }));

    uiManager.genericArea.addControl(new TextArea(15, 40, { text: "Username:", font: uiManager.textFont, color: "Black" }));

    uiManager.genericArea.addControl(uiManager.genericArea.gameList = new ScrollBox(30, 85, {
        itemHeight: 25,
        visibleItems: 6,
        itemWidth: 215,
        backColor: "rgb(50,60,127)"
    }));

    uiManager.genericArea.addControl(uiManager.genericArea.userList = new ScrollBox(30, 280, {
        itemHeight: 25,
        visibleItems: 5,
        itemWidth: 215,
        backColor: "rgb(50,60,127)"
    }));

    window.PageHandler.gateway.emit('Area.Game.GetGames'); //NO EMIT'ING OUTSIDE OF PageHandler

















    uiManager.questionArea = new UiArea(600, 100, { width: 300, height: 275, manager: uiManager, visible: false, closable: true });
    uiManager.UIAreas.push(uiManager.questionArea);

    uiManager.questionArea.addControl(new TextArea(20, 5, { text: "Question:", font: uiManager.textFont, color: "Blue" }));
    //    uiManager.questionArea.addControl(new TextArea(20, 50, { text: "Username:", font: cHelp.makeText(11, 'arial'), color: "Black" }));
    uiManager.questionArea.addControl(uiManager.questionArea.question = new TextArea(15, 40, { text: '', font: uiManager.textFont, color: "Black" }));
    uiManager.questionArea.load = function (question) {
        uiManager.questionArea.visible = true;
        uiManager.questionArea.question.text = question.question;
        uiManager.questionArea.answerBox.clearControls();
        for (var i = 0; i < question.answers.length; i++) {
            uiManager.questionArea.answerBox.addControl(new Button(0, 0, {
                text: question.answers[i],
                click: (function (index) {
                    return function (e) {
                        window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: index, roomID: window.PageHandler.gameStuff.roomID });
                        uiManager.questionArea.visible = false;
                    };
                })(i)
            }));
        }

    };

    uiManager.questionArea.addControl(uiManager.questionArea.answerBox = new ScrollBox(30, 65, {
        itemHeight: 25,
        visibleItems: 5,
        itemWidth: 215,
        backColor: "rgb(50,60,127)"
    }));



};