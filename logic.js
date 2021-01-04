// 
var questionIndex = 0;
var time = questions.length * 15;
var timer;
score = 5;


// Get Elements
var startButton = document.getElementById("start")
var displayQs = document.getElementById("questions")
var submitBtn = document.getElementById("submit")
var answers = document.getElementById("choices")
var timer = document.getElementById("time");
var initialsEl = document.getElementById("initials")

// Starts Quiz
function startQuiz() {
    // hide start page
    var startQuiz = document.getElementById("startPage");
    startQuiz.setAttribute("class", "hide")

    // Display questions
    displayQs.removeAttribute("class", "hide")

    getQuestion();
}

function getQuestion() {
    // gets question from array
    var currentQuestion = questions[questionIndex]

    // gets question title
    var title = document.getElementById("questionTitle")
    title.textContent = currentQuestion.title

    answers.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {
        // create a button for each choice
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        console.log(choiceBtn.value)

        choiceBtn.textContent = i + 1 + ". " + choice;

        // on click
        choiceBtn.onclick = questionClick;

        answers.appendChild(choiceBtn);

    })
}

function questionClick() {
    if (this.value !== questions[questionIndex].answer) {
        // 15 second penalty
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // timer.textContent = time;
        // 1 point penalty
        score -= 1;
    }


    // set new question
    questionIndex++;

    // if run out of questions
    if (questionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {

    // Show end screen
    var endScreenEl = document.getElementById("endScreen")
    endScreenEl.removeAttribute("class")

    // Show score
    var finalScoreEl = document.getElementById("finalScore")
    finalScoreEl.textContent = score;

    displayQs.setAttribute("class", "hide")
}

function saveHighScore() {
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscore")) || [];

        var newScore = {
            score: score,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscore", JSON.stringify(highscores));

        window.location.href = "highscores.html";

    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
startButton.onclick = startQuiz;
submitBtn.onclick = saveHighScore;
initialsEl.onkeyup = checkForEnter;