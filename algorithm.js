const maxImageLimit = 8;


let answers = [];
let questionIndex = undefined;

// Input : aId(Number), pId(Number)
// Output :
//      (If reach to question or pId is not undefied)
//          Object{ pId(Number), name(String), mainImage(String), images(String list) }
//      (If failure)
//          undefined
//      (Else)
//          Object{
//              question(Object {
//                  qId(Number),
//                  question(String),
//                  answers(String list),
//              }),
//              images(Object List { pId(Number), name(String), mainImage(String) })
//          }
function getNextQuestionAndImages(answerIndex, pId) {
    if (questionIndex === undefined) { // return first question
        questionIndex = 0;
        return {
            question: questions[questionIndex],
            images: products.slice(0, maxImageLimit).map(extractDataFromProduct)
        }
    }

    // user click product
    if (pId !== undefined) {
        return products.find(p => p.pId === pId);
    }

    // user click answer
    answers.push({ questionIndex, answerIndex });
    
    let nextCandidates = [];
    for (product of products) {
        let score = 0;
        if (product.pId > 5 || product.pId < 3) continue;
        for (answer of answers) {
            const possibleAnswers = product.questions[answer.questionIndex];
            if (possibleAnswers && possibleAnswers.indexOf(answer.answerIndex + 1) !== -1) {
                score++;
            }
        }
        nextCandidates.push({ product, score });
    }

    const perfectCandidates = nextCandidates.filter(o => o.score === answers.length);

    if (perfectCandidates.length === 1) {
        return perfectCandidates[0].product;
    }
    else if (perfectCandidates.length == 0) {
        const nearCandidates = nextCandidates.filter(o => o.score >= answers.length - 2);
        if (nextCandidates.length === 1) {
            return nextCandidates[0].product;
        }
        else if (nextCandidates.length === 0) {
            return undefined;
        }
        nextCandidates = nearCandidates;
    }
    else {
        nextCandidates = perfectCandidates;
    }
    sortCandidatesByScore(nextCandidates);

    // calculate the next question
    if (answers.length === questions.length) { // no more question
        return undefined;
    }

    let nextQuestion = undefined;
    for (let i = questionIndex + 1; i < questions.length; i++) {
        const question = questions[i];

        let candidatePossibleAnswers = [];
        for (candidate of nextCandidates) {
            const product = candidate.product;
            const productPossibleAnswer = product.questions[i];

            candidatePossibleAnswers.push(...productPossibleAnswer);
        }

        candidatePossibleAnswers = Array.from(new Set(candidatePossibleAnswers));
        if (candidatePossibleAnswers.length > 1) {
            nextQuestion = question;
            break;
        }
    }

    if (nextQuestion === undefined) {
        return undefined;
    }
    questionIndex = nextQuestion.qId;

    let nextImages = nextCandidates.slice(0, maxImageLimit);
    if (nextImages.length % 2 == 1) {
        nextImages = nextImages.slice(0, nextImages.length - 1);
    }

    return {
        question: nextQuestion,
        images: nextImages.map(i => i.product).map(extractDataFromProduct),
    }
}

function undoAnswer() {
    if (answers.length === 0) {
        questionIndex = undefined
    } else {
        questionIndex = answers[answers.length - 1].questionIndex;
        answers.splice(answers.length - 1, 1);
    }
}

function extractDataFromProduct(p) {
    return {
        pId: p.pId,
        name: p.pId,
        mainImage: p.mainImage,
    }
}

function sortCandidatesByScore(l) {
    l.sort(function (a, b) {
        return b.score - a.score;
    });
}

const introImageLimit = 5;

function getIntroImages() {
    return products.slice(0, introImageLimit);
}
