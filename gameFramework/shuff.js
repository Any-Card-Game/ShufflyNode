var shuff = { };
shuff.askQuestion = function (user, question, answers, cardGame) {
    cardGame.emulating = false;

    if (cardGame.answers.length - 1 > cardGame.answerIndex) {
        cardGame.emulating = true;
        return cardGame.answers[cardGame.answerIndex++].value;
    }

    var m = { user: user, question: question, answers: answers, cardGame: cardGame };
    var answer = yield({
        type: 'askQuestion',
        question: m
    });
    cardGame.answerIndex++;
    return !answer ? 0 : answer.value;
};
shuff.declareWinner = function (user) {
    yield({
        type: 'gameOver'
    });
};
shuff.log = function (msg) {
    yield({
        type: 'log',
        contents: msg
    });
};

shuff.break_ = function (lineNumber,cardGame, varLookup) {


    if (cardGame.emulating) { 
        return ;
    }
    

    var yieldObject = {
        type: 'break',
        lineNumber: lineNumber-1
    };
    

    while (true) {
        var answ = yield(yieldObject);

        if (answ == null) {//continue
            return ;
        }
        if (answ.variableLookup) {
            yieldObject = { };
            yieldObject.type = 'variableLookup';
            yieldObject.value = varLookup(answ.variableLookup);
            continue;
        }
        break;
    }

 
};
module.exports = shuff;

