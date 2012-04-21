require('./gameUtils.js');
require('./GameAPI.js');


shuf.askQuestion = function (user, question, answers, cardGame) {
    var m = { user: user, question: question, answers: answers, cardGame: cardGame };
    console.log('asdasd');

    var answer = yield(m);

    return answer.value;
};
shuf.declareWinner = function (user) {
    yield(null);
};

