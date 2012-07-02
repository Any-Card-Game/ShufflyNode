function buildSite(gatewayServerAddress) {

    /**
    *  Chainable external javascript file loading
    *  http://www.webtoolkit.info/
    **/
    var scriptLoader = {
        _loadScript: function (url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url; // +"?" + (Math.floor(Math.random() * 10000)); //caching
            if (callback) {
                script.onreadystatechange = function () {
                    if (this.readyState == 'loaded') callback();
                };
                script.onload = callback;
            }
            head.appendChild(script);
        },

        load: function (items, done) {
            var counter = 0;
            for (var i = 0; i < items.length; i++) {
                scriptLoader._loadScript(items[i], function () {
                    counter++;
                    if (counter >= items.length) {
                        done();
                    }
                });
            }
        },
        loadSync: function (items, done) {
            var counter = 0;
            var i = 0;
            var nextOne = function () {
                counter++;
                if (counter >= items.length) {
                    done();
                } else {
                    scriptLoader._loadScript(items[counter], nextOne);
                }
            };
            scriptLoader._loadScript(items[0], nextOne);
        }

    };

    function loadCss(filename) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }



    //var url = 'https://s3.amazonaws.com/anycardgame/';
    var url = 'http://50.116.28.16:8881/';
    window.topLevel = url;

    loadCss(url + 'client/lib/jquery-ui-1.8.20.custom.css');
    loadCss(url + 'client/lib/codemirror/codemirror.css');
    loadCss(url + 'client/lib/site.css');
    loadCss(url + 'client/lib/codemirror/theme/night.css');
    loadCss(url + 'client/lib/jqwidgets/styles/jqx.base.css');


    scriptLoader.loadSync([url + 'client/lib/jquery-1.7.2.min.js',
                url + 'client/lib/jquery-ui-1.8.20.custom.min.js',
                url + 'client/lib/jqwidgets/scripts/gettheme.js',
                url + 'client/lib/jqwidgets/jqxcore.js'], function () {
                    scriptLoader.load([
                            url + 'client/lib/jqwidgets/jqxbuttons.js',
                            url + 'client/lib/jqwidgets/jqxscrollbar.js',
                            url + 'client/lib/linq.js',
                            url + 'client/lib/socket.io.js',
                            url + 'client/lib/codemirror/codemirror.js',
                            url + 'client/lib/jqwidgets/jqxlistbox.js'], function () {

                                scriptLoader.load([url + 'client/ClientHelp.js',
                                        url + 'common/Help.js',
                                        url + 'client/lib/codemirror/mode/javascript/javascript.js',
                                        url + 'client/lib/WorkerConsole.js',
                                        url + 'client/Gateway.js',
                                        url + 'client/lib/FunctionWorker.js',
                                        url + 'client/lib/Stats.js',
                                        url + 'client/lib/keyboardjs.js',
                                        url + 'client/UIManager.js',
                                        url + 'client/UIArea.js',
                                        url + 'client/PageHandler.js',
                                        url + 'client/uis/genericArea.js',
                                        url + 'client/ShuffUIManager.js',
                                        url + 'client/lib/Dialog.js',
                                    ], ready);
                            });

                });



    function ready() {
        var elem; (elem = document.getElementById('loading')).parentNode.removeChild(elem);

        var stats = new xStats;
        document.body.appendChild(stats.element);
        var pageHandler = new PageHandler(gatewayServerAddress);


        var shuffUIManager = new ShuffUIManager();
        window.shuffUIManager = shuffUIManager;

        var genericArea = {};

        window.shuffUIManager.genericArea = genericArea;

        var home = shuffUIManager.createWindow({
            title: "CardGame",
            x: $('body').innerWidth() - 500,
            y: 100,
            width: 420,
            height: 450,
            allowClose: true,
            allowMinimize: true,
            visible: false
        });


        home.addButton({
            x: 280,
            y: 54,
            width: 150,
            height: 25,
            text: 'Update Game List',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Game.GetGames'); //NO EMIT'ING OUTSIDE OF PageHandler

            }
        });

        home.addButton({
            x: 280,
            y: 84,
            width: 150,
            height: 25,
            text: 'Create Game',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Game.Create', { user: { userName: genericArea.txtUserName[0].value} }); //NO EMIT'ING OUTSIDE OF PageHandler

            }
        });


        genericArea.btnStartGame = home.addButton({
            x: 280,
            y: 164,
            width: 150,
            height: 25,
            text: 'Start Game',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Game.Start', { roomID: window.PageHandler.gameStuff.roomID }); //NO EMIT'ING OUTSIDE OF PageHandler
            },
            visible: false
        });

        home.addButton({
            x: 280,
            y: 164,
            width: 120,
            height: 25,
            text: 'Start Game',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Game.Start', { roomID: window.PageHandler.gameStuff.roomID }); //NO EMIT'ING OUTSIDE OF PageHandler

            }
        });


        var randomName = '';
        var ra = Math.random() * 10;
        for (var i = 0; i < ra; i++) {
            randomName += String.fromCharCode(65 + (Math.random() * 26));
        }

        genericArea.txtUserName = home.addTextbox({
            x: 130,
            y: 43,
            width: 130,
            height: 20,
            text: randomName,
            label: 'Username:'
        });



        genericArea.gameList = home.addListBox({
            x: 30,
            y: 85,
            width: 215,
            height: 25 * 6,
            label: 'Rooms',
            click: function () {
                window.PageHandler.gateway.emit('Area.Game.Join', { roomID: id, user: { userName: genericArea.txtUserName[0].value} }); //NO EMIT'ING OUTSIDE OF PageHandler
            }
        });
        genericArea.userList = home.addListBox({
            x: 30,
            y: 280,
            width: 215,
            height: 25 * 5,
            label: 'Users'
        });



        genericArea.loadRoomInfo = function (room) {


            genericArea.userList.remove();
            genericArea.btnStartGame.visible(true);

            var users = [];

            for (var i = 0; i < room.players.length; i++) {

                users.push(room.players[i]);

            }


            genericArea.userList = home.addListBox({
                x: 30,
                y: 280,
                width: 215,
                height: 25 * 5,
                label: 'Users',
                items: users
            });

        };

        genericArea.loadRoomInfos = function (room) {
            genericArea.gameList.remove();

            var rooms = [];

            for (var i = 0; i < room.length; i++) {
                rooms.push({ label: room[i].name, value: room[i].roomID });
            }


            genericArea.gameList = home.addListBox({
                x: 30,
                y: 85,
                width: 215,
                height: 25 * 6,
                label: 'Rooms',
                items: rooms,
                click: function (item) {
                    window.PageHandler.gateway.emit('Area.Game.Join', { roomID: item.value, user: { userName: genericArea.txtUserName.val()} }); //NO EMIT'ING OUTSIDE OF PageHandler
                }
            });
        };



        var devArea = shuffUIManager.createWindow({
            title: "Developer",
            x: $('body').innerWidth() - 500,
            y: 100,
            width: 420,
            height: 450,
            allowClose: true,
            allowMinimize: true
        });
        window.shuffUIManager.devArea = devArea;


        devArea.addButton({
            x: 280,
            y: 54,
            width: 150,
            height: 25,
            text: 'Begin Game',
            click: function (e) {
                devArea.created = false;
                devArea.joined = 0;
                window.PageHandler.startGameServer();
                window.PageHandler.gateway.emit('Area.Debug.Create', {
                    user: { userName: devArea.txtNumOfPlayers.val() },
                    name: 'main room',
                    source: window.shuffUIManager.codeArea.codeEditor.getValue(),
                    breakPoints: window.shuffUIManager.codeArea.breakPoints
                });


            }
        });

        devArea.lblHowFast = devArea.addLabel({
            x: 280 - 150,
            y: 94,
            width: 150,
            height: 25,
            text: 'How Many: '
        });


        devArea.addButton({
            x: 280,
            y: 94,
            width: 150,
            height: 25,
            text: 'Continue',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Debug.Continue', {}); //NO EMIT'ING OUTSIDE OF PageHandler

            }
        });
        devArea.propBox = devArea.addPropertyBox({
            x: 25,
            y: 200,
            width: 250,
            height: 250,
            itemCreation: function (item, index) {
                var ik = $("<div style='width:100%;height:25px; background-color:" + (index % 2 == 0 ? 'red' : 'green') + ";'></div>");
                var ikc = $("<div style='width:50%;height:25px; float:left;'>" + item.key + "</div>");
                ik.append(ikc);
                var ikd = $("<input type='text' style='width:48%;height:25px' value='" + item.value + "' />");
                ik.append(ikd);


                return ik;
            }
        });

        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });
        devArea.propBox.addItem({ key: 'Foos', value: '99' });

        devArea.varText = devArea.addTextbox({
            x: 150,
            y: 134,
            width: 100,
            height: 25,
            label: 'Var Lookup'
        });
        devArea.addButton({
            x: 280,
            y: 134,
            width: 150,
            height: 25,
            text: 'Lookup',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Debug.VariableLookup.Request', { variableName: devArea.varText.val() }); //NO EMIT'ING OUTSIDE OF PageHandler
            }
        });

        devArea.addButton({
            x: 280,
            y: 164,
            width: 150,
            height: 25,
            text: 'Push New Source',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Debug.PushNewSource', { source: window.shuffUIManager.codeArea.codeEditor.getValue(), breakPoints: window.shuffUIManager.codeArea.breakPoints }); //NO EMIT'ING OUTSIDE OF PageHandler
            }
        });


        devArea.loadRoomInfo = function (room) {
            var count = parseInt(devArea.txtNumOfPlayers.val());
            if (!devArea.created) {
                window.PageHandler.gateway.emit('Area.Game.DebuggerJoin', { roomID: room.roomID }); //NO EMIT'ING OUTSIDE OF PageHandler

                for (var i = 0; i < count; i++) {
                    window.PageHandler.gateway.emit('Area.Game.Join', { roomID: room.roomID, user: { userName: "player " + (i + 1)} }); //NO EMIT'ING OUTSIDE OF PageHandler
                }
                devArea.created = true;
            }
            else {
                if ((++devArea.joined) == count) {
                    window.PageHandler.gateway.emit('Area.Game.Start', { roomID: room.roomID }); //NO EMIT'ING OUTSIDE OF PageHandler
                }
            }
        };

        devArea.txtNumOfPlayers = devArea.addTextbox({
            x: 130,
            y: 43,
            width: 130,
            height: 20,
            text: '6',
            label: 'Number of players:',
            labelStyle: 'font-size:13px'
        });

        var codeArea = shuffUIManager.createWindow({
            title: "Code",
            x: 0,
            y: 0,
            static: true,
            width: $(window).width() * .50,
            height: $(window).height() * .90,
            allowClose: true,
            allowMinimize: true,
            visible: true
        });



        window.shuffUIManager.codeArea = codeArea;
        window.shuffUIManager.codeArea.breakPoints = [];
        window.shuffUIManager.codeArea.console = codeArea.addCodeEditor({ height: '20%', lineNumbes: false });

        window.shuffUIManager.codeArea.codeEditor = codeArea.addCodeEditor({ height: '80%', lineNumbers: true });


        /*

        var consoleArea = shuffUIManager.createWindow({
        title: "console",
        x: 100,
        y: $(window).height()-300, 
        width: 350,
        height: 250,
        allowClose: true,
        allowMinimize: true,
        visible: true
        });



        window.shuffUIManager.consoleArea = consoleArea;


        window.shuffUIManager.consoleArea.codeEditor = consoleArea.addCodeEditor(); */





        var questionArea = shuffUIManager.createWindow({
            title: "Question",
            x: 600,
            y: 100,
            width: 300,
            height: 275,
            allowClose: true,
            allowMinimize: true,
            visible: false

        });



        window.shuffUIManager.questionArea = questionArea;


        window.shuffUIManager.questionArea.question = questionArea.addLabel({
            x: 20,
            y: 5,
            width: 150,
            height: 25,
            text: '',
            click: function (e) {
                window.PageHandler.gateway.emit('Area.Game.GetGames'); //NO EMIT'ING OUTSIDE OF PageHandler

            }
        });


        window.shuffUIManager.questionArea.load = function (question) {
            window.shuffUIManager.questionArea.visible(true);
            window.shuffUIManager.questionArea.question.text = question.question;
            window.shuffUIManager.questionArea.answerBox.remove();

            var answers = [];
            for (var i = 0; i < question.answers.length; i++) {
                answers.push({ label: question.answers[i], value: i });
            }
            window.shuffUIManager.questionArea.answerBox = questionArea.addListBox({
                x: 30,
                y: 65,
                width: 215,
                height: 25 * 5,
                label: 'Answers',
                items: answers,
                click: function (item) {
                    window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: item.value, roomID: window.PageHandler.gameStuff.roomID });
                    window.shuffUIManager.questionArea.visible(false);

                }
            });

        };

        window.shuffUIManager.questionArea.answerBox = questionArea.addListBox({
            x: 30,
            y: 65,
            width: 215,
            height: 25 * 5,
            label: 'Answers',
            click: function (item) {
                window.PageHandler.gateway.emit("Area.Game.AnswerQuestion", { answer: item.index, roomID: window.PageHandler.gameStuff.roomID });
                window.shuffUIManager.questionArea.visible = false;

            }
        });



        var chatArea = shuffUIManager.createWindow({
            title: "Chat",
            x: 600,
            y: 100,
            width: 300,
            height: 275,
            allowClose: true,
            allowMinimize: true,
            visible: false

        });

        //chatArea .element



        // window.PageHandler.gateway.emit('Area.Game.GetGames'); //NO EMIT'ING OUTSIDE OF PageHandler



        /*





        var main = shuffUIManager.createWindow({
        title: "Main",
        x: 200,
        y: 100,
        width: 600,
        height: 450,
        allowClose: true,
        allowMinimize: true
        });
        main.addButton({
        x: 80,
        y: 90,
        width: 100,
        height: 24,
        text: 'football'
        });
        main.addTextbox({
        x: 80,
        y: 140,
        width: 100,
        height: 24,
        text: 'football',
        label: 'name'
        });
        main.addListBox({
        x: 220,
        y: 140,
        width: 180,
        height: 80,
        label: 'name',
        items: ["Affogato", "Americano", "Bicerin", "Breve", "Café Bombón", "Café au lait", "Caffé Corretto", "Café Crema", "Caffé Latte", "Caffé macchiato", "Café mélange", "Coffee milk", "Cafe mocha", "Cappuccino", "Carajillo", "Cortado", "Cuban espresso", "Espresso", "Eiskaffee", "The Flat White", "Frappuccino", "Galao", "Greek frappé coffee", "Iced Coffee﻿", "Indian filter coffee", "Instant coffee", "Irish coffee", "Liqueur coffee"]
        });
        var adWindow = shuffUIManager.createWindow({
        title: "Ad",
        x: document.width - 400,
        y: 200,
        width: 160,
        height: 700,
        allowClose: true,
        allowMinimize: true
        });
        */
    }
}