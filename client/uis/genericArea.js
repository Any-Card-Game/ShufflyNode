window.genericArea = function () {
    uiManager.genericArea = new UiArea(100, 100, { width: 400, height: 450, manager: uiManager, closable: true });
    uiManager.UIAreas.push(uiManager.genericArea);
    uiManager.genericArea.addControl(new TextArea(20, 20, { text: "Blockade", font: uiManager.textFont, color: "Blue" }));

    uiManager.genericArea.addControl(new TextArea(20, 75, { text: "Username:", font: cHelp.makeText(11, 'arial'), color: "Black" }));

    uiManager.genericArea.addControl(new Button(290, 54, {
        width: 100,
        height: 25,
        text: "Login",
        font: uiManager.buttonFont,
        color: "red",
        click: function (e) {
            propUtils.animateTo(uiManager.genericArea, 'height', uiManager.genericArea.height + 200, 200);
            //window.PageHandler.socket.emit('Area.Main.Login.Request', { user: uiManager.genericArea.txtUserName.text }); //NO EMIT'ING OUTSIDE OF PageHandler
        }
    }));
    uiManager.genericArea.addControl(uiManager.genericArea.txtUserName = new TextBox(140, 53, { width: 130, height: 20, text: "dested", font: cHelp.makeText(11, 'arial'), color: "Blue" }));

    uiManager.genericArea.addControl(new TextArea(15, 130, { text: "Rooms:", font: uiManager.textFont, color: "Black" }));

    uiManager.genericArea.addControl(uiManager.genericArea.roomList = new ScrollBox(30, 145, { itemHeight: 25, visibleItems: 6, itemWidth: 315, backColor: "rgb(50,60,127)" }));

};