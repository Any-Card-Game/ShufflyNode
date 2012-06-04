var shuff = require('./shuff.js');

module.exports = Sevens = function () {
    var self = this;
    self.spades = new Pile('spades');
    self.clubs = new Pile('clubs');
    self.hearts = new Pile('hearts');
    self.diamonds = new Pile('diamonds');

    self.cardGame = new CardGame({ numberOfCards: 52 });

    self.constructor = function () {

        shuff.fiber = self.fiber;

        self.cardGame.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Clubs', x: 2, y: 4, width: 1, height: 4, pile: self.clubs, numberOfCardsHorizontal: 1, numberOfCardsVertical: -1 }));
        self.cardGame.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Hearts', x: 6, y: 4, width: 1, height: 4, pile: self.hearts, numberOfCardsHorizontal: 1, numberOfCardsVertical: -1 }));
        self.cardGame.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Diamonds', x: 10, y: 4, width: 1, height: 4, pile: self.diamonds, numberOfCardsHorizontal: 1, numberOfCardsVertical: -1 }));
        self.cardGame.spaces.push(new TableSpace({ visible: true, stack: false, name: 'Spades', x: 14, y: 4, width: 1, height: 4, pile: self.spades, numberOfCardsHorizontal: 1, numberOfCardsVertical: -1 }));

        self.cardGame.textAreas.push(new TableTextArea({ name: 'SpadesText', x: 2, y: 4, text: 'Clubs' }));
        self.cardGame.textAreas.push(new TableTextArea({ name: 'HeartsText', x: 6, y: 4, text: 'Hearts' }));
        self.cardGame.textAreas.push(new TableTextArea({ name: 'DiamondsText', x: 10, y: 4, text: 'Diamonds' }));
        self.cardGame.textAreas.push(new TableTextArea({ name: 'SpadesText', x: 14, y: 4, text: 'Spades' }));
    };
    self.createUser = function (userIndex, text) {
        var sp;
        var tta;
        console.log("Create User " + userIndex);
        switch (userIndex) {
            case 0:
            case 1:
            case 3:
            case 4:
                self.cardGame.spaces.push(sp = new TableSpace({ visible: true, stack: false, name: 'User' + userIndex, width: 4, height: 1, bend: true }));
                self.cardGame.textAreas.push(tta = new TableTextArea({ name: 'Text' + userIndex, text: text }));
                break;
            case 2:
            case 5:
                var rotate = 0;
                if (userIndex == 2) {
                    rotate = 90;
                } else {
                    rotate = -90;
                }
                self.cardGame.spaces.push(sp = new TableSpace({ visible: true, stack: false, name: 'User' + userIndex, width: 1, height: 4, bend: true }));
                self.cardGame.textAreas.push(tta = new TableTextArea({ name: 'Text' + userIndex, text: text }));
                break;
        }
        var space = sp;
        switch (userIndex) {
            case 0:
                space.x = 2;
                space.y = 1;
                break;
            case 1:
                space.x = 8;
                space.y = 1;
                break;
            case 2:
                space.x = 10;
                space.y = 6;
                break;
            case 3:
                space.x = 8;
                space.y = 10;
                break;
            case 4:
                space.x = 2;
                space.y = 10;
                break;
            case 5:
                space.x = 2;
                space.y = 6;
                break;
        }
        var textArea = tta;
        textArea.x = space.x;
        textArea.y = space.y - 1;
        return sp;
    };

    self.runGame = function () {
        if (!self.cardGame.users || self.cardGame.users.length == 0) {
            console.log("baaad");
            return true;
        }

        _.numbers(1, 20).foreach(function () {
            self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
        });

        self.cardGame.users.foreach(function (u, ind) {
            var sp = self.createUser(ind, u.Name);
            sp.pile = u.cards;
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

        var CardTypes = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
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
                            (c.type == 2 && (c.value == 6 || self.hearts.cards.any(function (_c) {
                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                            }))) ||
                                (c.type == 0 && (c.value == 6 || self.diamonds.cards.any(function (_c) {
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
                        case 2:
                            u.cards.cards.remove(rm);
                            self.hearts.cards.push(rm);
                            self.hearts.cards.sort(self.sorter);
                            break;
                        case 0:
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

    return self;
};