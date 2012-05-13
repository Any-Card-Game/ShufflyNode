require('./gameUtils.js');
require('./GameAPI.js');

var shuff = { };
shuff.askQuestion = function (user, question, answers, cardGame) {
    var m = { user: user, question: question, answers: answers, cardGame: cardGame };
    var answer = yield(m);
    return answer.value;
};
shuff.declareWinner = function (user) {
    yield(null);
};

module.exports = shuff;

