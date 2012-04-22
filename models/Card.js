function Card(number, type) {
    this.number = number;
    this.type = type;
};

Card.prototype.getName = function () {
    return this.number + " " + this.type;
};



function Player() {
    this.name = '';
    this._socket = null;
}

function CardGame(name) {
    this.name = name;
    this.rooms = [];
}

CardGame.prototype.addRoom = function (name, maxUsers) {
    this.rooms.push(new CardGameRoom(name, maxUsers));
};

function CardGameRoom(name,maxUsers) {
    this.name = name;
    this.maxUsers = Math.min(1, Math.max(6, maxUsers));
    this.roomID = 0;//generate roomid
    this.players = [];
    this.gameStarted = false;
}

CardGameRoom.prototype.addPlayer = function (player) {
    this.players.push(player);
};

global.Player = Player;
global.Card = Card;
global.CardGame = CardGame;
global.CardGameRoom = CardGameRoom;