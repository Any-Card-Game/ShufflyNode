
CardGame = function (setter) {
    this.users = [];
    for (var j in setter) {
        this[j] = setter[j];
    }

    this.answers = [];
    var numberOfCards = setter["numberOfCards"] === undefined ? 52 : setter["numberOfCards"];
    var numberOfJokers = setter["numberOfJokers"] === undefined ? 0 : setter["numberOfJokers"];
    this.deck = new Pile();
    var i;
    for (i = 0; i < numberOfCards; i++) {
        this.deck.cards.push(new Card(i % 13, _.floor(i / 13)));
    }
    for (i = 0; i < numberOfJokers; i++) {
        this.deck.cards.push(new Card(0, 0));
    }

    this.spaces = setter["spaces"] === undefined ? [] : setter["spaces"];
    this.textAreas = setter["textAreas"] === undefined ? [] : setter["textAreas"];

    this.size = { width: 16, height: 12 };

    //arg0: cards per player
    //arg1: CardState
    //return undefined

    this.dealCards = function (numberOfCards, state) {

    };
      
    this.setPlayers = function (players) {
        this.users = [];
        if (!players || !players.length) {

            return;
        }
        if (players.length > 6)
            players.length = 6;
        for (var j = 0; j < players.length; j++) {
            this.users.push(new User(players[j].name));
        }
    };

    this.setAnswers = function (answers) {
        this.answers = answers;
    };


};
User = function (name) {
    this.name = name;
    this.playerDealingOrder = 0;
    this.cards = new Pile(name);
};

Pile = function (name) {
    this.name = name;
    this.cards = [];
    this.shuffle = function () {
        var o = this.cards;
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        console.log(o[0].value);
        console.log(o[0].value);
        console.log('---');
        this.cards = o;
    };
};
/*

class CardGameManager
users=type User[]
deck=type Card[]
piles=type Pile[]
mainArea=create TableArea()
userAreas=type TableArea[]
def ()
[1>>4]=>|(am)
[1>>13]=>|(ab)
deck.add(create Card(ab,am))

populateUsers()=>|(n,ind)
this.users.add({Name=n,Cards=create Pile("User"+ind)})
write(this.users.length())

class CardLayoutManager
pilePaths=type LayoutPilePath[]


class LayoutManager
images=type ScreenImage[]
textAreas=type LayoutTextArea[]



template ScreenImage
effect=type Effect[]
x=0
y=0
image=""
rotation=0



class CardImage : ScreenImage
card=type Card
def() 

template Effect
effectType=type EffectType

class RotateEffect : Effect
RotateAmount=0
relative=false

class MoveEffect : Effect
X=0
Y=0
relative=false

class HighlightEffect : Effect
width=0
color=type Color

enum EffectType
Rotate=1
Highlight=2
Move=3

class LayoutPilePath
visible=true
stackCards=false
drawCardsBent=false
points=type PathPoints[]
pile=type Pile
effects=type Effect[]

class PathPoints
x=0
y=0
offsetRotation=0

class LayoutTextArea
name=""
xPosition=0
yPosition=0
rotateAngle=0
text=""
*/

Card = function (value, type, state) {
    this.value = value;
    this.type = type;
    this.state = state || 0;
    this.getFullName = function () {

    };
    this.getValueName = function () {

    };
    this.getTypeName = function () {

    };
};

CardState = { faceUp: 0, faceDown: 1, faceUpIfOwned: 2 };
CardType = { heart: 0, diamond: 1, spade: 2, club: 3 };

PokerRules = function () {

    //arg0:   2 to 52 cards
    //return: PokerResult[]
    this.evaluatePoker = function (cards) {

    };
};

PokerResult = function (cards, type, weight) {
    this.cards = cards || [];
    this.type = type || 0;
    this.weight = weight || 0;
};

PokerWinType = { Straight: 1, Flush: 2, Pair: 3, ThreeOfAKind: 4, FourOfAKind: 5, StraightFlush: 6 };


TableSpace = function (setter) {
    setter = setter || {};
    for (var j in setter) {
        this[j] = setter[j];
    }
    this.visible = setter["visible"] === undefined ? true : setter["visible"];
    this.stackCards = setter["stackCards"] === undefined ? false : setter["stackCards"];
    this.drawCardsBent = setter["drawCardsBent"] === undefined ? false : setter["drawCardsBent"];
    this.name = setter["name"] === undefined ? "TableSpace" : setter["name"];
    this.pile = setter["pile"] === undefined ? null : setter["pile"];
    this.x = setter["x"] === undefined ? 0 : setter["x"];
    this.y = setter["y"] === undefined ? 0 : setter["y"];
    this.width = setter["width"] === undefined ? 100 : setter["width"];
    this.height = setter["height"] === undefined ? 100 : setter["height"];
    this.sortOrder = setter["sortOrder"] === undefined ? Order.NoOrder : setter["numberOfCardsHorizontal"];
    this.numberOfCardsHorizontal = setter["numberOfCardsHorizontal"] === undefined ? 1 : setter["numberOfCardsHorizontal"];
    this.numberOfCardsVertical = setter["numberOfCardsVertical"] === undefined ? 1 : setter["numberOfCardsVertical"];
    return this;
};

TableTextArea = function (setter) {
    setter = setter || {};
    for (var j in setter) {
        this[j] = setter[j];
    }
    this.name = setter["name"] === undefined ? "Text Area" : setter["name"];
    this.x = setter["x"] === undefined ? 0 : setter["x"];
    this.y = setter["y"] === undefined ? 0 : setter["y"];
    this.text = setter["text"] === undefined ? "Text" : setter["text"];
};

Rectangle = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
};

Randomizer = function (seed) {
    this.seed = seed;
    this.next = function () {

    };
    this.nextBetween = function (left, right) {

    };
};

//shuf.Math = function (pi) {
//    this.pi = pi;
//    this.sin = function(s) {

//    };
//    this.cos = function(s) {

//    };
//    this.tan = function (s) {

//    };
//};

Order = { NoOrder: 0, Ascending: 1, Descending: 2 };
