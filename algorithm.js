
// Input : aId(Number), pId(Number)
// Output :
//      (If reach to question or pId is not undefied)
//          Object{ pId(Number), imageUrls(String List) }
//      (Else)
//          Object{
//              question(Object {
//                  qId(Number),
//                  text(String),
//                  answers(Object List { aId(Number), text(String) }),
//              }),
//              images(Object List { pId(Number), imageUrl(String) })
//          }
function getNextQuestionAndImages(answerId, pId) {
    if (pId !== undefined) {
        return {
            pId: 0,
            imageUrls: [
                "a.com",
                "b.com",
                "c.com",
                "d.com",
            ],
        }
    }

    // calculate the next question

    return {
        question: {
            qId: 0, // for algorithm
            text: "Some question",
            answers: [
                { aId: 0, text: "answer1" },
                { aId: 1, text: "answer1" },
                { aId: 2, text: "answer1" },
                { aId: 3, text: "answer1" },
                { aId: 4, text: "answer1" },
                { aId: 5, text: "answer1" },
            ]
        },
        images: [
            { pId: 0, imageUrl: "a.com" },
            { pId: 1, imageUrl: "a.com" },
            { pId: 2, imageUrl: "a.com" },
            { pId: 3, imageUrl: "a.com" },
            { pId: 4, imageUrl: "a.com" },
            { pId: 5, imageUrl: "a.com" },
            { pId: 6, imageUrl: "a.com" },
            { pId: 7, imageUrl: "a.com" },
        ]
    }
}