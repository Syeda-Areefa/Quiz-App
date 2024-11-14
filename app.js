var questions = [
    {
        question : "Which of the following attributes is used to add link to any element?",
        answer : [
            {text: "link", correct: false},
            {text: "href", correct: true},
            {text: "ref", correct: false},
            {text: "newref", correct: false},
        ]
    },
    {
        question : "What does HTML stand for?",
        answer : [
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyper Text Preprocessor", correct: false},
            {text: "Hyper text Multiple Language", correct: false},
            {text: "Hyper Tool Multi Language", correct: false},
        ]
    },
    {
        question : "What does PHP stand for?",
        answer : [
            {text: "Hypertext Preprocessor", correct: true},
            {text: "Hypertext Programming", correct: false},
            {text: "Hypertext Preprogramming", correct: false},
            {text: "Hometext Preprocessor", correct: false},
        ]
    },
    {
        question : "What does CSS stand for?",
        answer : [
            {text: "Common Style Sheet", correct: false},
            {text: "Colorful Style Sheet", correct: false},
            {text: "Computer Style Sheet", correct: false},
            {text: "Cascading Style Sheet", correct: true},
        ]
    },
    {
        question : "Which language runs in a web browser?",
        answer : [
            {text: "Java", correct: false},
            {text: "C++", correct: false},
            {text: "Python", correct: false},
            {text: "Javascript", correct: true},
        ]
    },
    {
        question : "Which year was JavaScript launched?",
        answer : [
            {text: "1996", correct: false},
            {text: "1995", correct: true},
            {text: "1994", correct: false},
            {text: "none of the above", correct: false},
        ]
    }
];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct === "true"){
        button.classList.add("correct");
       }
       button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();