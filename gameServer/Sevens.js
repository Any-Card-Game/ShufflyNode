var shuff=require('./shuff.js');

module.exports = Sevens = function () {
    var self = this;
    self.spades = new Pile('spades');
    self.clubs = new Pile('clubs');
    self.hearts = new Pile('hearts');
    self.diamonds = new Pile('diamonds');

    self.cardGame = new CardGame(52, 0);

    self.constructor = function () {
        shuff.fiber = self.fiber;

        self.cardGame.mainArea.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Clubs', xPosition: 0, yPosition: 0, width: 0, height: 13, rotateAngle: -90, pile: self.clubs }));
        self.cardGame.mainArea.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Hearts', xPosition: 0, yPosition: 1, width: 0, height: 13, rotateAngle: -90, pile: self.hearts }));
        self.cardGame.mainArea.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Diamonds', xPosition: 0, yPosition: 2, width: 0, height: 13, rotateAngle: -90, pile: self.diamonds }));
        self.cardGame.mainArea.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Spades', xPosition: 0, yPosition: 3, width: 0, height: 13, rotateAngle: -90, pile: self.spades }));

        self.cardGame.mainArea.textAreas.push(new TableTextArea({ name: 'SpadesText', xPosition: 0, yPosition: 0, text: 'Clubs', rotateAngle: -90 }));
        self.cardGame.mainArea.textAreas.push(new TableTextArea({ name: 'HeartsText', xPosition: 1, yPosition: 0, text: 'Hearts', rotateAngle: -90 }));
        self.cardGame.mainArea.textAreas.push(new TableTextArea({ name: 'DiamondsText', xPosition: 2, yPosition: 0, text: 'Diamonds', rotateAngle: -90 }));
        self.cardGame.mainArea.textAreas.push(new TableTextArea({ name: 'SpadesText', xPosition: 3, yPosition: 0, text: 'Spades', rotateAngle: -90 }));

    };
    self.runGame = function () {
        _.numbers(1, 20).foreach(function () {
            self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
        });

        self.cardGame.users.foreach(function (u, ind) {
            var yc = self.createUser(ind, u.Name);
            yc.spaces[0].pile = u.cards;
            self.cardGame.userAreas.push(yc);
        });


        while (self.cardGame.deck.cards.length > 0) {
            self.cardGame.users.foreach(function (u) {
                if (self.cardGame.deck.cards.length > 0) {
                    u.cards.cards.push(self.cardGame.deck.cards[0]);
                    self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
                }
            });
        }


        self.cardGame.users.foreach(function (u) {
            u.cards.cards.sort(self.sorter);
        });

        var CardTypes = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
        var CardNames = ['Ace', 'Deuce', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];

        while (true) {
            var result = self.cardGame.users.foreach(function (u) {
                var usable = u.cards.cards.where(function (c) {
                    return (c.type == 3 && (c.value == 6 || self.spades.cards.any(function (_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    }))) ||
                        (c.type == 1 && (c.value == 6 || self.clubs.cards.any(function (_c) {
                            return _c.value == c.value + 1 || _c.value == c.value - 1;
                        }))) ||
                            (c.type == 0 && (c.value == 6 || self.hearts.cards.any(function (_c) {
                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                            }))) ||
                                (c.type == 2 && (c.value == 6 || self.diamonds.cards.any(function (_c) {
                                    return _c.value == c.value + 1 || _c.value == c.value - 1;
                                })));
                });
                var answers = [];
                answers.push('Skip');
                usable.sort(self.sorter).foreach(function (card) {
                    answers.push(CardNames[card.value] + ' Of ' + CardTypes[card.type]);
                });
                var de = shuff.askQuestion(u, 'Which card would you like to play?', answers, self.cardGame);

                if (de > 0 && usable.length >= de) {
                    var rm = usable[de - 1];

                    switch (rm.type) {
                        case 3:
                            u.cards.cards.remove(rm);
                            self.spades.cards.push(rm);
                            self.spades.cards.sort(self.sorter);
                            break;
                        case 1:
                            u.cards.cards.remove(rm);
                            self.clubs.cards.push(rm);
                            self.clubs.cards.sort(self.sorter);
                            break;
                        case 0:
                            u.cards.cards.remove(rm);
                            self.hearts.cards.push(rm);
                            self.hearts.cards.sort(self.sorter);
                            break;
                        case 2:
                            u.cards.cards.remove(rm);
                            self.diamonds.cards.push(rm);
                            self.diamonds.cards.sort(self.sorter);
                            break;
                    }
                    if (u.cards.cards.length == 0) {
                        shuff.declareWinner(u);
                        return true;
                    }
                }
                return false;
            }); 
            if (result) {  
                return true;
            }

        }


    };


    self.sorter = function (left, right) {
        return left.Value > right.Value;
    };
    self.shuffle = function (arbs) {
        var indes = 0;
        var vafb = _.clone(arbs);

        vafb.foreach(function (fs) {
            var vm = _.floor(_.random() * vafb.length);
            vafb[indes] = vafb[vm];
            indes++;
            vafb[vm] = fs;
        });

        arbs = vafb;

        return arbs;
    };
    self.createUser = function (userIndex, text) {
        var ua = new TableArea();
        switch (userIndex) {
            case 0:
            case 1:
            case 3:
            case 4:
                ua.numberOfCardsHorizontal = -1;
                ua.numberOfCardsVertical = 4;
                ua.spaces.push(new TableSpace({ visible: true, stack: false, name: 'User' + userIndex, xPosition: 0, yPosition: 1, width: -1, height: 1, bend: true, rotateAngle: 0 }));
                ua.textAreas.push(new TableTextArea({ name: 'Text' + userIndex, xPosition: 1, yPosition: 0, text: text }));
                break;
            case 2:
            case 5:
                ua.numberOfCardsHorizontal = 4;
                ua.numberOfCardsVertical = -1;
                var rotate = 0;
                if (userIndex == 2) {
                    rotate = 90;
                } else {
                    rotate = -90;
                }
                ua.spaces.push(new TableSpace({ visible: true, stack: false, name: 'User' + userIndex, xPosition: 1, yPosition: 1, width: 1, height: -1, bend: true, rotateAngle: 0 }));
                ua.textAreas.push(new TableTextArea({ name: 'Text' + userIndex, xPosition: 0, yPosition: 1, text: text }));
                break;
        }
        switch (userIndex) {
            case 0:
                ua.dimensions = new Rectangle(120, 5, 310, 140);
                break;
            case 1:
                ua.dimensions = new Rectangle(490, 5, 310, 140);
                break;
            case 2:
                ua.dimensions = new Rectangle(800, 180, 140, 310);
                break;
            case 3:
                ua.dimensions = new Rectangle(495, 524, 310, 140);
                break;
            case 4:
                ua.dimensions = new Rectangle(120, 524, 310, 140);
                break;
            case 5:
                ua.dimensions = new Rectangle(5, 180, 140, 310);
                break;
        }
        return ua;
    };

    return self;
};