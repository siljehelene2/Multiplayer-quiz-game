const question = document.getElementById("question");
const question2 = document.getElementById("question2");

const choices = Array.from(document.getElementsByClassName("choice-text"));
const choices2 = Array.from(document.getElementsByClassName("choice-text2"));

const scoreText = document.getElementById("score");
const scoreText2 = document.getElementById("score2");

let currentQuestion = {};
let currentQuestion2 = {};

let acceptingAnswers = false;
let acceptingAnswers2 = false;

let score = 0;
let score2 = 0;

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");

let availableQuestions = [];

let questions = [
    {
        question: "What is 2+2?",
        choice1: "4",
        choice2: "3",
        choice3: "1",
        choice4: "67",
        answer: 1
    },
    {
        question: "What is correct?",
        choice1: "Correct",
        choice2: "Wrong",
        choice3: "Not quite",
        choice4: "Almost",
        answer: 1
    },
    {
        question: "What is 7-3?",
        choice1: "-8",
        choice2: "2",
        choice3: "4",
        choice4: "2",
        answer: 3
    },
    {
        question: "What is the capital of Norway?",
        choice1: "Oslo",
        choice2: "Sweden",
        choice3: "Yes",
        choice4: "Bergen",
        answer: 1
    },
    {
        question: "What is the highest mountain in the world?",
        choice1: "Glittertind",
        choice2: "Galdhøpiggen",
        choice3: "K2",
        choice4: "Mount Everest",
        answer: 4
    },
    {
        question: "What is 2*3-1?",
        choice1: "5",
        choice2: "4",
        choice3: "1",
        choice4: "2",
        answer: 1
    },
    {
        question: "What is 1+1?",
        choice1: "1",
        choice2: "7",
        choice3: "2",
        choice4: "8",
        answer: 3
    },
    {
        question: "Who painted Mona Lisa?",
        choice1: "Leonardo da Vinci",
        choice2: "Mona Lisa",
        choice3: "Thomas",
        choice4: "Edward Grieg",
        answer: 1
    },
    {
        question: "Who is Magnus Carlsen?",
        choice1: "A singer",
        choice2: "A footballer",
        choice3: "A chess player",
        choice4: "A random person from Sweden",
        answer: 3
    },
    {
        question: "Who is Erling Braut Haaland?",
        choice1: "A singer",
        choice2: "A footballer",
        choice3: "A chess player",
        choice4: "A random person from Sweden",
        answer: 2
    },
    {
        question: "Who is Kygo?",
        choice1: "A DJ",
        choice2: "A footballer",
        choice3: "A chess player",
        choice4: "A random person from Sweden",
        answer: 1
    },
    {
        question: "Who created ChatGPT?",
        choice1: "OpenAi",
        choice2: "Twitter",
        choice3: "Google",
        choice4: "Bing",
        answer: 1
    },
    {
        question: "What is 1+9",
        choice1: "2",
        choice2: "3",
        choice3: "4",
        choice4: "10",
        answer: 4
    }
];


// Constants

const CORRECT_BONUS = 1;
const WIN_SCORE = 5;

startGame = () => {
    score = 0;
    score2 = 0;
    availableQuestions = [...questions];
    scoreText.innerText = score + "/" + WIN_SCORE;
    scoreText2.innerText = score2 + "/" + WIN_SCORE;
    getNewQuestion();
    getNewQuestion2();
};


getNewQuestion = () => {

    if(availableQuestions.length === 0){
        //If out of questions - renew available questionarray
        availableQuestions = [...questions];
    }

    // If the first player gets the score to WIN_SCORE, the scores for both players are saved and user is directed to the end page
    if (availableQuestions.length === 0 || score >= WIN_SCORE){
        sessionStorage.setItem("player1", score);
        sessionStorage.setItem("player2", score2);
        return window.location.assign("end.html");
    }

    //Find new question at random and updates question text
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //Iterate through choices and update choicetext
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    //remove chosen question from available question array
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

getNewQuestion2 = () => {

    if(availableQuestions.length === 0){
        availableQuestions = [...questions];
    }

    if (availableQuestions.length === 0 || score2 >= WIN_SCORE){
        sessionStorage.setItem("player1", score);
        sessionStorage.setItem("player2", score2);
        return window.location.assign("end.html");
    }

    const questionIndex2 = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion2 = availableQuestions[questionIndex2];
    question2.innerText = currentQuestion2.question;

    choices2.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion2["choice" + number];
    });

    availableQuestions.splice(questionIndex2, 1);

    acceptingAnswers2 = true;
};


//Every time a choice is clicked the function is run, where e is the event and can be used to find the selected choice
//Hvis spørsmålet ikke er klart enda avbryter vi funksjonen med en gang med return
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

// Når brukeren har svart vil vi vente til et nytt spørsmål er klart før vi starter på ny
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

// Finner riktig svaralternativ og legger til correct eller incorrect på parent-elementet (div) til svaralternativet (p)
// Da endres div-en i CSS til grønn eller rød
        selectedChoice.parentElement.classList.add(classToApply);

// Nytt spørsmål når det er gått et halvt sekund, så rød- eller grønn-fargen får tid til å vises
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);           
           getNewQuestion();
        }, 500);
        
    });
});

choices2.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers2) return;

        acceptingAnswers2 = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion2.answer ? "correct" : "incorrect";

        if(classToApply === "correct") {
            incrementScore2(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);           
           getNewQuestion2();
        }, 500);
        
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score + "/" + WIN_SCORE;
}

incrementScore2 = num => {
    score2 +=num;
    scoreText2.innerText = score2 + "/" + WIN_SCORE;
}

startGame();



